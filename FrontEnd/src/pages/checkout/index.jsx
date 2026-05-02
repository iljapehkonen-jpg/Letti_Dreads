import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Checkout.module.scss";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import { createOrder } from "../../redux/slices/orderSlice";
import { fetchCart } from "../../redux/slices/cartSlice";

const copy = {
  fi: {
    title: "Tilaustiedot",
    subtitle: "Täytä pakolliset tiedot ennen tilauksen vahvistamista.",
    contactDetails: "Yhteystiedot",
    deliveryDetails: "Toimitus ja nouto",
    companyDetails: "Yritys (valinnainen)",
    noteSection: "Lisätiedot (valinnainen)",
    email: "Sähköposti",
    firstName: "Etunimi",
    lastName: "Sukunimi",
    address: "Postiosoite",
    postalCode: "Postinumero",
    city: "Kaupunki",
    country: "Maa",
    phone: "Puhelin",
    pickupLocation: "Postin toimipaikka",
    companyType: "Yritys",
    companyName: "Yrityksen nimi",
    businessId: "Y-tunnus",
    deliveryMethod: "Valitse toimitustapa",
    pickupPoint: "Valitse noutopaikka",
    note: "Viesti tai lisätoiveet",
    notePlaceholder: "Voit kirjoittaa tähän tarkennuksia, toiveita tai muuta tärkeää tilausta varten.",
    summary: "Yhteenveto",
    orderItems: "Tilauksen tuotteet",
    items: "Tuotteet",
    total: "Yhteensä",
    subtotal: "Tuotteet yhteensä",
    shipping: "Toimitus",
    finalTotal: "Loppusumma",
    length: "Pituus",
    quantity: "Määrä",
    sets: "Setit",
    submit: "Tilaa",
    emptyCart: "Korissa ei ole tuotteita.",
    loginRequired: "Kirjaudu sisään ennen tilaamista.",
    required: "Pakollinen",
    requiredSummary: "Täytä kaikki pakolliset kentät ja hyväksy toimitusehdot.",
    cityHint: "Postinumero täyttyy automaattisesti tunnetuissa suomalaisissa kaupungeissa.",
    termsTitle: "Toimitusehdot",
    acceptTerms: "Hyväksyn toimitusehdot",
    readTerms: "Lue toimitusehdot",
    closeTerms: "Sulje",
    optionalLabel: "valinnainen",
    companyPlaceholder: "Valitse yritystyyppi",
    pickupPlaceholder: "Valitse noutopaikka",
    termsIntro:
      "Tilaus käsitellään vasta, kun kaikki tiedot on tarkistettu ja maksu on vastaanotettu.",
    termsList: [
      "Toimitusaika on yleensä 2-7 arkipäivää valitusta toimitustavasta riippuen.",
      "Asiakas vastaa siitä, että toimitusosoite ja yhteystiedot ovat oikein.",
      "Noutopisteeseen saapuneita lähetyksiä säilytetään kuljetusyhtiön ehtojen mukaisesti.",
      "Jos paketti palautuu meille virheellisten tietojen vuoksi, uudelleenlähetys veloitetaan erikseen.",
    ],
    shippingOptions: [
      {
        id: "posti-economy",
        brand: "POSTI",
        title: "Pikkupaketti, ei kiireellinen toimitus",
        price: 5.95,
      },
      {
        id: "posti-standard",
        brand: "POSTI",
        title: "Tavallinen paketti",
        price: 8.95,
      },
      {
        id: "dhl-door",
        brand: "DHL",
        title: "Ovelta ovelle",
        price: 10,
      },
      {
        id: "express",
        brand: "EXPRESS",
        title: "Express-paketti",
        price: 11.95,
      },
    ],
    companyTypes: ["Yksityishenkilö", "Toiminimi", "Osakeyhtiö"],
    pickupPoints: ["Kamppi", "Itäkeskus", "Tikkurila"],
    success: "Tilauksen tiedot tallennettiin onnistuneesti.",
  },
  en: {
    title: "Order details",
    subtitle: "Fill in the required details before confirming your order.",
    contactDetails: "Contact details",
    deliveryDetails: "Delivery and pickup",
    companyDetails: "Company (optional)",
    noteSection: "Additional note (optional)",
    email: "Email",
    firstName: "First name",
    lastName: "Last name",
    address: "Postal address",
    postalCode: "Postal code",
    city: "City",
    country: "Country",
    phone: "Phone",
    pickupLocation: "Posti service point",
    companyType: "Company",
    companyName: "Company name",
    businessId: "Business ID",
    deliveryMethod: "Choose delivery method",
    pickupPoint: "Select pickup point",
    note: "Message or order note",
    notePlaceholder: "Add any extra details, requests or clarifications for your order here.",
    summary: "Summary",
    orderItems: "Order items",
    items: "Items",
    total: "Total",
    subtotal: "Products total",
    shipping: "Shipping",
    finalTotal: "Final total",
    length: "Length",
    quantity: "Quantity",
    sets: "Sets",
    submit: "Place order",
    emptyCart: "There are no items in the cart.",
    loginRequired: "Please log in before placing an order.",
    required: "Required",
    requiredSummary: "Please fill in all required fields and accept the delivery terms.",
    cityHint: "Postal code is auto-filled for known Finnish cities.",
    termsTitle: "Delivery terms",
    acceptTerms: "I accept the delivery terms",
    readTerms: "Read delivery terms",
    closeTerms: "Close",
    optionalLabel: "optional",
    companyPlaceholder: "Select company type",
    pickupPlaceholder: "Choose a pickup point",
    termsIntro: "The order is processed after the details have been checked and the payment has been received.",
    termsList: [
      "Delivery usually takes 2-7 business days depending on the selected shipping method.",
      "The customer is responsible for providing a correct delivery address and contact details.",
      "Shipments delivered to a pickup point are stored according to the carrier's terms.",
      "If a parcel is returned because of incorrect information, reshipping is charged separately.",
    ],
    shippingOptions: [
      {
        id: "posti-economy",
        brand: "POSTI",
        title: "Small parcel, non-urgent delivery",
        price: 5.95,
      },
      {
        id: "posti-standard",
        brand: "POSTI",
        title: "Standard parcel",
        price: 8.95,
      },
      {
        id: "dhl-door",
        brand: "DHL",
        title: "Door-to-door delivery",
        price: 10,
      },
      {
        id: "express",
        brand: "EXPRESS",
        title: "Express parcel",
        price: 11.95,
      },
    ],
    companyTypes: ["Private customer", "Sole trader", "Limited company"],
    pickupPoints: ["Kamppi", "Itäkeskus", "Tikkurila"],
    success: "Order details were saved successfully.",
  },
  ru: {
    title: "Данные для заказа",
    subtitle: "Заполните обязательные поля перед подтверждением заказа.",
    contactDetails: "Контактные данные",
    deliveryDetails: "Доставка и получение",
    companyDetails: "Компания (выборочно)",
    noteSection: "Комментарий к заказу (выборочно)",
    email: "Электронная почта",
    firstName: "Имя",
    lastName: "Фамилия",
    address: "Почтовый адрес",
    postalCode: "Почтовый индекс",
    city: "Город",
    country: "Страна",
    phone: "Телефон",
    pickupLocation: "Postin toimipaikka",
    companyType: "Фирма",
    companyName: "Название фирмы",
    businessId: "Y-tunnus",
    deliveryMethod: "Выберите способ доставки",
    pickupPoint: "Valitse noutopaikka",
    note: "Сообщение или уточнение к заказу",
    notePlaceholder: "Здесь можно оставить пожелания, требования или любые дополнительные уточнения к заказу.",
    summary: "Сводка",
    orderItems: "Товары в заказе",
    items: "Товары",
    total: "Итого",
    subtotal: "Сумма товаров",
    shipping: "Доставка",
    finalTotal: "Общая сумма",
    length: "Длина",
    quantity: "Количество",
    sets: "Комплекты",
    submit: "Заказать",
    emptyCart: "В корзине нет товаров.",
    loginRequired: "Войдите в аккаунт перед оформлением заказа.",
    required: "Обязательное",
    requiredSummary: "Заполните все обязательные поля и примите условия доставки.",
    cityHint: "Для известных финских городов индекс подставляется автоматически.",
    termsTitle: "Toimitusehdot",
    acceptTerms: "Hyväksyn toimitusehdot",
    readTerms: "Читать toimitusehdot",
    closeTerms: "Закрыть",
    optionalLabel: "выборочно",
    companyPlaceholder: "Выберите тип компании",
    pickupPlaceholder: "Выберите пункт получения",
    termsIntro: "Заказ обрабатывается только после проверки данных и получения оплаты.",
    termsList: [
      "Срок доставки обычно составляет 2-7 рабочих дней в зависимости от выбранного способа.",
      "Покупатель несёт ответственность за корректность адреса и контактных данных.",
      "Посылки в пункте выдачи хранятся по правилам выбранной службы доставки.",
      "Если заказ вернётся из-за неверных данных, повторная отправка оплачивается отдельно.",
    ],
    shippingOptions: [
      {
        id: "posti-economy",
        brand: "POSTI",
        title: "Маленький пакет, не срочная доставка",
        price: 5.95,
      },
      {
        id: "posti-standard",
        brand: "POSTI",
        title: "Обычный пакет",
        price: 8.95,
      },
      {
        id: "dhl-door",
        brand: "DHL",
        title: "От двери до двери",
        price: 10,
      },
      {
        id: "express",
        brand: "EXPRESS",
        title: "Экспресс пакет",
        price: 11.95,
      },
    ],
    companyTypes: ["Частное лицо", "ИП", "ООО"],
    pickupPoints: ["Kamppi", "Itäkeskus", "Tikkurila"],
    success: "Данные заказа успешно сохранены.",
  },
};

const TEXT = {
  ...copy,
  de: copy.en,
  fr: copy.en,
  it: copy.en,
  el: copy.en,
  es: copy.en,
  et: copy.en,
  lv: copy.en,
  lt: copy.en,
  pl: copy.en,
};

const CITY_TO_POSTAL = {
  helsinki: "00100",
  espoo: "02100",
  vantaa: "01300",
  tampere: "33100",
  turku: "20100",
  oulu: "90100",
  jyvaskyla: "40100",
  lahti: "15100",
  kuopio: "70100",
};

const REQUIRED_FIELDS = [
  "email",
  "firstName",
  "lastName",
  "address",
  "postalCode",
  "city",
  "country",
  "phone",
  "pickupLocation",
  "deliveryMethod",
];

const formatPrice = (value) => `${Number(value || 0).toFixed(2)} €`;

export function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.cart);
  const { language } = useLanguage();
  const labels = TEXT[language] || TEXT.en;

  const [formError, setFormError] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    email: user?.email || "",
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    city: "",
    country: "Finland",
    phone: "",
    pickupLocation: "",
    companyType: "",
    companyName: "",
    businessId: "",
    deliveryMethod: "posti-economy",
    pickupPoint: "",
    note: "",
    acceptTerms: false,
  });

  useEffect(() => {
    if (!user) {
      alert(labels.loginRequired);
      navigate("/login");
      return;
    }

    if (!cart.length) {
      alert(labels.emptyCart);
      navigate("/cart");
    }
  }, [user, cart.length, labels.loginRequired, labels.emptyCart, navigate]);

  const shippingOptions = labels.shippingOptions || TEXT.en.shippingOptions;
  const selectedShipping = useMemo(
    () => shippingOptions.find((option) => option.id === form.deliveryMethod) || shippingOptions[0],
    [form.deliveryMethod, shippingOptions],
  );

  const totalSets = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.setQuantity || 0), 0),
    [cart],
  );

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const unitPrice = Number(item.unitPrice ?? item.price ?? 0);
        return sum + unitPrice * Number(item.strandQuantity || 0) * Number(item.setQuantity || 0);
      }, 0),
    [cart],
  );

  const shippingCost = Number(selectedShipping?.price || 0);
  const grandTotal = subtotal + shippingCost;

  const isFieldInvalid = (field) => {
    if (!submitted) {
      return false;
    }

    if (field === "acceptTerms") {
      return !form.acceptTerms;
    }

    return !String(form[field] || "").trim();
  };

  const handleChange = (field, value) => {
    setFormError("");

    if (field === "city") {
      const postalCode = CITY_TO_POSTAL[value.trim().toLowerCase()] || form.postalCode;
      setForm((prev) => ({
        ...prev,
        city: value,
        postalCode,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (!user) {
      alert(labels.loginRequired);
      navigate("/login");
      return;
    }

    if (!cart.length) {
      alert(labels.emptyCart);
      navigate("/cart");
      return;
    }

    const hasEmptyField = REQUIRED_FIELDS.some((field) => !String(form[field] || "").trim());

    if (hasEmptyField || !form.acceptTerms) {
      setFormError(labels.requiredSummary);
      return;
    }

    const result = await dispatch(
      createOrder({
        email: form.email.trim(),
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        address: form.address.trim(),
        postal_code: form.postalCode.trim(),
        city: form.city.trim(),
        country: form.country.trim(),
        phone: form.phone.trim(),
        pickup_location: form.pickupLocation.trim(),
        company_type: form.companyType.trim(),
        company_name: form.companyName.trim(),
        business_id: form.businessId.trim(),
        delivery_method: form.deliveryMethod,
        delivery_price: shippingCost,
        pickup_point: form.pickupPoint.trim(),
        customer_note: form.note.trim(),
        accepted_terms: form.acceptTerms,
      }),
    );

    if (result.error) {
      setFormError(result.payload?.error || labels.requiredSummary);
      return;
    }

    await dispatch(fetchCart());
    alert(labels.success);
    navigate("/cart");
  };

  return (
    <div className={styles.checkout}>
      <div className={styles.content}>
        <div className={styles.formCard}>
          <h1>{labels.title}</h1>
          <p className={styles.subtitle}>{labels.subtitle}</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>{labels.contactDetails}</h2>
              </div>

              <div className={styles.fieldGrid}>
                <label className={styles.field}>
                  <span>{labels.email}</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => handleChange("email", event.target.value)}
                  />
                  {isFieldInvalid("email") ? <em>{labels.required}</em> : null}
                </label>

                <label className={styles.field}>
                  <span>{labels.phone}</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) => handleChange("phone", event.target.value)}
                  />
                  {isFieldInvalid("phone") ? <em>{labels.required}</em> : null}
                </label>

                <label className={styles.field}>
                  <span>{labels.firstName}</span>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(event) => handleChange("firstName", event.target.value)}
                  />
                  {isFieldInvalid("firstName") ? <em>{labels.required}</em> : null}
                </label>

                <label className={styles.field}>
                  <span>{labels.lastName}</span>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(event) => handleChange("lastName", event.target.value)}
                  />
                  {isFieldInvalid("lastName") ? <em>{labels.required}</em> : null}
                </label>

                <label className={`${styles.field} ${styles.fullWidth}`}>
                  <span>{labels.address}</span>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(event) => handleChange("address", event.target.value)}
                  />
                  {isFieldInvalid("address") ? <em>{labels.required}</em> : null}
                </label>

                <label className={styles.field}>
                  <span>{labels.postalCode}</span>
                  <input
                    type="text"
                    value={form.postalCode}
                    onChange={(event) => handleChange("postalCode", event.target.value)}
                  />
                  {isFieldInvalid("postalCode") ? <em>{labels.required}</em> : null}
                </label>

                <label className={styles.field}>
                  <span>{labels.city}</span>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(event) => handleChange("city", event.target.value)}
                  />
                  {isFieldInvalid("city") ? <em>{labels.required}</em> : null}
                </label>

                <label className={styles.field}>
                  <span>{labels.country}</span>
                  <input
                    type="text"
                    value={form.country}
                    onChange={(event) => handleChange("country", event.target.value)}
                  />
                  {isFieldInvalid("country") ? <em>{labels.required}</em> : null}
                </label>

                <label className={styles.field}>
                  <span>{labels.pickupLocation}</span>
                  <input
                    type="text"
                    value={form.pickupLocation}
                    onChange={(event) => handleChange("pickupLocation", event.target.value)}
                  />
                  {isFieldInvalid("pickupLocation") ? <em>{labels.required}</em> : null}
                </label>
              </div>

              <p className={styles.hint}>{labels.cityHint}</p>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>{labels.companyDetails}</h2>
              </div>

              <div className={styles.fieldGrid}>
                <label className={styles.field}>
                  <span>
                    {labels.companyType} <small>({labels.optionalLabel})</small>
                  </span>
                  <select
                    value={form.companyType}
                    onChange={(event) => handleChange("companyType", event.target.value)}
                  >
                    <option value="">{labels.companyPlaceholder}</option>
                    {labels.companyTypes.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className={styles.field}>
                  <span>
                    {labels.companyName} <small>({labels.optionalLabel})</small>
                  </span>
                  <input
                    type="text"
                    value={form.companyName}
                    onChange={(event) => handleChange("companyName", event.target.value)}
                  />
                </label>

                <label className={styles.field}>
                  <span>
                    {labels.businessId} <small>({labels.optionalLabel})</small>
                  </span>
                  <input
                    type="text"
                    value={form.businessId}
                    onChange={(event) => handleChange("businessId", event.target.value)}
                  />
                </label>
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>{labels.deliveryDetails}</h2>
              </div>

              <div className={styles.shippingList}>
                {shippingOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`${styles.shippingOption} ${
                      form.deliveryMethod === option.id ? styles.shippingOptionActive : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value={option.id}
                      checked={form.deliveryMethod === option.id}
                      onChange={(event) => handleChange("deliveryMethod", event.target.value)}
                    />
                    <span className={styles.shippingBrand}>{option.brand}</span>
                    <span className={styles.shippingText}>{option.title}</span>
                    <strong>{formatPrice(option.price)}</strong>
                  </label>
                ))}
              </div>
              {isFieldInvalid("deliveryMethod") ? <em className={styles.inlineError}>{labels.required}</em> : null}

              <div className={styles.fieldGrid}>
                <label className={styles.field}>
                  <span>
                    {labels.pickupPoint} <small>({labels.optionalLabel})</small>
                  </span>
                  <select
                    value={form.pickupPoint}
                    onChange={(event) => handleChange("pickupPoint", event.target.value)}
                  >
                    <option value="">{labels.pickupPlaceholder}</option>
                    {labels.pickupPoints.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>{labels.noteSection}</h2>
              </div>

              <label className={`${styles.field} ${styles.fullWidth}`}>
                <span>{labels.note}</span>
                <textarea
                  rows="5"
                  value={form.note}
                  onChange={(event) => handleChange("note", event.target.value)}
                  placeholder={labels.notePlaceholder}
                />
              </label>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>{labels.termsTitle}</h2>
              </div>

              <div className={styles.termsBox}>
                <label className={styles.checkboxRow}>
                  <input
                    type="checkbox"
                    checked={form.acceptTerms}
                    onChange={(event) => handleChange("acceptTerms", event.target.checked)}
                  />
                  <span>{labels.acceptTerms}</span>
                </label>
                <button
                  type="button"
                  className={styles.termsLink}
                  onClick={() => setShowTerms(true)}
                >
                  {labels.readTerms}
                </button>
              </div>
              {isFieldInvalid("acceptTerms") ? <em className={styles.inlineError}>{labels.required}</em> : null}
            </section>

            {formError ? <p className={styles.error}>{formError}</p> : null}

            <button type="submit" className={styles.submitButton}>
              {labels.submit}
            </button>
          </form>
        </div>

        <aside className={styles.summaryCard}>
          <h2>{labels.summary}</h2>
          <div className={styles.orderItems}>
            <h3>{labels.orderItems}</h3>
            <div className={styles.orderList}>
              {cart.map((item) => (
                <article key={item.id} className={styles.orderItem}>
                  <img
                    src={item.img || item.images?.[0]}
                    alt={item.name}
                    className={styles.orderItemImage}
                  />
                  <div className={styles.orderItemText}>
                    <strong>{item.name}</strong>
                    <span>
                      {labels.length}: {item.length}
                    </span>
                    <span>
                      {labels.quantity}: {item.strandQuantity}
                    </span>
                    <span>
                      {labels.sets}: {item.setQuantity}
                    </span>
                  </div>
                  <div className={styles.orderItemPrice}>
                    {formatPrice(
                      Number(item.unitPrice ?? item.price ?? 0) *
                        Number(item.strandQuantity || 0) *
                        Number(item.setQuantity || 0),
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className={styles.summaryRow}>
            <span>{labels.items}</span>
            <strong>{totalSets}</strong>
          </div>
          <div className={styles.summaryRow}>
            <span>{labels.subtotal}</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <div className={styles.summaryRow}>
            <span>{labels.shipping}</span>
            <strong>{formatPrice(shippingCost)}</strong>
          </div>
          <div className={`${styles.summaryRow} ${styles.summaryRowAccent}`}>
            <span>{labels.finalTotal}</span>
            <strong>{formatPrice(grandTotal)}</strong>
          </div>
        </aside>
      </div>

      {showTerms ? (
        <div className={styles.modalOverlay} role="presentation" onClick={() => setShowTerms(false)}>
          <div className={styles.modalCard} role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{labels.termsTitle}</h3>
              <button type="button" onClick={() => setShowTerms(false)}>
                {labels.closeTerms}
              </button>
            </div>
            <p>{labels.termsIntro}</p>
            <ul className={styles.termsList}>
              {labels.termsList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
