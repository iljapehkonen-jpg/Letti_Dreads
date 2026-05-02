import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Home.module.scss";
import { SetItem } from "../../componets";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import axios from "../../axios.js";
import { getCustomSetContent } from "../custom_set/content.js";
import {
  HOME_SECTION_IDS,
  HOME_SOCIAL_LINKS,
  getHomeSectionContent,
} from "./sectionContent.js";

const INSTAGRAM_URL = "https://www.instagram.com/letti_dreads/";
const INSTAGRAM_PREVIEW_IMAGE = "/home-gallery/instagram-preview.jpg";
const INSTAGRAM_LABELS = {
  fi: "Lisää kuvia Instagramissa",
  en: "More photos on Instagram",
  ru: "Больше фотографий в Instagram",
  de: "Mehr Fotos auf Instagram",
  fr: "Plus de photos sur Instagram",
  it: "Altre foto su Instagram",
  el: "Περισσότερες φωτογραφίες στο Instagram",
  es: "Más fotos en Instagram",
  et: "Rohkem fotosid Instagramis",
  lv: "Vairāk foto Instagram",
  lt: "Daugiau nuotraukų Instagram",
  pl: "Więcej zdjęć na Instagramie",
};

const LIGHTBOX_TEXT = {
  fi: { previous: "Edellinen kuva", next: "Seuraava kuva", close: "Sulje esikatselu" },
  en: { previous: "Previous image", next: "Next image", close: "Close preview" },
  ru: { previous: "Предыдущее фото", next: "Следующее фото", close: "Закрыть просмотр" },
  de: { previous: "Vorheriges Bild", next: "Nächstes Bild", close: "Vorschau schließen" },
  fr: { previous: "Image précédente", next: "Image suivante", close: "Fermer l'aperçu" },
  it: { previous: "Immagine precedente", next: "Immagine successiva", close: "Chiudi anteprima" },
  el: { previous: "Προηγούμενη εικόνα", next: "Επόμενη εικόνα", close: "Κλείσιμο προεπισκόπησης" },
  es: { previous: "Imagen anterior", next: "Imagen siguiente", close: "Cerrar vista previa" },
  et: { previous: "Eelmine pilt", next: "Järgmine pilt", close: "Sulge eelvaade" },
  lv: { previous: "Iepriekšējais attēls", next: "Nākamais attēls", close: "Aizvērt priekšskatījumu" },
  lt: { previous: "Ankstesnis vaizdas", next: "Kitas vaizdas", close: "Uždaryti peržiūrą" },
  pl: { previous: "Poprzednie zdjęcie", next: "Następne zdjęcie", close: "Zamknij podgląd" },
};

const ABOUT_EXTRA = {
  fi:
    "Luomme kampauksia huolella, turvallisesti ja yksilöllisesti. Jokainen setti suunnitellaan niin, että se toimii kauniisti juuri sinun hiustyypillesi ja näyttää viimeistellyltä arjessa sekä juhlahetkissä.",
  en:
    "We create each set with care, safety and a personal approach. Every look is designed to suit your hair type beautifully and feel polished in everyday life as well as special moments.",
  ru:
    "Мы создаём комплекты бережно, безопасно и индивидуально. Каждый образ подбирается так, чтобы он красиво подходил именно вашему типу волос и хорошо смотрелся и в повседневной жизни, и в особенных случаях.",
  de:
    "Wir gestalten jedes Set sorgfältig, sicher und individuell. Jeder Look wird so geplant, dass er zu deinem Haartyp passt und sowohl im Alltag als auch zu besonderen Anlässen harmonisch aussieht.",
  fr:
    "Nous créons chaque set avec soin, en toute sécurité et de manière personnalisée. Chaque look est pensé pour s'adapter à ton type de cheveux et rester beau au quotidien comme lors des occasions spéciales.",
  it:
    "Creiamo ogni set con cura, sicurezza e un approccio personale. Ogni look è pensato per adattarsi al tuo tipo di capelli e apparire curato sia nella vita quotidiana sia nei momenti speciali.",
  el:
    "Δημιουργούμε κάθε σετ με φροντίδα, ασφάλεια και προσωπική προσέγγιση. Κάθε look σχεδιάζεται ώστε να ταιριάζει όμορφα στον τύπο των μαλλιών σου και να δείχνει προσεγμένο στην καθημερινότητα και στις ξεχωριστές στιγμές.",
  es:
    "Creamos cada set con cuidado, seguridad y un enfoque personal. Cada look se diseña para adaptarse bien a tu tipo de cabello y verse cuidado tanto en la vida diaria como en ocasiones especiales.",
  et:
    "Loome iga komplekti hoolikalt, turvaliselt ja personaalselt. Iga look kujundatakse nii, et see sobiks sinu juuksetüübiga ning näeks hea välja nii igapäevaselt kui ka erilistel hetkedel.",
  lv:
    "Mēs veidojam katru komplektu rūpīgi, droši un individuāli. Katrs tēls tiek plānots tā, lai tas skaisti piestāvētu tavam matu tipam un labi izskatītos gan ikdienā, gan īpašos brīžos.",
  lt:
    "Kiekvieną rinkinį kuriame kruopščiai, saugiai ir individualiai. Kiekvienas įvaizdis pritaikomas tavo plaukų tipui, kad gražiai atrodytų tiek kasdienybėje, tiek ypatingomis progomis.",
  pl:
    "Tworzymy każdy zestaw z troską, bezpiecznie i indywidualnie. Każdy look projektujemy tak, aby pasował do Twojego typu włosów i wyglądał dopracowanie zarówno na co dzień, jak i przy wyjątkowych okazjach.",
};

export function Home() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const aboutExtra = ABOUT_EXTRA[language] || ABOUT_EXTRA.en;
  const imgInterval = 12;
  const imgs = ["/img_slider1.png", "/img_slider2.png"];
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [showDreadsModal, setShowDreadsModal] = useState(false);
  const popularSets = [
    {
      img: "/homNav/Rastat.jpg",
      name: t("shop.categories.dreads"),
      onClick: () => setShowDreadsModal(true),
    },
    {
      img: "/homNav/Kiharat.jpg",
      name: t("header.curls"),
      to: "/shop/curls-on-mini-dread",
    },
    {
      img: "/homNav/Letit.jpg",
      name: t("shop.categories.braids"),
      to: "/shop/braids",
    },
    {
      img: "/homNav/HiuksetLetillä.jpg",
      name: t("shop.categories.hair-on-braid"),
      to: "/shop/hair-on-braid",
    },
    {
      img: "/dreads_card/prototyp1.jpg",
      name: t("shop.categories.other"),
      to: "/shop/other",
    },
  ];
  const reviewListRef = useRef(null);
  const [imgCount, setImgCount] = useState(imgInterval);
  const [galleryImages, setGalleryImages] = useState([]);
  const [reviewImages, setReviewImages] = useState([]);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const imgVisible = galleryImages.slice(0, imgCount);
  const galleryLightboxImages = imgVisible.slice(1);
  const instagramLabel = INSTAGRAM_LABELS[language] || INSTAGRAM_LABELS.en;
  const lightboxText = LIGHTBOX_TEXT[language] || LIGHTBOX_TEXT.en;
  const customSetContent = getCustomSetContent(language);
  const homeSectionContent = getHomeSectionContent(language);

  useEffect(() => {
    const loadHomeMedia = async () => {
      try {
        const response = await axios.get("/products/home-media/");
        setGalleryImages(response.data?.gallery ?? []);
        setReviewImages(response.data?.reviews ?? []);
      } catch {
        setGalleryImages([]);
        setReviewImages([]);
      }
    };

    loadHomeMedia();
  }, []);

  useEffect(() => {
    if (imgs.length < 2) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % imgs.length);
    }, 10000);

    return () => window.clearInterval(intervalId);
  }, [imgs.length]);

  const showMore = () => {
    setImgCount((prev) => Math.min(prev + imgInterval, galleryImages.length));
  };

  const showLess = () => {
    setImgCount((prev) => Math.max(prev - imgInterval, imgInterval));
  };

  const scroll = (direction) => {
    if (reviewListRef.current) {
      const scrollAmount = 250;
      reviewListRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleDreadChoice = (slug) => {
    setShowDreadsModal(false);
    navigate(`/shop/${slug}`);
  };

  const openLightbox = (images, index) => {
    setLightboxImages(images);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImages([]);
    setLightboxIndex(0);
  };

  const showPrevLightboxImage = () => {
    setLightboxIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1));
  };

  const showNextLightboxImage = () => {
    setLightboxIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className={styles.home}>
        <div
          className={styles.slider}
          style={{
            backgroundImage: `url(${imgs[currentHeroImage]})`,
            backgroundSize: "cover",
            backgroundPosition: currentHeroImage === 1 ? "center center" : "center top",
          }}
        >
          <h2>{t("home.heroTitle")}</h2>

          <div className={styles.more}>
            <Link to="/instock">{t("home.heroMore")}</Link>
          </div>
        </div>

        <div className={styles.popularSets}>
          <div className={styles.setsList}>
            {popularSets.map((set) => (
              <SetItem
                key={set.name}
                img={set.img}
                name={set.name}
                to={set.to}
                onClick={set.onClick}
              />
            ))}
          </div>
        </div>

        <div id={HOME_SECTION_IDS.about} className={`${styles.aboutWe} ${styles.anchorSection}`}>
          <h2>{t("home.aboutTitle")}</h2>
          <p>{t("home.aboutText")}</p>
          <p>{aboutExtra}</p>
        </div>

        <section id={HOME_SECTION_IDS.customSet} className={`${styles.customSet} ${styles.anchorSection}`}>
          <div className={styles.customSetIntro}>
            <span>{customSetContent.homeBadge}</span>
            <h2>{customSetContent.homeTitle}</h2>
            <p>{customSetContent.homeText}</p>
          </div>

          <div className={styles.customSetGrid}>
            {customSetContent.cards.map((card, index) => (
              <article
                key={card.title}
                className={styles.customSetCard}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <img src={card.image} alt={card.title} />
                <div className={styles.customSetCopy}>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.customSetAction}>
            <h3>{customSetContent.homeTitle}</h3>
            <Link to="/custom-set">{customSetContent.homeCta}</Link>
          </div>
        </section>

        <div id={HOME_SECTION_IDS.gallery} className={`${styles.gallery} ${styles.anchorSection}`}>
          <h2>{t("home.galleryTitle")}</h2>
          <div className={styles.galleryList}>
            <a
              href={INSTAGRAM_URL}
              className={`${styles.mediaButton} ${styles.instagramCard}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={INSTAGRAM_PREVIEW_IMAGE} alt="Instagram Letti Dreads" />
              <span>{instagramLabel}</span>
            </a>
            {imgVisible.slice(1).map((src, idx) => (
              <button
                type="button"
                key={src + idx}
                className={styles.mediaButton}
                onClick={() => openLightbox(galleryLightboxImages, idx)}
              >
                <img src={src} alt={`Gallery Image ${idx + 2}`} />
              </button>
            ))}
          </div>
          <div className={styles.galleryNav}>
            <button
              className={`${styles.scrollButton} ${styles.up}`}
              onClick={showLess}
              disabled={imgCount <= imgInterval}
            >
              &#8593;
            </button>
            <button
              className={`${styles.scrollButton} ${styles.down}`}
              onClick={showMore}
              disabled={imgCount >= galleryImages.length}
            >
              &#8595;
            </button>
          </div>
        </div>

        <div id={HOME_SECTION_IDS.reviews} className={`${styles.review} ${styles.anchorSection}`}>
          <h2>{t("home.reviewsTitle")}</h2>
          <div className={styles.reviewContainer}>
            <button className={styles.scrollButton} onClick={() => scroll("left")}>
              &#8249;
            </button>
            <div className={styles.reviewList} ref={reviewListRef}>
              {reviewImages.map((src, idx) => (
                <button
                  type="button"
                  key={idx}
                  className={styles.mediaButton}
                  onClick={() => openLightbox(reviewImages, idx)}
                >
                  <img src={src} alt={`Review ${idx + 1}`} />
                </button>
              ))}
            </div>
            <button className={styles.scrollButton} onClick={() => scroll("right")}>
              &#8250;
            </button>
          </div>
        </div>

        <section id={HOME_SECTION_IDS.expertise} className={`${styles.expertise} ${styles.anchorSection}`}>
          <div className={styles.expertiseIntro}>
            <span>{t("home.expertiseBadge")}</span>
            <h2>{t("home.expertiseTitle")}</h2>
            <p>{t("home.expertiseText")}</p>
          </div>
          <div className={styles.expertiseGrid}>
            {["booking", "reuse", "comfort"].map((key) => (
              <article key={key} className={styles.expertiseCard}>
                <h3>{t(`home.expertiseCards.${key}.title`)}</h3>
                <p>{t(`home.expertiseCards.${key}.text`)}</p>
              </article>
            ))}
          </div>
          <div className={styles.expertiseAction}>
            <Link to="/faq">{t("home.expertiseButton")}</Link>
          </div>
        </section>
      </div>

      {showDreadsModal ? (
        <div className={styles.dreadsModalOverlay} onClick={() => setShowDreadsModal(false)}>
          <div className={styles.dreadsModal} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={styles.dreadsClose}
              onClick={() => setShowDreadsModal(false)}
            >
              ×
            </button>
            <div className={styles.dreadsChoices}>
              <button
                type="button"
                className={styles.dreadsChoice}
                onClick={() => handleDreadChoice("smooth-dreads")}
              >
                <img src="/dreads_card/prototyp1.jpg" alt={t("shop.categories.smooth-dreads")} />
                <span>{t("shop.categories.smooth-dreads")}</span>
              </button>
              <button
                type="button"
                className={styles.dreadsChoice}
                onClick={() => handleDreadChoice("textured-dreads")}
              >
                <img src="/dreads_card/prototyp1.jpg" alt={t("shop.categories.textured-dreads")} />
                <span>{t("shop.categories.textured-dreads")}</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {lightboxImages.length ? (
        <div className={styles.lightboxOverlay} onClick={closeLightbox}>
          <div className={styles.lightboxStage} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={`${styles.lightboxArrow} ${styles.lightboxArrowLeft}`}
              onClick={showPrevLightboxImage}
              aria-label={lightboxText.previous}
            >
              ‹
            </button>
            <img
              className={styles.lightboxImage}
              src={lightboxImages[lightboxIndex]}
              alt={`Preview ${lightboxIndex + 1}`}
            />
            <button
              type="button"
              className={`${styles.lightboxArrow} ${styles.lightboxArrowRight}`}
              onClick={showNextLightboxImage}
              aria-label={lightboxText.next}
            >
              ›
            </button>
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={closeLightbox}
              aria-label={lightboxText.close}
            >
              ×
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
