import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import {
  AVATAR_COLOR_OPTIONS,
  fetchLogout,
  updateUserAvatarColor,
} from "../../redux/slices/authSlice";
import { fetchLatestOrder } from "../../redux/slices/orderSlice";
import { getCustomSetContent } from "../../pages/custom_set/content.js";
import {
  HOME_SECTION_IDS,
  getHomeSectionContent,
} from "../../pages/home/sectionContent.js";
import styles from "./Header.module.scss";

const THEME_STORAGE_KEY = "letti-theme";
const THEMES = [
  "light",
  "dark",
  "burgundy",
  "olive",
  "forest",
  "sapphire",
  "plum",
  "terracotta",
  "graphite",
];

const DATE_LOCALES = {
  fi: "fi-FI",
  en: "en-GB",
  ru: "ru-RU",
  de: "de-DE",
  fr: "fr-FR",
  it: "it-IT",
  el: "el-GR",
  es: "es-ES",
  et: "et-EE",
  lv: "lv-LV",
  lt: "lt-LT",
  pl: "pl-PL",
};

const SETTINGS_TEXT = {
  fi: {
    settings: "Asetukset",
    theme: "Teema",
    lightTheme: "Vaalea",
    darkTheme: "Tumma",
    language: "Kieli",
    security: "Turvallisuus",
    passwordHidden: "Salasanaa ei voi näyttää turvallisuussyistä.",
    avatarColor: "Avatarin väri",
    logout: "Kirjaudu ulos",
  },
  en: {
    settings: "Settings",
    theme: "Theme",
    lightTheme: "Light",
    darkTheme: "Dark",
    language: "Language",
    security: "Security",
    passwordHidden: "Password cannot be shown for security reasons.",
    avatarColor: "Avatar color",
    logout: "Log out",
  },
  ru: {
    settings: "Настройки",
    theme: "Тема",
    lightTheme: "Светлая",
    darkTheme: "Тёмная",
    language: "Язык",
    security: "Безопасность",
    passwordHidden: "Пароль нельзя показать по соображениям безопасности.",
    avatarColor: "Цвет аватарки",
    logout: "Выйти",
  },
  de: {
    settings: "Einstellungen",
    theme: "Thema",
    lightTheme: "Hell",
    darkTheme: "Dunkel",
    language: "Sprache",
    security: "Sicherheit",
    passwordHidden:
      "Das Passwort kann aus Sicherheitsgründen nicht angezeigt werden.",
    avatarColor: "Avatarfarbe",
    logout: "Abmelden",
  },
  fr: {
    settings: "Paramètres",
    theme: "Thème",
    lightTheme: "Clair",
    darkTheme: "Sombre",
    language: "Langue",
    security: "Sécurité",
    passwordHidden:
      "Le mot de passe ne peut pas être affiché pour des raisons de sécurité.",
    avatarColor: "Couleur de l'avatar",
    logout: "Déconnexion",
  },
  it: {
    settings: "Impostazioni",
    theme: "Tema",
    lightTheme: "Chiaro",
    darkTheme: "Scuro",
    language: "Lingua",
    security: "Sicurezza",
    passwordHidden:
      "La password non può essere mostrata per motivi di sicurezza.",
    avatarColor: "Colore avatar",
    logout: "Esci",
  },
  el: {
    settings: "Ρυθμίσεις",
    theme: "Θέμα",
    lightTheme: "Ανοιχτό",
    darkTheme: "Σκούρο",
    language: "Γλώσσα",
    security: "Ασφάλεια",
    passwordHidden:
      "Ο κωδικός δεν μπορεί να εμφανιστεί για λόγους ασφαλείας.",
    avatarColor: "Χρώμα avatar",
    logout: "Αποσύνδεση",
  },
  es: {
    settings: "Ajustes",
    theme: "Tema",
    lightTheme: "Claro",
    darkTheme: "Oscuro",
    language: "Idioma",
    security: "Seguridad",
    passwordHidden:
      "La contraseña no puede mostrarse por motivos de seguridad.",
    avatarColor: "Color del avatar",
    logout: "Cerrar sesión",
  },
  et: {
    settings: "Seaded",
    theme: "Teema",
    lightTheme: "Hele",
    darkTheme: "Tume",
    language: "Keel",
    security: "Turvalisus",
    passwordHidden: "Parooli ei saa turvalisuse tõttu näidata.",
    avatarColor: "Avatari värv",
    logout: "Logi välja",
  },
  lv: {
    settings: "Iestatījumi",
    theme: "Tēma",
    lightTheme: "Gaiša",
    darkTheme: "Tumša",
    language: "Valoda",
    security: "Drošība",
    passwordHidden: "Paroli nevar parādīt drošības dēļ.",
    avatarColor: "Avatara krāsa",
    logout: "Iziet",
  },
  lt: {
    settings: "Nustatymai",
    theme: "Tema",
    lightTheme: "Šviesi",
    darkTheme: "Tamsi",
    language: "Kalba",
    security: "Saugumas",
    passwordHidden:
      "Slaptažodis negali būti rodomas saugumo sumetimais.",
    avatarColor: "Avataro spalva",
    logout: "Atsijungti",
  },
  pl: {
    settings: "Ustawienia",
    theme: "Motyw",
    lightTheme: "Jasny",
    darkTheme: "Ciemny",
    language: "Język",
    security: "Bezpieczeństwo",
    passwordHidden:
      "Hasło nie może być pokazane ze względów bezpieczeństwa.",
    avatarColor: "Kolor awatara",
    logout: "Wyloguj się",
  },
};

const THEME_LABELS = {
  fi: { light: "Vaalea", dark: "Tumma", burgundy: "Viininpunainen", olive: "Oliivi" },
  en: {
    light: "Light",
    dark: "Dark",
    burgundy: "Burgundy",
    olive: "Olive",
    forest: "Forest",
    sapphire: "Sapphire",
    plum: "Plum",
    terracotta: "Terracotta",
    graphite: "Graphite",
  },
  ru: {
    light: "Светлая",
    dark: "Тёмная",
    burgundy: "Бордовая",
    olive: "Оливковая",
    forest: "Лесная",
    sapphire: "Сапфировая",
    plum: "Сливовая",
    terracotta: "Терракотовая",
    graphite: "Графитовая",
  },
  de: { light: "Hell", dark: "Dunkel", burgundy: "Bordeaux", olive: "Oliv" },
  fr: { light: "Clair", dark: "Sombre", burgundy: "Bordeaux", olive: "Olive" },
  it: { light: "Chiaro", dark: "Scuro", burgundy: "Bordeaux", olive: "Oliva" },
  el: {
    light: "Ανοιχτό",
    dark: "Σκούρο",
    burgundy: "Μπορντό",
    olive: "Λαδί",
  },
  es: { light: "Claro", dark: "Oscuro", burgundy: "Burdeos", olive: "Oliva" },
  et: { light: "Hele", dark: "Tume", burgundy: "Bordoo", olive: "Oliiv" },
  lv: { light: "Gaiša", dark: "Tumša", burgundy: "Bordo", olive: "Olīvu" },
  lt: { light: "Šviesi", dark: "Tamsi", burgundy: "Bordo", olive: "Alyvuogių" },
  pl: { light: "Jasny", dark: "Ciemny", burgundy: "Bordowy", olive: "Oliwkowy" },
};

const ORDER_STATUS_TEXT = {
  fi: {
    link: "Tilauksen vaihe",
    title: "Tilauksen vaihe",
    date: "Tilattu",
    status: "Vaihe",
    processing: "Tilauksesi käsitellään",
    assembling: "Tilauksesi kootaan",
    in_transit: "Tilauksesi on matkalla",
    ready_for_pickup: "Tilauksesi odottaa noutoa",
    empty: "Ei vielä tehtyjä tilauksia.",
  },
  en: {
    link: "Order status",
    title: "Order status",
    date: "Ordered",
    status: "Status",
    processing: "Your order is being processed",
    assembling: "Your order is being assembled",
    in_transit: "Your order is on the way",
    ready_for_pickup: "Your order is ready for pickup",
    empty: "No orders yet.",
  },
  ru: {
    link: "Стадия заказа",
    title: "Стадия заказа",
    date: "Дата заказа",
    status: "Стадия",
    processing: "Ваш заказ оформляется",
    assembling: "Ваш заказ собирается",
    in_transit: "Ваш заказ в пути",
    ready_for_pickup: "Ваш заказ ждёт вас на почте",
    empty: "Пока нет оформленных заказов.",
  },
  de: {
    link: "Bestellstatus",
    title: "Bestellstatus",
    date: "Bestellt",
    status: "Status",
    processing: "Ihre Bestellung wird bearbeitet",
    assembling: "Ihre Bestellung wird zusammengestellt",
    in_transit: "Ihre Bestellung ist unterwegs",
    ready_for_pickup: "Ihre Bestellung ist zur Abholung bereit",
    empty: "Noch keine Bestellungen.",
  },
  fr: {
    link: "Statut de commande",
    title: "Statut de commande",
    date: "Commande passée",
    status: "Statut",
    processing: "Votre commande est en cours de traitement",
    assembling: "Votre commande est en cours de préparation",
    in_transit: "Votre commande est en route",
    ready_for_pickup: "Votre commande est prête au retrait",
    empty: "Pas encore de commandes.",
  },
  it: {
    link: "Stato dell'ordine",
    title: "Stato dell'ordine",
    date: "Ordinato",
    status: "Stato",
    processing: "Il tuo ordine è in elaborazione",
    assembling: "Il tuo ordine è in preparazione",
    in_transit: "Il tuo ordine è in viaggio",
    ready_for_pickup: "Il tuo ordine è pronto per il ritiro",
    empty: "Nessun ordine ancora.",
  },
  el: {
    link: "Κατάσταση παραγγελίας",
    title: "Κατάσταση παραγγελίας",
    date: "Παραγγέλθηκε",
    status: "Κατάσταση",
    processing: "Η παραγγελία σας επεξεργάζεται",
    assembling: "Η παραγγελία σας ετοιμάζεται",
    in_transit: "Η παραγγελία σας είναι καθ' οδόν",
    ready_for_pickup: "Η παραγγελία σας είναι έτοιμη για παραλαβή",
    empty: "Δεν υπάρχουν παραγγελίες ακόμα.",
  },
  es: {
    link: "Estado del pedido",
    title: "Estado del pedido",
    date: "Pedido realizado",
    status: "Estado",
    processing: "Tu pedido se está procesando",
    assembling: "Tu pedido se está preparando",
    in_transit: "Tu pedido está en camino",
    ready_for_pickup: "Tu pedido está listo para recoger",
    empty: "Aún no hay pedidos.",
  },
  et: {
    link: "Tellimuse staatus",
    title: "Tellimuse staatus",
    date: "Tellitud",
    status: "Staatus",
    processing: "Teie tellimust töödeldakse",
    assembling: "Teie tellimust komplekteeritakse",
    in_transit: "Teie tellimus on teel",
    ready_for_pickup: "Teie tellimus on valmis järele tulekuks",
    empty: "Tellimusi veel pole.",
  },
  lv: {
    link: "Pasūtījuma statuss",
    title: "Pasūtījuma statuss",
    date: "Pasūtīts",
    status: "Statuss",
    processing: "Jūsu pasūtījums tiek apstrādāts",
    assembling: "Jūsu pasūtījums tiek komplektēts",
    in_transit: "Jūsu pasūtījums ir ceļā",
    ready_for_pickup: "Jūsu pasūtījums ir gatavs saņemšanai",
    empty: "Vēl nav pasūtījumu.",
  },
  lt: {
    link: "Užsakymo būsena",
    title: "Užsakymo būsena",
    date: "Užsakyta",
    status: "Būsena",
    processing: "Jūsų užsakymas apdorojamas",
    assembling: "Jūsų užsakymas komplektuojamas",
    in_transit: "Jūsų užsakymas pakeliui",
    ready_for_pickup: "Jūsų užsakymas paruoštas atsiėmimui",
    empty: "Dar nėra užsakymų.",
  },
  pl: {
    link: "Status zamówienia",
    title: "Status zamówienia",
    date: "Zamówiono",
    status: "Status",
    processing: "Twoje zamówienie jest przetwarzane",
    assembling: "Twoje zamówienie jest kompletowane",
    in_transit: "Twoje zamówienie jest w drodze",
    ready_for_pickup: "Twoje zamówienie jest gotowe do odbioru",
    empty: "Brak zamówień.",
  },
};

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }

  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  return THEMES.includes(saved) ? saved : "light";
};

const getAvatarTextColor = (hex) => {
  if (!hex || !hex.startsWith("#")) {
    return "#0c0d0f";
  }

  const normalized = hex.slice(1);
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 160 ? "#0c0d0f" : "#ffffff";
};

const isDesktopViewport = () =>
  typeof window !== "undefined" && window.innerWidth > 1024;

const getSectionLink = (sectionId) => `/#${sectionId}`;

export function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [expandedMenuId, setExpandedMenuId] = useState(null);
  const [activeDesktopSubmenu, setActiveDesktopSubmenu] = useState(null);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isOrderStatusOpen, setIsOrderStatusOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);

  const drawerRef = useRef(null);
  const drawerToggleRef = useRef(null);
  const languageMenu = useRef(null);
  const accountMenu = useRef(null);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, languages, t } = useLanguage();

  const user = useSelector((state) => state.auth.user);
  const latestOrder = useSelector((state) => state.orders.latestOrder);

  const settingsText = SETTINGS_TEXT[language] || SETTINGS_TEXT.en;
  const themeLabels = THEME_LABELS[language] || THEME_LABELS.en;
  const orderLabels = ORDER_STATUS_TEXT[language] || ORDER_STATUS_TEXT.en;
  const customSetContent = getCustomSetContent(language);
  const homeSectionContent = getHomeSectionContent(language);
  const resolvedInstantLabel = t("header.instock");
  const resolvedCurlsOnMiniDreadLabel = t("header.curlsOnMiniDread");

  const latestOrderDate = latestOrder
    ? new Intl.DateTimeFormat(DATE_LOCALES[language] || DATE_LOCALES.en, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(latestOrder.created_at))
    : "";

  const avatarFallback = useMemo(() => {
    const source = user?.username || user?.email || "";
    return source.slice(0, 1).toUpperCase() || "?";
  }, [user]);

  const avatarBackgroundStyle = user?.avatar
    ? undefined
    : {
        backgroundColor: user?.avatarColor || "#ffffff",
        color: getAvatarTextColor(user?.avatarColor || "#ffffff"),
      };

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setExpandedMenuId(null);
    setActiveDesktopSubmenu(null);
  }, []);

  const matchesRoute = useCallback(
    (to) => {
      if (!to) {
        return false;
      }

      const [pathname, hash = ""] = to.split("#");
      if (hash) {
        return (
          location.pathname === pathname && location.hash === `#${hash}`
        );
      }

      if (pathname === "/") {
        return location.pathname === "/" && !location.hash;
      }

      return (
        location.pathname === pathname ||
        location.pathname.startsWith(`${pathname}/`)
      );
    },
    [location.hash, location.pathname],
  );

  const navigationItems = useMemo(() => {
    const items = [
      {
        id: "home",
        label: t("header.home"),
        to: "/",
      },
      {
        id: "shop",
        label: t("header.shop"),
        to: "/shop",
        children: {
          groups: [
            {
              title: t("header.dreads"),
              items: [
                {
                  id: "smooth-dreads",
                  label: t("header.smoothDreads"),
                  to: "/shop/smooth-dreads",
                },
                {
                  id: "textured-dreads",
                  label: t("header.texturedDreads"),
                  to: "/shop/textured-dreads",
                },
              ],
            },
            {
              title: t("header.shop"),
              items: [
                {
                  id: "curls",
                  label: t("header.curls"),
                  to: "/shop/curls",
                },
                {
                  id: "braids",
                  label: t("header.braids"),
                  to: "/shop/braids",
                },
                {
                  id: "hair-on-braid",
                  label: t("header.hairOnBraid"),
                  to: "/shop/hair-on-braid",
                },
                {
                  id: "curls-on-mini-dread",
                  label: resolvedCurlsOnMiniDreadLabel,
                  to: "/shop/curls-on-mini-dread",
                },
                {
                  id: "other",
                  label: t("header.other"),
                  to: "/shop/other",
                },
              ],
            },
            {
              title: customSetContent.homeBadge,
              items: [
                {
                  id: "instock",
                  label: resolvedInstantLabel,
                  to: "/instock",
                },
                {
                  id: "custom-set",
                  label: customSetContent.navLabel,
                  to: "/custom-set",
                },
              ],
            },
          ],
          spotlight: {
            to: "/custom-set",
            image: customSetContent.cards?.[0]?.image || "/homNav/Rastat.jpg",
            eyebrow: customSetContent.homeBadge,
            title: customSetContent.homeTitle,
            description: customSetContent.homeText,
            actionLabel: customSetContent.navLabel,
          },
        },
      },
      {
        id: "instock-main",
        label: resolvedInstantLabel,
        to: "/instock",
      },
      {
        id: "services",
        label: homeSectionContent.servicesNavLabel,
        children: {
          groups: [
            {
              title: homeSectionContent.servicesNavLabel,
              items: [
                {
                  id: "about",
                  label: homeSectionContent.aboutNavLabel,
                  to: getSectionLink(HOME_SECTION_IDS.about),
                },
                {
                  id: "gallery",
                  label: t("home.galleryTitle"),
                  to: getSectionLink(HOME_SECTION_IDS.gallery),
                },
                {
                  id: "reviews",
                  label: t("home.reviewsTitle"),
                  to: getSectionLink(HOME_SECTION_IDS.reviews),
                },
              ],
            },
          ],
          spotlight: {
            to: getSectionLink(HOME_SECTION_IDS.about),
            image: "/homNav/HiuksetLetillä.jpg",
            eyebrow: homeSectionContent.servicesNavLabel,
            title: homeSectionContent.aboutNavLabel,
            description: t("home.aboutText"),
            actionLabel: homeSectionContent.aboutNavLabel,
          },
        },
      },
      {
        id: "faq",
        label: homeSectionContent.expertiseNavLabel,
        to: "/faq",
      },
      {
        id: "contacts",
        label: t("header.contacts"),
        to: "/contacts",
      },
    ];

    if (user) {
      items.push({
        id: "cart",
        label: t("header.cart"),
        to: "/cart",
      });
    } else {
      items.push({
        id: "login",
        label: t("header.login"),
        to: "/login",
      });
    }

    return items;
  }, [
    customSetContent,
    homeSectionContent.aboutNavLabel,
    homeSectionContent.expertiseNavLabel,
    homeSectionContent.servicesNavLabel,
    resolvedCurlsOnMiniDreadLabel,
    resolvedInstantLabel,
    t,
    user,
  ]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (user) {
      dispatch(fetchLatestOrder());
    }
  }, [dispatch, user]);

  useEffect(() => {
    closeDrawer();
  }, [closeDrawer, location.hash, location.pathname, location.search]);

  useEffect(() => {
    const handleDocumentPointerDown = (event) => {
      const target = event.target;

      if (
        isDrawerOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(target) &&
        drawerToggleRef.current &&
        !drawerToggleRef.current.contains(target)
      ) {
        closeDrawer();
      }

      if (languageMenu.current && !languageMenu.current.contains(target)) {
        setIsLanguageOpen(false);
      }

      if (accountMenu.current && !accountMenu.current.contains(target)) {
        setIsAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentPointerDown);
    return () => {
      document.removeEventListener("mousedown", handleDocumentPointerDown);
    };
  }, [closeDrawer, isDrawerOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") {
        return;
      }

      setIsLanguageOpen(false);
      setIsAccountOpen(false);
      setIsSettingsOpen(false);
      setIsOrderStatusOpen(false);
      closeDrawer();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeDrawer]);

  useEffect(() => {
    if (!isDrawerOpen || isDesktopViewport()) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isDrawerOpen]);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => {
      const nextOpen = !prev;

      if (!nextOpen) {
        setExpandedMenuId(null);
        setActiveDesktopSubmenu(null);
        return false;
      }

      setExpandedMenuId(null);
      setActiveDesktopSubmenu(null);
      return true;
    });
  };

  const toggleMenuSection = (id) => {
    if (isDesktopViewport()) {
      setActiveDesktopSubmenu((prev) => (prev === id ? null : id));
      return;
    }

    setExpandedMenuId((prev) => (prev === id ? null : id));
  };

  const openDesktopSubmenu = (id) => {
    if (!isDesktopViewport()) {
      return;
    }

    setActiveDesktopSubmenu(id);
  };

  const closeDesktopSubmenu = (id) => {
    if (!isDesktopViewport()) {
      return;
    }

    setActiveDesktopSubmenu((prev) => (prev === id ? null : prev));
  };

  const selectLanguage = (code) => {
    setLanguage(code);
    setIsLanguageOpen(false);
  };

  const handleAccountClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setIsAccountOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    await dispatch(fetchLogout());
    setIsSettingsOpen(false);
    setIsOrderStatusOpen(false);
    setIsAccountOpen(false);
    closeDrawer();
    navigate("/");
  };

  const renderPrimaryAction = (item, isActive) => {
    const className = `${styles.menuPrimaryAction} ${
      isActive ? styles.menuPrimaryActionActive : ""
    }`;

    if (item.to) {
      return (
        <Link to={item.to} className={className} onClick={closeDrawer}>
          <span className={styles.menuActionLabel}>{item.label}</span>
        </Link>
      );
    }

    return (
      <button
        type="button"
        className={className}
        onClick={() => toggleMenuSection(item.id)}
      >
        <span className={styles.menuActionLabel}>{item.label}</span>
      </button>
    );
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.nav}>
          <button
            type="button"
            ref={drawerToggleRef}
            className={`${styles.menuToggle} ${
              isDrawerOpen ? styles.menuToggleOpen : ""
            }`}
            onClick={toggleDrawer}
            aria-label={t("header.menu")}
            aria-expanded={isDrawerOpen}
          >
            <span className={styles.menuToggleBar} />
            <span className={styles.menuToggleBar} />
            <span className={styles.menuToggleBar} />
          </button>
        </div>

        <div className={styles.logo} onClick={() => navigate("/")}>
          <h1>{t("header.brandFirst")}</h1>
          <img src="/image_no_bg__1_-removebg-preview.png" alt="Letti Dreads" />
          <h1>{t("header.brandSecond")}</h1>
        </div>

        <div
          className={`${styles.mobLogo} ${styles.logo}`}
          onClick={() => navigate("/")}
        >
          <img src="/image_no_bg__1_-removebg-preview.png" alt="Letti Dreads" />
          <div className={styles.mobText}>
            <h1>{t("header.brandFirst")}</h1>
            <h1>{t("header.brandSecond")}</h1>
          </div>
        </div>

        <div className={styles.menu}>
          <button
            type="button"
            onClick={() => navigate("/cart")}
            aria-label={t("header.cart")}
          >
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <g data-name="1" id="_1">
                <path
                  d="M397.78,316H192.65A15,15,0,0,1,178,304.33L143.46,153.85a15,15,0,0,1,14.62-18.36H432.35A15,15,0,0,1,447,153.85L412.4,304.33A15,15,0,0,1,397.78,316ZM204.59,286H385.84l27.67-120.48H176.91Z"
                  fill="#ffffff"
                />
                <path
                  d="M222,450a57.48,57.48,0,1,1,57.48-57.48A57.54,57.54,0,0,1,222,450Zm0-84.95a27.48,27.48,0,1,0,27.48,27.47A27.5,27.5,0,0,0,222,365.05Z"
                  fill="#ffffff"
                />
                <path
                  d="M368.42,450a57.48,57.48,0,1,1,57.48-57.48A57.54,57.54,0,0,1,368.42,450Zm0-84.95a27.48,27.48,0,1,0,27.48,27.47A27.5,27.5,0,0,0,368.42,365.05Z"
                  fill="#ffffff"
                />
                <path
                  d="M158.08,165.49a15,15,0,0,1-14.23-10.26L118.14,78H70.7a15,15,0,1,1,0-30H129a15,15,0,0,1,14.23,10.26l29.13,87.49a15,15,0,0,1-14.23,19.74Z"
                  fill="#ffffff"
                />
              </g>
            </svg>
          </button>

          <div className={styles.langMenu} ref={languageMenu}>
            <button
              type="button"
              className={styles.langTrigger}
              onClick={() => setIsLanguageOpen((prev) => !prev)}
            >
              {t(`common.languages.${language}`)}
            </button>

            {isLanguageOpen ? (
              <div className={styles.langDropdown}>
                {languages.map((code) => (
                  <button
                    key={code}
                    type="button"
                    className={language === code ? styles.langActive : ""}
                    onClick={() => selectLanguage(code)}
                  >
                    {t(`common.languages.${code}`)}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className={styles.accountMenu} ref={accountMenu}>
            <button
              type="button"
              onClick={handleAccountClick}
              aria-label={user ? t("header.account") : t("header.login")}
              className={styles.accountButton}
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className={styles.avatarImage}
                />
              ) : user ? (
                <span
                  className={styles.avatarFallback}
                  style={avatarBackgroundStyle}
                >
                  {avatarFallback}
                </span>
              ) : (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" fill="#ffffff" r="4" />
                  <path
                    d="M20,19v1a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V19a6,6,0,0,1,6-6h4A6,6,0,0,1,20,19Z"
                    fill="#ffffff"
                  />
                </svg>
              )}
            </button>

            {user && isAccountOpen ? (
              <div className={styles.accountDropdown}>
                <div className={styles.accountSummary}>
                  <div className={styles.accountAvatarLarge}>
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className={styles.avatarImage}
                      />
                    ) : (
                      <span
                        className={styles.avatarFallback}
                        style={avatarBackgroundStyle}
                      >
                        {avatarFallback}
                      </span>
                    )}
                  </div>

                  <div className={styles.accountMeta}>
                    <strong>{user.username}</strong>
                    <span>{user.email}</span>
                  </div>
                </div>

                <div className={styles.accountLinks}>
                  <button
                    type="button"
                    className={styles.accountLink}
                    onClick={() => {
                      setIsAccountOpen(false);
                      navigate("/cart");
                    }}
                  >
                    {t("header.cart")}
                  </button>

                  <button
                    type="button"
                    className={styles.accountLink}
                    onClick={() => {
                      setIsAccountOpen(false);
                      setIsOrderStatusOpen(true);
                    }}
                  >
                    {orderLabels.link}
                  </button>

                  <button
                    type="button"
                    className={styles.accountLink}
                    onClick={() => {
                      setIsAccountOpen(false);
                      setIsSettingsOpen(true);
                    }}
                  >
                    {settingsText.settings}
                  </button>
                </div>

                <button
                  type="button"
                  className={styles.logoutButton}
                  onClick={handleLogout}
                >
                  <span className={styles.logoutIcon} aria-hidden="true">
                    ↪
                  </span>
                  <span>{settingsText.logout}</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {isDrawerOpen ? (
        <button
          type="button"
          className={styles.menuBackdrop}
          onClick={closeDrawer}
          aria-label={t("header.menu")}
        />
      ) : null}

      <aside
        ref={drawerRef}
        className={`${styles.dropMenu} ${isDrawerOpen ? styles.visible : ""}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.dropMenuInner}>
          <ul className={styles.menuList}>
            {navigationItems.map((item) => {
              const childLinks = item.children
                ? [
                    ...item.children.groups.flatMap((group) => group.items),
                    item.children.spotlight,
                  ]
                : [];
              const isActive =
                matchesRoute(item.to) ||
                childLinks.some((child) => matchesRoute(child?.to));
              const isExpanded =
                item.id === expandedMenuId || item.id === activeDesktopSubmenu;

              return (
                <li
                  key={item.id}
                  className={`${styles.menuItem} ${
                    item.children ? styles.menuItemWithSubmenu : ""
                  } ${isExpanded ? styles.menuItemExpanded : ""}`}
                  onMouseEnter={() => item.children && openDesktopSubmenu(item.id)}
                  onMouseLeave={() => item.children && closeDesktopSubmenu(item.id)}
                >
                  <div className={styles.menuItemRow}>
                    {renderPrimaryAction(item, isActive)}

                    {item.children ? (
                      <button
                        type="button"
                        className={styles.menuSecondaryAction}
                        onClick={() => toggleMenuSection(item.id)}
                        aria-label={item.label}
                        aria-expanded={isExpanded}
                      >
                        <span className={styles.menuCaret} aria-hidden="true" />
                      </button>
                    ) : null}
                  </div>

                  {item.children ? (
                    <div
                      className={`${styles.submenuPanel} ${
                        isExpanded ? styles.submenuVisible : ""
                      }`}
                    >
                      <div className={styles.submenuShell}>
                        <div className={styles.submenuGrid}>
                          {item.children.groups.map((group) => (
                            <div key={group.title} className={styles.submenuGroup}>
                              <span className={styles.submenuGroupTitle}>
                                {group.title}
                              </span>

                              {group.items.map((link) => (
                                <Link
                                  key={link.id}
                                  to={link.to}
                                  className={`${styles.submenuLink} ${
                                    matchesRoute(link.to)
                                      ? styles.menuPrimaryActionActive
                                      : ""
                                  }`}
                                  onClick={closeDrawer}
                                >
                                  <span className={styles.menuActionLabel}>
                                    {link.label}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>

                        <Link
                          to={item.children.spotlight.to}
                          className={styles.submenuSpotlight}
                          onClick={closeDrawer}
                        >
                          <div className={styles.submenuSpotlightMedia}>
                            <img
                              src={item.children.spotlight.image}
                              alt={item.children.spotlight.title}
                            />
                          </div>

                          <div className={styles.submenuSpotlightCopy}>
                            <span>{item.children.spotlight.eyebrow}</span>
                            <strong>{item.children.spotlight.title}</strong>
                            <p>{item.children.spotlight.description}</p>
                            <em>{item.children.spotlight.actionLabel}</em>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>

          <div className={styles.drawerLanguageSection}>
            <div className={styles.drawerLanguageLabel}>
              {settingsText.language}
            </div>

            <div className={styles.drawerLanguageGrid}>
              {languages.map((code) => (
                <button
                  key={code}
                  type="button"
                  className={language === code ? styles.langActive : ""}
                  onClick={() => selectLanguage(code)}
                >
                  {t(`common.languages.${code}`)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {user && isSettingsOpen ? (
        <div
          className={styles.settingsOverlay}
          onClick={() => setIsSettingsOpen(false)}
        >
          <div
            className={styles.settingsModal}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.settingsClose}
              onClick={() => setIsSettingsOpen(false)}
            >
              ×
            </button>

            <div className={styles.settingsHero}>
              <div className={styles.settingsAvatar}>
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className={styles.avatarImage}
                  />
                ) : (
                  <span
                    className={styles.avatarFallback}
                    style={avatarBackgroundStyle}
                  >
                    {avatarFallback}
                  </span>
                )}
              </div>

              <div className={styles.settingsMeta}>
                <h2>{user.username}</h2>
                <p>{user.email}</p>
                <span>{user.email}</span>
              </div>
            </div>

            <div className={styles.settingsGrid}>
              <section className={styles.settingsCard}>
                <h3>{settingsText.theme}</h3>
                <div className={styles.choiceRow}>
                  {THEMES.map((themeOption) => (
                    <button
                      key={themeOption}
                      type="button"
                      className={
                        theme === themeOption
                          ? styles.choiceActive
                          : styles.choiceButton
                      }
                      onClick={() => setTheme(themeOption)}
                    >
                      {themeLabels[themeOption] ||
                        THEME_LABELS.en[themeOption] ||
                        themeOption}
                    </button>
                  ))}
                </div>
              </section>

              <section className={styles.settingsCard}>
                <h3>{settingsText.language}</h3>
                <div className={styles.choiceRow}>
                  {languages.map((code) => (
                    <button
                      key={code}
                      type="button"
                      className={
                        language === code
                          ? styles.choiceActive
                          : styles.choiceButton
                      }
                      onClick={() => setLanguage(code)}
                    >
                      {t(`common.languages.${code}`)}
                    </button>
                  ))}
                </div>
              </section>

              <section className={styles.settingsCard}>
                <h3>{settingsText.security}</h3>
                <p className={styles.securityNote}>
                  {settingsText.passwordHidden}
                </p>
              </section>

              <section className={styles.settingsCard}>
                <h3>{settingsText.avatarColor}</h3>
                <div className={styles.colorGrid}>
                  {AVATAR_COLOR_OPTIONS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`${styles.colorSwatch} ${
                        user.avatarColor === color
                          ? styles.colorSwatchActive
                          : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => dispatch(updateUserAvatarColor(color))}
                      aria-label={color}
                    />
                  ))}
                </div>
              </section>
            </div>

            <button
              type="button"
              className={styles.settingsLogout}
              onClick={handleLogout}
            >
              {settingsText.logout}
            </button>
          </div>
        </div>
      ) : null}

      {user && isOrderStatusOpen ? (
        <div
          className={styles.settingsOverlay}
          onClick={() => setIsOrderStatusOpen(false)}
        >
          <div
            className={styles.orderStatusModal}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.settingsClose}
              onClick={() => setIsOrderStatusOpen(false)}
            >
              ×
            </button>
            <h2>{orderLabels.title}</h2>
            {latestOrder ? (
              <div className={styles.orderStatusInfo}>
                <div className={styles.orderStatusItem}>
                  <span>{orderLabels.date}</span>
                  <strong>{latestOrderDate}</strong>
                </div>
                <div className={styles.orderStatusItem}>
                  <span>{orderLabels.status}</span>
                  <strong>
                    {orderLabels[latestOrder.status] || latestOrder.status_label}
                  </strong>
                </div>
              </div>
            ) : (
              <p className={styles.orderStatusEmpty}>{orderLabels.empty}</p>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
