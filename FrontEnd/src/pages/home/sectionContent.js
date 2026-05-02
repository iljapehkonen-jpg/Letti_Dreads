export const HOME_SECTION_IDS = {
  about: "about-we",
  gallery: "gallery",
  reviews: "reviews",
  customSet: "custom-set",
  weaving: "weaving",
  expertise: "expertise",
};

export const HOME_SOCIAL_LINKS = [
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

const copy = {
  en: {
    servicesNavLabel: "Services",
    aboutNavLabel: "Who are we?",
    weavingNavLabel: "Interweaving",
    expertiseNavLabel: "Expertise",
    weavingTitle: "Interweaving",
    weavingText:
      "Interweaving is available directly at the studio. If you want a neat, comfortable and durable result, we can help you choose the right timing and structure.",
    weavingPriceLabel: "Interweaving price",
    weavingPriceValue: "50 euro per hour",
    weavingContactsCta: "Open contact page",
  },
  ru: {
    servicesNavLabel: "Услуги",
    aboutNavLabel: "Кто мы",
    weavingNavLabel: "Переплетение",
    expertiseNavLabel: "Экспертность",
    weavingTitle: "Переплетение",
    weavingText:
      "Услуга переплетения доступна прямо в студии. Если вы хотите аккуратный, комфортный и долговечный результат, мы поможем подобрать удобное время и формат работы.",
    weavingPriceLabel: "Стоимость переплетения",
    weavingPriceValue: "50 евро в час",
    weavingContactsCta: "Открыть страницу контактов",
  },
};

export const getHomeSectionContent = (language) => copy[language] || copy.en;
