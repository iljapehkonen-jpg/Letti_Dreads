import { Link } from "react-router-dom";
import styles from "./CustomSet.module.scss";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import { customSetLinks, getCustomSetContent } from "./content.js";

export function CustomSet() {
  const { language } = useLanguage();
  const content = getCustomSetContent(language);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span>{content.homeBadge}</span>
          <h1>{content.pageTitle}</h1>
          <p>{content.pageIntro}</p>
          <div className={styles.heroActions}>
            <a
              href={customSetLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryButton}
            >
              {content.pageButton}
            </a>
            <Link to={customSetLinks.contacts} className={styles.secondaryButton}>
              {content.contactsButton}
            </Link>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.visualCard}>
            <img src={content.cards[0].image} alt={content.cards[0].title} />
          </div>
          <div className={styles.visualStack}>
            <img src={content.cards[1].image} alt={content.cards[1].title} />
            <img src={content.cards[2].image} alt={content.cards[2].title} />
          </div>
        </div>
      </section>

      <section className={styles.examples}>
        <div className={styles.sectionIntro}>
          <span>{content.homeBadge}</span>
          <h2>{content.homeTitle}</h2>
        </div>

        <div className={styles.cardGrid}>
          {content.cards.map((card, index) => (
            <article
              key={card.title}
              className={styles.exampleCard}
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <img src={card.image} alt={card.title} />
              <div className={styles.exampleCopy}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.process}>
        <div className={styles.processPanel}>
          <div className={styles.processIntro}>
            <h2>{content.processTitle}</h2>
            <p>{content.homeText}</p>
          </div>
          <div className={styles.processSteps}>
            {content.processSteps.map((step, index) => (
              <article key={step} className={styles.stepCard}>
                <strong>0{index + 1}</strong>
                <p>{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.contactStrip}>
        <h2>{content.homeTitle}</h2>
        <p>{content.pageIntro}</p>
        <div className={styles.contactActions}>
          <a
            href={customSetLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primaryButton}
          >
            {content.instagramButton}
          </a>
          <Link to={customSetLinks.contacts} className={styles.secondaryButton}>
            {content.contactsButton}
          </Link>
        </div>
      </section>
    </div>
  );
}
