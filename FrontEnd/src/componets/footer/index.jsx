import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./footer.module.scss";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

const contactLinks = {
  phone: "+358 40 123 4567",
  email: "letti.dreads@gmail.com",
  website: "https://www.lettidreads.fi",
  maps:
    "https://www.google.com/maps/place/Letti+dreads/@60.2129865,24.8956291,17z/data=!3m1!4b1!4m6!3m5!1s0x4692095efffe9f29:0x6ed3be6f772231cc!8m2!3d60.2129839!4d24.898204!16s%2Fg%2F11z0vb0428?entry=ttu&g_ep=EgoyMDI2MDMwMi4wIKXMDSoASAFQAw%3D%3D",
};

const socialLinks = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/letti_dreads/",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/search/top?q=Kuituletit%20%26%20Kuiturastat%20%7C%20Letti%20Dreads%20Helsinki",
  },
  {
    id: "pinterest",
    label: "Pinterest",
    href: "https://www.pinterest.com/search/users/?q=lettidreads",
  },
];

const sectionKeys = ["navigation", "shop", "contact", "hours"];

export function Footer() {
  const { t, language } = useLanguage();
  const [openSection, setOpenSection] = useState("navigation");

  const workdayLabels = {
    fi: "Ma-Pe",
    en: "Mon-Fri",
    ru: "Пн-Пт",
    de: "Mo-Fr",
    fr: "Lun-Ven",
    it: "Lun-Ven",
    el: "Δευ-Παρ",
    es: "Lun-Vie",
    et: "E-R",
    lv: "P-Pk",
    lt: "Pr-Pn",
    pl: "Pon-Pt",
  };

  const resolvedMonFriLabel = workdayLabels[language] || workdayLabels.en;
  const faqMenuLabel = t("header.faq");
  const resolvedCurlsOnMiniDreadLabel = t("header.curlsOnMiniDread");

  const toggleSection = (key) => {
    setOpenSection((prev) => (prev === key ? "" : key));
  };

  const renderSocialIcon = (id) => {
    if (id === "instagram") {
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9Zm9.65 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 6.8A5.2 5.2 0 1 1 6.8 12 5.2 5.2 0 0 1 12 6.8Zm0 1.8A3.4 3.4 0 1 0 15.4 12 3.4 3.4 0 0 0 12 8.6Z"
            fill="currentColor"
          />
        </svg>
      );
    }

    if (id === "facebook") {
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M13.62 22v-8.18h2.75l.41-3.19h-3.16V8.59c0-.92.26-1.55 1.58-1.55h1.69V4.19A22.3 22.3 0 0 0 14.43 4c-2.44 0-4.12 1.49-4.12 4.22v2.41H7.54v3.19h2.77V22h3.31Z"
            fill="currentColor"
          />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12.04 2C6.6 2 3.8 5.89 3.8 10.12c0 2.56.97 4.84 3.06 5.69.34.14.65 0 .75-.37.07-.26.23-.92.3-1.2.1-.37.06-.5-.22-.83-.6-.7-.98-1.61-.98-2.89 0-3.73 2.79-7.07 7.26-7.07 3.96 0 6.14 2.42 6.14 5.65 0 4.25-1.88 7.83-4.67 7.83-1.54 0-2.69-1.27-2.32-2.84.44-1.87 1.28-3.89 1.28-5.24 0-1.21-.65-2.22-2-2.22-1.59 0-2.86 1.64-2.86 3.84 0 1.4.47 2.35.47 2.35l-1.9 8.05c-.57 2.41-.08 5.37-.04 5.67.03.18.26.23.36.09.14-.19 1.95-2.42 2.56-4.64.17-.63.99-3.9.99-3.9.49.94 1.91 1.76 3.42 1.76 4.5 0 7.55-4.1 7.55-9.6C22.2 5.87 18.67 2 12.04 2Z"
          fill="currentColor"
        />
      </svg>
    );
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.brandBlock}>
        <img
          src="/image_no_bg__1_-removebg-preview.png"
          alt="Letti Dreads Logo"
          className={styles.footerLogo}
        />
        <h2>Letti Dreads</h2>
        <p>{t("footer.brandText")}</p>
        <div className={styles.actionLinks}>
          <a href={`mailto:${contactLinks.email}`}>{t("footer.emailUs")}</a>
        </div>
        <div className={styles.socialLinks}>
          {socialLinks.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialLink} ${styles[`socialLink${item.id[0].toUpperCase()}${item.id.slice(1)}`]}`}
              aria-label={item.label}
            >
              <span className={`${styles.socialIcon} ${styles[`socialIcon${item.id[0].toUpperCase()}${item.id.slice(1)}`]}`}>
                {renderSocialIcon(item.id)}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className={styles.linkColumn}>
        <button type="button" className={styles.footerToggle} onClick={() => toggleSection("navigation")}>
          <span>{t("footer.navigation")}</span>
          <span className={`${styles.footerCaret} ${openSection === "navigation" ? styles.footerCaretOpen : ""}`} />
        </button>
        <ul className={`${styles.menuList} ${openSection === "navigation" ? styles.footerSectionOpen : ""}`}>
          <li>
            <Link to="/">{t("footer.home")}</Link>
          </li>
          <li>
            <Link to="/shop">{t("footer.shop")}</Link>
          </li>
          <li>
            <Link to="/instock">{t("header.instock")}</Link>
          </li>
          <li>
            <Link to="/faq">{faqMenuLabel}</Link>
          </li>
          <li>
            <Link to="/contacts">{t("footer.contacts")}</Link>
          </li>
          <li>
            <Link to="/cart">{t("footer.cart")}</Link>
          </li>
        </ul>
      </div>

      <div className={styles.linkColumn}>
        <button type="button" className={styles.footerToggle} onClick={() => toggleSection("shop")}>
          <span>{t("footer.shopCategories")}</span>
          <span className={`${styles.footerCaret} ${openSection === "shop" ? styles.footerCaretOpen : ""}`} />
        </button>
        <ul className={`${styles.menuList} ${openSection === "shop" ? styles.footerSectionOpen : ""}`}>
          <li>
            <Link to="/shop/smooth-dreads">{t("header.smoothDreads")}</Link>
          </li>
          <li>
            <Link to="/shop/textured-dreads">{t("header.texturedDreads")}</Link>
          </li>
          <li>
            <Link to="/shop/curls">{t("footer.curls")}</Link>
          </li>
          <li>
            <Link to="/shop/braids">{t("footer.braids")}</Link>
          </li>
          <li>
            <Link to="/shop/hair-on-braid">{t("header.hairOnBraid")}</Link>
          </li>
          <li>
            <Link to="/shop/curls-on-mini-dread">{resolvedCurlsOnMiniDreadLabel}</Link>
          </li>
        </ul>
      </div>

      <div className={styles.infoColumn}>
        <button type="button" className={styles.footerToggle} onClick={() => toggleSection("contact")}>
          <span>{t("footer.contact")}</span>
          <span className={`${styles.footerCaret} ${openSection === "contact" ? styles.footerCaretOpen : ""}`} />
        </button>
        <ul className={`${styles.infoList} ${openSection === "contact" ? styles.footerSectionOpen : ""}`}>
          <li>
            <span>{t("footer.address")}</span>
            <a href={contactLinks.maps} target="_blank" rel="noopener noreferrer">
              Kauppalantie 26, 00320 Helsinki, Finland
            </a>
          </li>
          <li>
            <span>{t("footer.phone")}</span>
            <a href={`tel:${contactLinks.phone.replace(/\s+/g, "")}`}>{contactLinks.phone}</a>
          </li>
          <li>
            <span>{t("footer.email")}</span>
            <a href={`mailto:${contactLinks.email}`}>{contactLinks.email}</a>
          </li>
          <li>
            <span>{t("footer.website")}</span>
            <a href={contactLinks.website} target="_blank" rel="noopener noreferrer">
              lettidreads.fi
            </a>
          </li>
        </ul>
      </div>

      <div className={styles.infoColumn}>
        <button type="button" className={styles.footerToggle} onClick={() => toggleSection("hours")}>
          <span>{t("footer.openingHours")}</span>
          <span className={`${styles.footerCaret} ${openSection === "hours" ? styles.footerCaretOpen : ""}`} />
        </button>
        <ul className={`${styles.infoList} ${openSection === "hours" ? styles.footerSectionOpen : ""}`}>
          <li>
            <span>{resolvedMonFriLabel}</span>
            <p>11:00 - 19:00</p>
          </li>
          <li>
            <span>{t("footer.saturday")}</span>
            <p>{t("footer.closed")}</p>
          </li>
          <li>
            <span>{t("footer.sunday")}</span>
            <p>{t("footer.closed")}</p>
          </li>
        </ul>
      </div>

      <div className={styles.bottomBar}>
        <p>{t("footer.rights")}</p>
        <a href={contactLinks.maps} target="_blank" rel="noopener noreferrer">
          {t("footer.openMaps")}
        </a>
      </div>
    </footer>
  );
}
