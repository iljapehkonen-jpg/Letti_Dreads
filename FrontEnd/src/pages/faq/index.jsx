import styles from "./Faq.module.scss";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

export function FAQ() {
  const { t } = useLanguage();

  const questions = ["booking", "reuse", "comfort"].map((key) => ({
    question: t(`faq.items.${key}.question`),
    answer: t(`faq.items.${key}.answer`),
  }));

  const careRows = [
    ["dry", "itch"],
    ["sleep", "wear"],
    ["wash", "sauna"],
  ].map((row) =>
    row.map((key) => ({
      title: t(`faq.care.${key}.title`),
      text: t(`faq.care.${key}.text`),
      tip: t(`faq.care.${key}.tip`),
    })),
  );

  return (
    <div className={styles.faq}>
      <div className={styles.hero}>
        <h1>{t("faq.title")}</h1>
        <p>{t("faq.intro")}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.tipCard}>
          <h2>{t("faq.quickTitle")}</h2>
          <p>{t("faq.quickText")}</p>
        </div>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>{t("faq.questionsTitle")}</h2>
          </div>
          <div className={styles.list}>
            {questions.map((item) => (
              <article key={item.question} className={styles.item}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>{t("faq.careTitle")}</h2>
            <p>{t("faq.careIntro")}</p>
          </div>
          <div className={styles.careRows}>
            {careRows.map((row, index) => (
              <div key={index} className={styles.careGrid}>
                {row.map((item) => (
                  <article key={item.title} className={styles.item}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <p className={styles.tip}>{item.tip}</p>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
