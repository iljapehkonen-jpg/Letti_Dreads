import React from "react";
import styles from "./Contacts.module.scss";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

const BOOKING_NOTES = {
  fi: "Ajanvaraus on pakollinen.",
  en: "Booking is required in advance.",
  ru: "Предварительная запись обязательна.",
  de: "Eine Voranmeldung ist erforderlich.",
  fr: "La reservation prealable est obligatoire.",
  it: "La prenotazione anticipata e obbligatoria.",
  el: "Η προκρατηση ειναι υποχρεωτικη.",
  es: "La reserva previa es obligatoria.",
  et: "Eelnev broneering on kohustuslik.",
  lv: "Ieprieksejs pieraksts ir obligats.",
  lt: "Isankstine registracija yra privaloma.",
  pl: "Wczesniejsza rezerwacja jest obowiazkowa.",
};

const SOCIAL_LINKS = [
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

export const Contacts = () => {
  const { t, language } = useLanguage();

  return (
    <div className={styles.contacts}>
      <h1>{t("contacts.title")}</h1>

      <div className={styles.mapContainer}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984.789!2d24.8956291!3d60.2129865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4692095efffe9f29%3A0x6ed3be6f772231cc!2sLetti%20dreads!5e0!3m2!1sen!2sfi!4v1703123456789!5m2!1sen!2sfi"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Letti Dreads Location"
        ></iframe>
        <a
          href="https://www.google.com/maps/place/Letti+dreads/@60.2129865,24.8956291,17z/data=!3m1!4b1!4m6!3m5!1s0x4692095efffe9f29:0x6ed3be6f772231cc!8m2!3d60.2129839!4d24.898204!16s%2Fg%2F11z0vb0428?entry=ttu&g_ep=EgoyMDI2MDMwMi4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mapLink}
        >
          {t("contacts.openMaps")}
        </a>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.infoCard}>
          <h2>{t("contacts.contactInfo")}</h2>
          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <strong>{t("contacts.address")}:</strong>
              <p>Kauppalantie 26, 00320 Helsinki, Suomi</p>
            </div>
            <div className={styles.infoItem}>
              <strong>{t("contacts.phone")}:</strong>
              <p>
                <a href="tel:+358401234567">+358 40 123 4567</a>
              </p>
            </div>
            <div className={styles.infoItem}>
              <strong>{t("contacts.email")}:</strong>
              <p>
                <a href="mailto:letti.dreads@gmail.com">letti.dreads@gmail.com</a>
              </p>
            </div>
            <div className={styles.infoItem}>
              <strong>{t("contacts.website")}:</strong>
              <p>
                <a
                  href="https://www.lettidreads.fi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.lettidreads.fi
                </a>
              </p>
            </div>
          </div>
          <div className={styles.socialBlock}>
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialLink} ${styles[`socialLink${item.id[0].toUpperCase()}${item.id.slice(1)}`]}`}
                aria-label={item.label}
              >
                <span className={`${styles.socialIcon} ${styles[`socialIcon${item.id[0].toUpperCase()}${item.id.slice(1)}`]}`}>
                  {item.id === "instagram" ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9Zm9.65 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 6.8A5.2 5.2 0 1 1 6.8 12 5.2 5.2 0 0 1 12 6.8Zm0 1.8A3.4 3.4 0 1 0 15.4 12 3.4 3.4 0 0 0 12 8.6Z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : item.id === "facebook" ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M13.62 22v-8.18h2.75l.41-3.19h-3.16V8.59c0-.92.26-1.55 1.58-1.55h1.69V4.19A22.3 22.3 0 0 0 14.43 4c-2.44 0-4.12 1.49-4.12 4.22v2.41H7.54v3.19h2.77V22h3.31Z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M12.04 2C6.6 2 3.8 5.89 3.8 10.12c0 2.56.97 4.84 3.06 5.69.34.14.65 0 .75-.37.07-.26.23-.92.3-1.2.1-.37.06-.5-.22-.83-.6-.7-.98-1.61-.98-2.89 0-3.73 2.79-7.07 7.26-7.07 3.96 0 6.14 2.42 6.14 5.65 0 4.25-1.88 7.83-4.67 7.83-1.54 0-2.69-1.27-2.32-2.84.44-1.87 1.28-3.89 1.28-5.24 0-1.21-.65-2.22-2-2.22-1.59 0-2.86 1.64-2.86 3.84 0 1.4.47 2.35.47 2.35l-1.9 8.05c-.57 2.41-.08 5.37-.04 5.67.03.18.26.23.36.09.14-.19 1.95-2.42 2.56-4.64.17-.63.99-3.9.99-3.9.49.94 1.91 1.76 3.42 1.76 4.5 0 7.55-4.1 7.55-9.6C22.2 5.87 18.67 2 12.04 2Z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className={styles.infoCard}>
          <h2>{t("contacts.openingHours")}</h2>
          <p className={styles.bookingNote}>{BOOKING_NOTES[language] || BOOKING_NOTES.en}</p>
          <div className={styles.hours}>
            <ul>
              <li>
                <strong>{t("contacts.monday")}:</strong> <span>11:00 - 19:00</span>
              </li>
              <li>
                <strong>{t("contacts.tuesday")}:</strong> <span>11:00 - 19:00</span>
              </li>
              <li>
                <strong>{t("contacts.wednesday")}:</strong> <span>11:00 - 19:00</span>
              </li>
              <li>
                <strong>{t("contacts.thursday")}:</strong> <span>11:00 - 19:00</span>
              </li>
              <li>
                <strong>{t("contacts.friday")}:</strong> <span>11:00 - 19:00</span>
              </li>
              <li>
                <strong>{t("contacts.saturday")}:</strong> <span>{t("contacts.closed")}</span>
              </li>
              <li>
                <strong>{t("contacts.sunday")}:</strong> <span>{t("contacts.closed")}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
