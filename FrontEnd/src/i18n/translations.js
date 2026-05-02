import { contentUpdates } from "./contentUpdates";

export const languages = [
  "fi",
  "en",
  "ru",
  "de",
  "fr",
  "it",
  "el",
  "es",
  "et",
  "lv",
  "lt",
  "pl",
];

const languageLabels = {
  fi: "FI",
  en: "EN",
  ru: "RU",
  de: "DE",
  fr: "FR",
  it: "IT",
  el: "EL",
  es: "ES",
  et: "ET",
  lv: "LV",
  lt: "LT",
  pl: "PL",
};

const deepMerge = (target, source) => {
  const output = { ...target };

  Object.keys(source || {}).forEach((key) => {
    const sourceValue = source[key];
    const targetValue = output[key];

    if (
      sourceValue &&
      typeof sourceValue === "object" &&
      !Array.isArray(sourceValue) &&
      targetValue &&
      typeof targetValue === "object" &&
      !Array.isArray(targetValue)
    ) {
      output[key] = deepMerge(targetValue, sourceValue);
      return;
    }

    output[key] = sourceValue;
  });

  return output;
};

const clone = (value) => JSON.parse(JSON.stringify(value));

const baseEnglish = {
  common: {
    language: "Language",
    loading: "Loading...",
    noItems: "No items",
  },
  header: {
    home: "Home",
    cart: "Cart",
    contacts: "Contacts",
    faq: "FAQ",
    shop: "Shop",
    other: "Other",
    dreads: "Dreads",
    smoothDreads: "Smooth dreads",
    texturedDreads: "Textured dreads",
    curls: "Curls",
    braids: "Braids",
    hairOnBraid: "Hair on braid",
    curlsOnMiniDread: "Curls on mini dread",
    account: "Account",
    menu: "Menu",
    login: "Login",
    instock: "Instock",
    brandFirst: "Letti",
    brandSecond: "Dreads",
  },
  home: {
    heroTitle: "READY-MADE SETS",
    heroMore: "See more",
    aboutTitle: "Who are we?",
    aboutText:
      "Letti Dreads is a creative hair studio with more than seven years of experience in alternative hairstyles. We specialize in handmade synthetic dreads, braids and curls, and we also offer installation and safe removal.",
    galleryTitle: "Gallery",
    reviewsTitle: "Reviews",
  },
  shop: {
    title: "Shop",
    categories: {
      dreads: "Dreads",
      "smooth-dreads": "Smooth dreads",
      "textured-dreads": "Textured dreads",
      curls: "Curls",
      braids: "Braids",
      "hair-on-braid": "Hair on braid",
      "curls-on-mini-dread": "Curls on mini dread",
      other: "Other",
    },
  },
  contacts: {
    title: "Contact us",
    openMaps: "Open in Google Maps",
    contactInfo: "Contact information",
    address: "Address",
    phone: "Phone",
    email: "Email",
    website: "Website",
    openingHours: "Opening hours",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    closed: "Closed",
  },
  faq: {
    title: "FAQ",
    intro:
      "Here you can find short answers to the most common questions about care, washing, wearing and keeping your set beautiful for as long as possible.",
    quickTitle: "Quick tip",
    quickText:
      "Handle every set gently, store it in a dry place and avoid unnecessary friction to keep the fibers neat and beautiful.",
    items: {
      care: {
        question: "How should I care for the hair every day?",
        answer:
          "Separate the fibers gently with your fingers, avoid heavy friction and store the set with enough space after use. Light and regular care works better than harsh treatment.",
      },
      wash: {
        question: "Can the set be washed?",
        answer:
          "Yes, but gently. Use a mild product, avoid hot water and let the set dry completely before the next use.",
      },
      install: {
        question: "How often should the installation be checked?",
        answer:
          "It depends on use, but we recommend checking the attachment regularly, especially when the set is worn actively or for long periods.",
      },
      lifetime: {
        question: "How long does the set stay in good condition?",
        answer:
          "Durability depends on material, amount of use and care. With proper storage and gentle handling, the set stays neat much longer.",
      },
    },
  },
  cart: {
    title: "Cart",
    selectAll: "Select all",
    deleteSelected: "Delete selected",
    delete: "Delete",
    unfavorite: "Remove from favorites",
    length: "Length",
    products: "Products",
    total: "Total",
    proceedToPayment: "Proceed to payment",
    yourCart: "Your cart",
  },
  footer: {
    brandText:
      "Handmade synthetic hairstyles, installations and safe removals in Helsinki.",
    emailUs: "Email us",
    navigation: "Navigation",
    shopCategories: "Shop categories",
    contact: "Contact",
    openingHours: "Opening hours",
    home: "Home",
    shop: "Shop",
    contacts: "Contacts",
    cart: "Cart",
    braids: "Braids",
    curls: "Curls",
    address: "Address",
    phone: "Phone",
    email: "Email",
    website: "Website",
    saturday: "Saturday",
    sunday: "Sunday",
    closed: "Closed",
    rights: "© 2026 Letti Dreads. All rights reserved.",
    openMaps: "Open in Google Maps",
  },
};

const localeOverrides = {
  fi: {
    common: {
      language: "Kieli",
      loading: "Ladataan...",
      noItems: "Ei tuotteita",
    },
    header: {
      home: "Etusivu",
      cart: "Ostoskori",
      contacts: "Yhteystiedot",
      faq: "FAQ",
      shop: "Kauppa",
      other: "Muu",
      dreads: "Rastat",
      smoothDreads: "Sileät rastat",
      texturedDreads: "Teksturoidut rastat",
      curls: "Kiharat",
      braids: "Letit",
      hairOnBraid: "Hiukset letillä",
      curlsOnMiniDread: "Kiharat pikku rastalla",
      account: "Tili",
      menu: "Valikko",
      login: "Kirjaudu",
      instock: "Valmiit setit",
    },
    home: {
      heroTitle: "VALMIIT SETIT",
      heroMore: "Katso lisää",
      aboutTitle: "Keitä me olemme?",
      aboutText:
        "Letti Dreads on luova hiusstudio, jolla on yli seitsemän vuoden kokemus vaihtoehtoisista kampauksista. Olemme erikoistuneet käsintehtyihin synteettisiin rastoihin, letteihin ja kiharoihin sekä tarjoamme myös asennuksen ja turvallisen poiston.",
      galleryTitle: "Galleria",
      reviewsTitle: "Arvostelut",
    },
    shop: {
      title: "Kauppa",
      categories: {
        dreads: "Rastat",
        "smooth-dreads": "Sileät rastat",
        "textured-dreads": "Teksturoidut rastat",
        curls: "Kiharat",
        braids: "Letit",
        "hair-on-braid": "Hiukset letillä",
        "curls-on-mini-dread": "Kiharat pikku rastalla",
        other: "Muu",
      },
    },
    contacts: {
      title: "Ota yhteyttä",
      openMaps: "Avaa Google Mapsissa",
      contactInfo: "Yhteystiedot",
      address: "Osoite",
      phone: "Puhelin",
      email: "Sähköposti",
      website: "Verkkosivusto",
      openingHours: "Aukioloajat",
      monday: "Maanantai",
      tuesday: "Tiistai",
      wednesday: "Keskiviikko",
      thursday: "Torstai",
      friday: "Perjantai",
      saturday: "Lauantai",
      sunday: "Sunnuntai",
      closed: "Suljettu",
    },
    faq: {
      title: "FAQ",
      intro:
        "Täältä löydät lyhyet vastaukset yleisimpiin kysymyksiin hoidosta, pesusta, käytöstä ja siitä, miten setti pysyy kauniina mahdollisimman pitkään.",
      quickTitle: "Nopea vinkki",
      quickText:
        "Käsittele settiä hellästi, säilytä kuivassa paikassa ja vältä turhaa hankausta, jotta kuidut pysyvät siisteinä.",
    },
    cart: {
      title: "Ostoskori",
      selectAll: "Valitse kaikki",
      deleteSelected: "Poista valitut",
      delete: "Poista",
      unfavorite: "Poista suosikeista",
      length: "Pituus",
      products: "Tuotteet",
      total: "Yhteensä",
      proceedToPayment: "Siirry maksuun",
      yourCart: "Ostoskorisi",
    },
    footer: {
      brandText:
        "Käsintehtyjä synteettisiä kampauksia, asennuksia ja turvallisia poistoja Helsingissä.",
      emailUs: "Lähetä sähköpostia",
      navigation: "Navigointi",
      shopCategories: "Tuotekategoriat",
      contact: "Yhteystiedot",
      openingHours: "Aukioloajat",
      home: "Etusivu",
      shop: "Kauppa",
      contacts: "Yhteystiedot",
      cart: "Ostoskori",
      braids: "Letit",
      curls: "Kiharat",
      address: "Osoite",
      phone: "Puhelin",
      email: "Sähköposti",
      website: "Verkkosivusto",
      saturday: "Lauantai",
      sunday: "Sunnuntai",
      closed: "Suljettu",
      rights: "© 2026 Letti Dreads. Kaikki oikeudet pidätetään.",
      openMaps: "Avaa Google Mapsissa",
    },
  },
  ru: {
    common: {
      language: "Язык",
      loading: "Загрузка...",
      noItems: "Нет товаров",
    },
    header: {
      home: "Главная",
      cart: "Корзина",
      contacts: "Контакты",
      faq: "Экспертность",
      shop: "Магазин",
      other: "Другое",
      dreads: "Дреды",
      smoothDreads: "Гладкие дреды",
      texturedDreads: "Текстурированные дреды",
      curls: "Кудри",
      braids: "Косы",
      hairOnBraid: "Волосы на косе",
      curlsOnMiniDread: "Кудри на дредине",
      account: "Аккаунт",
      menu: "Меню",
      login: "Войти",
      instock: "Готовые сеты",
    },
    home: {
      heroTitle: "ГОТОВЫЕ СЕТЫ",
      heroMore: "Смотреть больше",
      aboutTitle: "Кто мы?",
      aboutText:
        "Letti Dreads — это креативная студия волос с более чем семилетним опытом в альтернативных причёсках. Мы специализируемся на ручной работе: синтетические дреды, косы и кудри. Также мы предлагаем установку и безопасное снятие.",
      galleryTitle: "Галерея",
      reviewsTitle: "Отзывы",
    },
    shop: {
      title: "Магазин",
      categories: {
        dreads: "Дреды",
        "smooth-dreads": "Гладкие дреды",
        "textured-dreads": "Текстурированные дреды",
        curls: "Кудри",
        braids: "Косы",
        "hair-on-braid": "Волосы на косе",
        "curls-on-mini-dread": "Кудри на дредине",
        other: "Другое",
      },
    },
    contacts: {
      title: "Связаться с нами",
      openMaps: "Открыть в Google Maps",
      contactInfo: "Контактная информация",
      address: "Адрес",
      phone: "Телефон",
      email: "Электронная почта",
      website: "Сайт",
      openingHours: "Часы работы",
      monday: "Понедельник",
      tuesday: "Вторник",
      wednesday: "Среда",
      thursday: "Четверг",
      friday: "Пятница",
      saturday: "Суббота",
      sunday: "Воскресенье",
      closed: "Закрыто",
    },
    faq: {
      title: "Экспертность",
      intro:
        "Здесь собраны короткие ответы на самые частые вопросы об уходе, мытье, ношении и о том, как сохранить комплект красивым как можно дольше.",
      quickTitle: "Быстрый совет",
      quickText:
        "Обращайтесь с комплектом бережно, храните его в сухом месте и избегайте лишнего трения, чтобы волокна оставались аккуратными.",
    },
    cart: {
      title: "Корзина",
      selectAll: "Выбрать всё",
      deleteSelected: "Удалить выбранное",
      delete: "Удалить",
      unfavorite: "Убрать из избранного",
      length: "Длина",
      products: "Товары",
      total: "Итого",
      proceedToPayment: "Перейти к оплате",
      yourCart: "Ваша корзина",
    },
    footer: {
      brandText:
        "Ручная работа: синтетические причёски, установка и безопасное снятие в Хельсинки.",
      emailUs: "Написать нам",
      navigation: "Навигация",
      shopCategories: "Категории магазина",
      contact: "Контакты",
      openingHours: "Часы работы",
      home: "Главная",
      shop: "Магазин",
      contacts: "Контакты",
      cart: "Корзина",
      braids: "Косы",
      curls: "Кудри",
      address: "Адрес",
      phone: "Телефон",
      email: "Электронная почта",
      website: "Сайт",
      saturday: "Суббота",
      sunday: "Воскресенье",
      closed: "Закрыто",
      rights: "© 2026 Letti Dreads. Все права защищены.",
      openMaps: "Открыть в Google Maps",
    },
  },
  de: {
    common: { language: "Sprache", loading: "Wird geladen...", noItems: "Keine Artikel" },
    header: { home: "Startseite", cart: "Warenkorb", contacts: "Kontakte", faq: "FAQ", shop: "Shop", other: "Andere", dreads: "Dreads", smoothDreads: "Glatte Dreads", texturedDreads: "Strukturierte Dreads", curls: "Locken", braids: "Zöpfe", hairOnBraid: "Haare auf Zopf", curlsOnMiniDread: "Locken auf Mini-Dread", account: "Konto", menu: "Menü", login: "Anmelden", instock: "Fertige Sets" },
    home: { heroTitle: "SOFORT VERFÜGBARE SETS", heroMore: "Mehr ansehen", aboutTitle: "Wer sind wir?", aboutText: "Letti Dreads ist ein kreatives Haarstudio mit mehr als sieben Jahren Erfahrung im Bereich alternativer Frisuren. Wir fertigen synthetische Dreads, Zöpfe und Locken von Hand an und bieten auch Anbringung und sichere Entfernung an.", galleryTitle: "Galerie", reviewsTitle: "Bewertungen" },
    shop: { title: "Shop", categories: { dreads: "Dreads", "smooth-dreads": "Glatte Dreads", "textured-dreads": "Strukturierte Dreads", curls: "Locken", braids: "Zöpfe", "hair-on-braid": "Haare auf Zopf", "curls-on-mini-dread": "Locken auf Mini-Dread", other: "Andere" } },
    contacts: { title: "Kontaktieren Sie uns", openMaps: "In Google Maps öffnen", contactInfo: "Kontaktinformationen", address: "Adresse", phone: "Telefon", email: "E-Mail", website: "Website", openingHours: "Öffnungszeiten", monday: "Montag", tuesday: "Dienstag", wednesday: "Mittwoch", thursday: "Donnerstag", friday: "Freitag", saturday: "Samstag", sunday: "Sonntag", closed: "Geschlossen" },
    faq: { title: "FAQ", intro: "Hier finden Sie kurze Antworten auf die häufigsten Fragen zu Pflege, Waschen, Tragen und dazu, wie Ihr Set möglichst lange schön bleibt.", quickTitle: "Kurzer Tipp", quickText: "Behandeln Sie das Set vorsichtig, lagern Sie es trocken und vermeiden Sie unnötige Reibung, damit die Fasern ordentlich bleiben." },
    cart: { title: "Warenkorb", selectAll: "Alles auswählen", deleteSelected: "Ausgewählte löschen", delete: "Löschen", unfavorite: "Aus Favoriten entfernen", length: "Länge", products: "Produkte", total: "Gesamt", proceedToPayment: "Zur Kasse", yourCart: "Ihr Warenkorb" },
    footer: { brandText: "Handgefertigte synthetische Frisuren, Anbringung und sichere Entfernung in Helsinki.", emailUs: "E-Mail senden", navigation: "Navigation", shopCategories: "Shop-Kategorien", contact: "Kontakt", openingHours: "Öffnungszeiten", home: "Startseite", shop: "Shop", contacts: "Kontakte", cart: "Warenkorb", braids: "Zöpfe", curls: "Locken", address: "Adresse", phone: "Telefon", email: "E-Mail", website: "Website", saturday: "Samstag", sunday: "Sonntag", closed: "Geschlossen", rights: "© 2026 Letti Dreads. Alle Rechte vorbehalten.", openMaps: "In Google Maps öffnen" },
  },
  fr: {
    common: { language: "Langue", loading: "Chargement...", noItems: "Aucun article" },
    header: { home: "Accueil", cart: "Panier", contacts: "Contacts", faq: "FAQ", shop: "Boutique", other: "Autre", dreads: "Dreads", smoothDreads: "Dreads lisses", texturedDreads: "Dreads texturés", curls: "Boucles", braids: "Tresses", hairOnBraid: "Cheveux sur tresse", curlsOnMiniDread: "Boucles sur mini-dread", account: "Compte", menu: "Menu", login: "Connexion", instock: "Sets prêts" },
    home: { heroTitle: "SETS PRÊTS", heroMore: "Voir plus", aboutTitle: "Qui sommes-nous ?", aboutText: "Letti Dreads est un studio capillaire créatif avec plus de sept ans d'expérience dans les coiffures alternatives. Nous réalisons à la main des dreads synthétiques, des tresses et des boucles, et nous proposons aussi la pose et le retrait en toute sécurité.", galleryTitle: "Galerie", reviewsTitle: "Avis" },
    shop: { title: "Boutique", categories: { dreads: "Dreads", "smooth-dreads": "Dreads lisses", "textured-dreads": "Dreads texturés", curls: "Boucles", braids: "Tresses", "hair-on-braid": "Cheveux sur tresse", "curls-on-mini-dread": "Boucles sur mini-dread", other: "Autre" } },
    contacts: { title: "Contactez-nous", openMaps: "Ouvrir dans Google Maps", contactInfo: "Informations de contact", address: "Adresse", phone: "Téléphone", email: "E-mail", website: "Site web", openingHours: "Horaires d'ouverture", monday: "Lundi", tuesday: "Mardi", wednesday: "Mercredi", thursday: "Jeudi", friday: "Vendredi", saturday: "Samedi", sunday: "Dimanche", closed: "Fermé" },
    faq: { title: "FAQ", intro: "Vous trouverez ici de courtes réponses aux questions les plus fréquentes sur l'entretien, le lavage, le port et la manière de garder votre set beau le plus longtemps possible.", quickTitle: "Conseil rapide", quickText: "Manipulez le set avec soin, conservez-le dans un endroit sec et évitez les frottements inutiles pour garder les fibres nettes." },
    cart: { title: "Panier", selectAll: "Tout sélectionner", deleteSelected: "Supprimer la sélection", delete: "Supprimer", unfavorite: "Retirer des favoris", length: "Longueur", products: "Produits", total: "Total", proceedToPayment: "Passer au paiement", yourCart: "Votre panier" },
    footer: { brandText: "Coiffures synthétiques faites main, pose et retrait en toute sécurité à Helsinki.", emailUs: "Nous écrire", navigation: "Navigation", shopCategories: "Catégories de la boutique", contact: "Contact", openingHours: "Horaires d'ouverture", home: "Accueil", shop: "Boutique", contacts: "Contacts", cart: "Panier", braids: "Tresses", curls: "Boucles", address: "Adresse", phone: "Téléphone", email: "E-mail", website: "Site web", saturday: "Samedi", sunday: "Dimanche", closed: "Fermé", rights: "© 2026 Letti Dreads. Tous droits réservés.", openMaps: "Ouvrir dans Google Maps" },
  },
  it: {
    common: { language: "Lingua", loading: "Caricamento...", noItems: "Nessun articolo" },
    header: { home: "Home", cart: "Carrello", contacts: "Contatti", faq: "FAQ", shop: "Negozio", other: "Altro", dreads: "Dreads", smoothDreads: "Dreads lisci", texturedDreads: "Dreads testurizzati", curls: "Ricci", braids: "Treccine", hairOnBraid: "Capelli su treccia", curlsOnMiniDread: "Ricci su mini-dread", account: "Account", menu: "Menu", login: "Accedi", instock: "Set pronti" },
    home: { heroTitle: "SET PRONTI", heroMore: "Vedi di più", aboutTitle: "Chi siamo?", aboutText: "Letti Dreads è uno studio creativo per capelli con oltre sette anni di esperienza nelle acconciature alternative. Realizziamo a mano dreads sintetici, trecce e ricci e offriamo anche installazione e rimozione sicura.", galleryTitle: "Galleria", reviewsTitle: "Recensioni" },
    shop: { title: "Negozio", categories: { dreads: "Dreads", "smooth-dreads": "Dreads lisci", "textured-dreads": "Dreads testurizzati", curls: "Ricci", braids: "Treccine", "hair-on-braid": "Capelli su treccia", "curls-on-mini-dread": "Ricci su mini-dread", other: "Altro" } },
    contacts: { title: "Contattaci", openMaps: "Apri in Google Maps", contactInfo: "Informazioni di contatto", address: "Indirizzo", phone: "Telefono", email: "E-mail", website: "Sito web", openingHours: "Orari di apertura", monday: "Lunedì", tuesday: "Martedì", wednesday: "Mercoledì", thursday: "Giovedì", friday: "Venerdì", saturday: "Sabato", sunday: "Domenica", closed: "Chiuso" },
    faq: { title: "FAQ", intro: "Qui puoi trovare risposte brevi alle domande più comuni su cura, lavaggio, utilizzo e su come mantenere il set bello il più a lungo possibile.", quickTitle: "Consiglio rapido", quickText: "Tratta il set con delicatezza, conservalo in un luogo asciutto ed evita attriti inutili per mantenere le fibre in ordine." },
    cart: { title: "Carrello", selectAll: "Seleziona tutto", deleteSelected: "Elimina selezionati", delete: "Elimina", unfavorite: "Rimuovi dai preferiti", length: "Lunghezza", products: "Prodotti", total: "Totale", proceedToPayment: "Procedi al pagamento", yourCart: "Il tuo carrello" },
    footer: { brandText: "Acconciature sintetiche fatte a mano, installazione e rimozione sicura a Helsinki.", emailUs: "Scrivici", navigation: "Navigazione", shopCategories: "Categorie del negozio", contact: "Contatti", openingHours: "Orari di apertura", home: "Home", shop: "Negozio", contacts: "Contatti", cart: "Carrello", braids: "Treccine", curls: "Ricci", address: "Indirizzo", phone: "Telefono", email: "E-mail", website: "Sito web", saturday: "Sabato", sunday: "Domenica", closed: "Chiuso", rights: "© 2026 Letti Dreads. Tutti i diritti riservati.", openMaps: "Apri in Google Maps" },
  },
  el: {
    common: { language: "Γλώσσα", loading: "Φόρτωση...", noItems: "Δεν υπάρχουν προϊόντα" },
    header: { home: "Αρχική", cart: "Καλάθι", contacts: "Επικοινωνία", faq: "FAQ", shop: "Κατάστημα", other: "Άλλο", dreads: "Dreads", smoothDreads: "Λεία dreads", texturedDreads: "Υφασμάτινα dreads", curls: "Μπούκλες", braids: "Κοτσίδες", hairOnBraid: "Μαλλιά σε κοτσίδα", curlsOnMiniDread: "Μπούκλες σε mini-dread", account: "Λογαριασμός", menu: "Μενού", login: "Σύνδεση", instock: "Έτοιμα σετ" },
    home: { heroTitle: "ΕΤΟΙΜΑ ΣΕΤ", heroMore: "Δείτε περισσότερα", aboutTitle: "Ποιοι είμαστε;", aboutText: "Το Letti Dreads είναι ένα δημιουργικό στούντιο μαλλιών με πάνω από επτά χρόνια εμπειρίας σε εναλλακτικά χτενίσματα. Δημιουργούμε χειροποίητα συνθετικά dreads, κοτσίδες και μπούκλες και προσφέρουμε επίσης τοποθέτηση και ασφαλή αφαίρεση.", galleryTitle: "Γκαλερί", reviewsTitle: "Κριτικές" },
    shop: { title: "Κατάστημα", categories: { dreads: "Dreads", "smooth-dreads": "Λεία dreads", "textured-dreads": "Υφασμάτινα dreads", curls: "Μπούκλες", braids: "Κοτσίδες", "hair-on-braid": "Μαλλιά σε κοτσίδα", "curls-on-mini-dread": "Μπούκλες σε mini-dread", other: "Άλλο" } },
    contacts: { title: "Επικοινωνήστε μαζί μας", openMaps: "Άνοιγμα στους Χάρτες Google", contactInfo: "Στοιχεία επικοινωνίας", address: "Διεύθυνση", phone: "Τηλέφωνο", email: "Email", website: "Ιστότοπος", openingHours: "Ώρες λειτουργίας", monday: "Δευτέρα", tuesday: "Τρίτη", wednesday: "Τετάρτη", thursday: "Πέμπτη", friday: "Παρασκευή", saturday: "Σάββατο", sunday: "Κυριακή", closed: "Κλειστό" },
    faq: { title: "FAQ", intro: "Εδώ θα βρείτε σύντομες απαντήσεις στις πιο συχνές ερωτήσεις σχετικά με τη φροντίδα, το πλύσιμο, τη χρήση και το πώς να διατηρείτε το σετ όμορφο για όσο το δυνατόν περισσότερο.", quickTitle: "Γρήγορη συμβουλή", quickText: "Χειριστείτε το σετ απαλά, αποθηκεύστε το σε στεγνό μέρος και αποφύγετε την περιττή τριβή ώστε οι ίνες να παραμένουν τακτοποιημένες." },
    cart: { title: "Καλάθι", selectAll: "Επιλογή όλων", deleteSelected: "Διαγραφή επιλεγμένων", delete: "Διαγραφή", unfavorite: "Αφαίρεση από τα αγαπημένα", length: "Μήκος", products: "Προϊόντα", total: "Σύνολο", proceedToPayment: "Μετάβαση στην πληρωμή", yourCart: "Το καλάθι σας" },
    footer: { brandText: "Χειροποίητα συνθετικά χτενίσματα, τοποθέτηση και ασφαλής αφαίρεση στο Ελσίνκι.", emailUs: "Στείλτε email", navigation: "Πλοήγηση", shopCategories: "Κατηγορίες καταστήματος", contact: "Επικοινωνία", openingHours: "Ώρες λειτουργίας", home: "Αρχική", shop: "Κατάστημα", contacts: "Επικοινωνία", cart: "Καλάθι", braids: "Κοτσίδες", curls: "Μπούκλες", address: "Διεύθυνση", phone: "Τηλέφωνο", email: "Email", website: "Ιστότοπος", saturday: "Σάββατο", sunday: "Κυριακή", closed: "Κλειστό", rights: "© 2026 Letti Dreads. Με επιφύλαξη παντός δικαιώματος.", openMaps: "Άνοιγμα στους Χάρτες Google" },
  },
  es: {
    common: { language: "Idioma", loading: "Cargando...", noItems: "No hay artículos" },
    header: { home: "Inicio", cart: "Carrito", contacts: "Contactos", faq: "FAQ", shop: "Tienda", other: "Otro", dreads: "Dreads", smoothDreads: "Dreads lisos", texturedDreads: "Dreads texturizados", curls: "Rizos", braids: "Trenzas", hairOnBraid: "Cabello en trenza", curlsOnMiniDread: "Rizos en mini dread", account: "Cuenta", menu: "Menú", login: "Iniciar sesión", instock: "Sets listos" },
    home: { heroTitle: "SETS LISTOS", heroMore: "Ver más", aboutTitle: "¿Quiénes somos?", aboutText: "Letti Dreads es un estudio creativo de cabello con más de siete años de experiencia en peinados alternativos. Creamos a mano dreads sintéticos, trenzas y rizos, y también ofrecemos instalación y retirada segura.", galleryTitle: "Galería", reviewsTitle: "Reseñas" },
    shop: { title: "Tienda", categories: { dreads: "Dreads", "smooth-dreads": "Dreads lisos", "textured-dreads": "Dreads texturizados", curls: "Rizos", braids: "Trenzas", "hair-on-braid": "Cabello en trenza", "curls-on-mini-dread": "Rizos en mini dread", other: "Otro" } },
    contacts: { title: "Contáctanos", openMaps: "Abrir en Google Maps", contactInfo: "Información de contacto", address: "Dirección", phone: "Teléfono", email: "Correo electrónico", website: "Sitio web", openingHours: "Horario", monday: "Lunes", tuesday: "Martes", wednesday: "Miércoles", thursday: "Jueves", friday: "Viernes", saturday: "Sábado", sunday: "Domingo", closed: "Cerrado" },
    faq: { title: "FAQ", intro: "Aquí encontrarás respuestas breves a las preguntas más comunes sobre cuidado, lavado, uso y cómo mantener el set bonito durante el mayor tiempo posible.", quickTitle: "Consejo rápido", quickText: "Manipula el set con cuidado, guárdalo en un lugar seco y evita la fricción innecesaria para que las fibras se mantengan ordenadas." },
    cart: { title: "Carrito", selectAll: "Seleccionar todo", deleteSelected: "Eliminar seleccionados", delete: "Eliminar", unfavorite: "Quitar de favoritos", length: "Largo", products: "Productos", total: "Total", proceedToPayment: "Ir al pago", yourCart: "Tu carrito" },
    footer: { brandText: "Peinados sintéticos hechos a mano, instalación y retirada segura en Helsinki.", emailUs: "Envíanos un correo", navigation: "Navegación", shopCategories: "Categorías de la tienda", contact: "Contacto", openingHours: "Horario", home: "Inicio", shop: "Tienda", contacts: "Contactos", cart: "Carrito", braids: "Trenzas", curls: "Rizos", address: "Dirección", phone: "Teléfono", email: "Correo electrónico", website: "Sitio web", saturday: "Sábado", sunday: "Domingo", closed: "Cerrado", rights: "© 2026 Letti Dreads. Todos los derechos reservados.", openMaps: "Abrir en Google Maps" },
  },
  et: {
    common: { language: "Keel", loading: "Laadimine...", noItems: "Tooteid pole" },
    header: { home: "Avaleht", cart: "Ostukorv", contacts: "Kontaktid", faq: "FAQ", shop: "Pood", other: "Muu", dreads: "Rastad", smoothDreads: "Siledad rastad", texturedDreads: "Tekstuuriga rastad", curls: "Lokid", braids: "Patsid", hairOnBraid: "Juuksed patsi peal", curlsOnMiniDread: "Lokid mini-rasta peal", account: "Konto", menu: "Menüü", login: "Logi sisse", instock: "Valmis komplektid" },
    home: { heroTitle: "VALMIS KOMPLEKTID", heroMore: "Vaata rohkem", aboutTitle: "Kes me oleme?", aboutText: "Letti Dreads on loominguline juuksestuudio, millel on üle seitsme aasta kogemust alternatiivsete soengute loomisel. Valmistame käsitsi sünteetilisi rastasid, patse ja lokke ning pakume ka paigaldust ja turvalist eemaldamist.", galleryTitle: "Galerii", reviewsTitle: "Arvustused" },
    shop: { title: "Pood", categories: { dreads: "Rastad", "smooth-dreads": "Siledad rastad", "textured-dreads": "Tekstuuriga rastad", curls: "Lokid", braids: "Patsid", "hair-on-braid": "Juuksed patsi peal", "curls-on-mini-dread": "Lokid mini-rasta peal", other: "Muu" } },
    contacts: { title: "Võta ühendust", openMaps: "Ava Google Mapsis", contactInfo: "Kontaktandmed", address: "Aadress", phone: "Telefon", email: "E-post", website: "Veebisait", openingHours: "Lahtiolekuajad", monday: "Esmaspäev", tuesday: "Teisipäev", wednesday: "Kolmapäev", thursday: "Neljapäev", friday: "Reede", saturday: "Laupäev", sunday: "Pühapäev", closed: "Suletud" },
    faq: { title: "FAQ", intro: "Siit leiad lühikesed vastused kõige sagedasematele küsimustele hoolduse, pesemise, kandmise ja selle kohta, kuidas komplekti võimalikult kaua ilusana hoida.", quickTitle: "Kiire nõuanne", quickText: "Käsitse komplekti õrnalt, hoia seda kuivas kohas ja väldi liigset hõõrdumist, et kiud püsiksid korras." },
    cart: { title: "Ostukorv", selectAll: "Vali kõik", deleteSelected: "Kustuta valitud", delete: "Kustuta", unfavorite: "Eemalda lemmikutest", length: "Pikkus", products: "Tooted", total: "Kokku", proceedToPayment: "Mine maksma", yourCart: "Sinu ostukorv" },
    footer: { brandText: "Käsitsi valmistatud sünteetilised soengud, paigaldus ja turvaline eemaldamine Helsingis.", emailUs: "Saada meile e-kiri", navigation: "Navigeerimine", shopCategories: "Poekategooriad", contact: "Kontakt", openingHours: "Lahtiolekuajad", home: "Avaleht", shop: "Pood", contacts: "Kontaktid", cart: "Ostukorv", braids: "Patsid", curls: "Lokid", address: "Aadress", phone: "Telefon", email: "E-post", website: "Veebisait", saturday: "Laupäev", sunday: "Pühapäev", closed: "Suletud", rights: "© 2026 Letti Dreads. Kõik õigused kaitstud.", openMaps: "Ava Google Mapsis" },
  },
  lv: {
    common: { language: "Valoda", loading: "Ielādē...", noItems: "Nav preču" },
    header: { home: "Sākums", cart: "Grozs", contacts: "Kontakti", faq: "FAQ", shop: "Veikals", other: "Cits", dreads: "Dredi", smoothDreads: "Gludie dredi", texturedDreads: "Teksturēti dredi", curls: "Lokas", braids: "Pīnes", hairOnBraid: "Mati uz pīnes", curlsOnMiniDread: "Lokas uz mini-dreda", account: "Konts", menu: "Izvēlne", login: "Pieteikties", instock: "Gatavie komplekti" },
    home: { heroTitle: "GATAVIE KOMPLEKTI", heroMore: "Skatīt vairāk", aboutTitle: "Kas mēs esam?", aboutText: "Letti Dreads ir radoša matu studija ar vairāk nekā septiņu gadu pieredzi alternatīvu frizūru jomā. Mēs ar rokām izgatavojam sintētiskos dredus, pīnes un lokas, kā arī piedāvājam uzstādīšanu un drošu noņemšanu.", galleryTitle: "Galerija", reviewsTitle: "Atsauksmes" },
    shop: { title: "Veikals", categories: { dreads: "Dredi", "smooth-dreads": "Gludie dredi", "textured-dreads": "Teksturēti dredi", curls: "Lokas", braids: "Pīnes", "hair-on-braid": "Mati uz pīnes", "curls-on-mini-dread": "Lokas uz mini-dreda", other: "Cits" } },
    contacts: { title: "Sazinieties ar mums", openMaps: "Atvērt Google Maps", contactInfo: "Kontaktinformācija", address: "Adrese", phone: "Tālrunis", email: "E-pasts", website: "Tīmekļa vietne", openingHours: "Darba laiks", monday: "Pirmdiena", tuesday: "Otrdiena", wednesday: "Trešdiena", thursday: "Ceturtdiena", friday: "Piektdiena", saturday: "Sestdiena", sunday: "Svētdiena", closed: "Slēgts" },
    faq: { title: "FAQ", intro: "Šeit atradīsiet īsas atbildes uz biežākajiem jautājumiem par kopšanu, mazgāšanu, valkāšanu un to, kā pēc iespējas ilgāk saglabāt komplektu skaistu.", quickTitle: "Ātrs padoms", quickText: "Apstrādājiet komplektu saudzīgi, glabājiet to sausā vietā un izvairieties no liekas berzes, lai šķiedras paliktu glītas." },
    cart: { title: "Grozs", selectAll: "Atlasīt visu", deleteSelected: "Dzēst atlasīto", delete: "Dzēst", unfavorite: "Noņemt no izlases", length: "Garums", products: "Produkti", total: "Kopā", proceedToPayment: "Doties uz apmaksu", yourCart: "Jūsu grozs" },
    footer: { brandText: "Ar rokām veidotas sintētiskas frizūras, uzstādīšana un droša noņemšana Helsinkos.", emailUs: "Rakstiet mums", navigation: "Navigācija", shopCategories: "Veikala kategorijas", contact: "Kontakti", openingHours: "Darba laiks", home: "Sākums", shop: "Veikals", contacts: "Kontakti", cart: "Grozs", braids: "Pīnes", curls: "Lokas", address: "Adrese", phone: "Tālrunis", email: "E-pasts", website: "Tīmekļa vietne", saturday: "Sestdiena", sunday: "Svētdiena", closed: "Slēgts", rights: "© 2026 Letti Dreads. Visas tiesības aizsargātas.", openMaps: "Atvērt Google Maps" },
  },
  lt: {
    common: { language: "Kalba", loading: "Kraunama...", noItems: "Prekių nėra" },
    header: { home: "Pagrindinis", cart: "Krepšelis", contacts: "Kontaktai", faq: "FAQ", shop: "Parduotuvė", other: "Kita", dreads: "Dredai", smoothDreads: "Lygūs dredai", texturedDreads: "Tekstūriniai dredai", curls: "Garbanos", braids: "Kasos", hairOnBraid: "Plaukai ant kasos", curlsOnMiniDread: "Garbanos ant mini dredo", account: "Paskyra", menu: "Meniu", login: "Prisijungti", instock: "Paruošti rinkiniai" },
    home: { heroTitle: "PARUOŠTI RINKINIAI", heroMore: "Žiūrėti daugiau", aboutTitle: "Kas mes esame?", aboutText: "Letti Dreads yra kūrybinė plaukų studija, turinti daugiau nei septynerių metų patirtį alternatyvių šukuosenų srityje. Rankomis gaminame sintetinius dredus, kasas ir garbanas, taip pat siūlome įdėjimą ir saugų nuėmimą.", galleryTitle: "Galerija", reviewsTitle: "Atsiliepimai" },
    shop: { title: "Parduotuvė", categories: { dreads: "Dredai", "smooth-dreads": "Lygūs dredai", "textured-dreads": "Tekstūriniai dredai", curls: "Garbanos", braids: "Kasos", "hair-on-braid": "Plaukai ant kasos", "curls-on-mini-dread": "Garbanos ant mini dredo", other: "Kita" } },
    contacts: { title: "Susisiekite su mumis", openMaps: "Atidaryti Google Maps", contactInfo: "Kontaktinė informacija", address: "Adresas", phone: "Telefonas", email: "El. paštas", website: "Svetainė", openingHours: "Darbo laikas", monday: "Pirmadienis", tuesday: "Antradienis", wednesday: "Trečiadienis", thursday: "Ketvirtadienis", friday: "Penktadienis", saturday: "Šeštadienis", sunday: "Sekmadienis", closed: "Uždaryta" },
    faq: { title: "FAQ", intro: "Čia rasite trumpus atsakymus į dažniausius klausimus apie priežiūrą, plovimą, nešiojimą ir tai, kaip kuo ilgiau išlaikyti rinkinį gražų.", quickTitle: "Greitas patarimas", quickText: "Su rinkiniu elkitės švelniai, laikykite jį sausoje vietoje ir venkite nereikalingos trinties, kad pluoštai išliktų tvarkingi." },
    cart: { title: "Krepšelis", selectAll: "Pažymėti viską", deleteSelected: "Ištrinti pažymėtus", delete: "Ištrinti", unfavorite: "Pašalinti iš mėgstamų", length: "Ilgis", products: "Produktai", total: "Iš viso", proceedToPayment: "Tęsti apmokėjimą", yourCart: "Jūsų krepšelis" },
    footer: { brandText: "Rankų darbo sintetinės šukuosenos, įdėjimas ir saugus nuėmimas Helsinkyje.", emailUs: "Rašykite mums", navigation: "Navigacija", shopCategories: "Parduotuvės kategorijos", contact: "Kontaktai", openingHours: "Darbo laikas", home: "Pagrindinis", shop: "Parduotuvė", contacts: "Kontaktai", cart: "Krepšelis", braids: "Kasos", curls: "Garbanos", address: "Adresas", phone: "Telefonas", email: "El. paštas", website: "Svetainė", saturday: "Šeštadienis", sunday: "Sekmadienis", closed: "Uždaryta", rights: "© 2026 Letti Dreads. Visos teisės saugomos.", openMaps: "Atidaryti Google Maps" },
  },
  pl: {
    common: { language: "Język", loading: "Ładowanie...", noItems: "Brak produktów" },
    header: { home: "Strona główna", cart: "Koszyk", contacts: "Kontakt", faq: "FAQ", shop: "Sklep", other: "Inne", dreads: "Dredy", smoothDreads: "Gładkie dredy", texturedDreads: "Teksturowane dredy", curls: "Loki", braids: "Warkocze", hairOnBraid: "Włosy na warkoczu", curlsOnMiniDread: "Loki na mini-dredzie", account: "Konto", menu: "Menu", login: "Zaloguj się", instock: "Gotowe zestawy" },
    home: { heroTitle: "GOTOWE ZESTAWY", heroMore: "Zobacz więcej", aboutTitle: "Kim jesteśmy?", aboutText: "Letti Dreads to kreatywne studio włosów z ponad siedmioletnim doświadczeniem w alternatywnych fryzurach. Ręcznie tworzymy syntetyczne dredy, warkocze i loki, a także oferujemy zakładanie i bezpieczne zdejmowanie.", galleryTitle: "Galeria", reviewsTitle: "Opinie" },
    shop: { title: "Sklep", categories: { dreads: "Dredy", "smooth-dreads": "Gładkie dredy", "textured-dreads": "Teksturowane dredy", curls: "Loki", braids: "Warkocze", "hair-on-braid": "Włosy na warkoczu", "curls-on-mini-dread": "Loki na mini-dredzie", other: "Inne" } },
    contacts: { title: "Skontaktuj się z nami", openMaps: "Otwórz w Google Maps", contactInfo: "Informacje kontaktowe", address: "Adres", phone: "Telefon", email: "E-mail", website: "Strona internetowa", openingHours: "Godziny otwarcia", monday: "Poniedziałek", tuesday: "Wtorek", wednesday: "Środa", thursday: "Czwartek", friday: "Piątek", saturday: "Sobota", sunday: "Niedziela", closed: "Zamknięte" },
    faq: { title: "FAQ", intro: "Tutaj znajdziesz krótkie odpowiedzi na najczęstsze pytania dotyczące pielęgnacji, mycia, noszenia oraz tego, jak jak najdłużej zachować piękny wygląd zestawu.", quickTitle: "Szybka wskazówka", quickText: "Obchodź się z zestawem delikatnie, przechowuj go w suchym miejscu i unikaj zbędnego tarcia, aby włókna pozostały schludne." },
    cart: { title: "Koszyk", selectAll: "Zaznacz wszystko", deleteSelected: "Usuń zaznaczone", delete: "Usuń", unfavorite: "Usuń z ulubionych", length: "Długość", products: "Produkty", total: "Razem", proceedToPayment: "Przejdź do płatności", yourCart: "Twój koszyk" },
    footer: { brandText: "Ręcznie wykonane syntetyczne fryzury, zakładanie i bezpieczne zdejmowanie w Helsinkach.", emailUs: "Napisz do nas", navigation: "Nawigacja", shopCategories: "Kategorie sklepu", contact: "Kontakt", openingHours: "Godziny otwarcia", home: "Strona główna", shop: "Sklep", contacts: "Kontakt", cart: "Koszyk", braids: "Warkocze", curls: "Loki", address: "Adres", phone: "Telefon", email: "E-mail", website: "Strona internetowa", saturday: "Sobota", sunday: "Niedziela", closed: "Zamknięte", rights: "© 2026 Letti Dreads. Wszelkie prawa zastrzeżone.", openMaps: "Otwórz w Google Maps" },
  },
};

export const translations = Object.fromEntries(
  languages.map((code) => [code, deepMerge(clone(baseEnglish), localeOverrides[code] || {})]),
);

Object.entries(contentUpdates).forEach(([code, updates]) => {
  if (translations[code]) {
    Object.assign(translations[code], deepMerge(translations[code], updates));
  }
});

Object.values(translations).forEach((locale) => {
  locale.common.languages = { ...languageLabels };
});
