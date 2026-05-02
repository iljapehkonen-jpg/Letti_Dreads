import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ContentLoader from "react-content-loader";
import styles from "./Shop.module.scss";
import { fetchSets } from "../../redux/slices/setSlice";
import { addItemToCart, fetchCart } from "../../redux/slices/cartSlice";
import { SetItem } from "../../componets";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import {
  getCategoryTranslationKey,
  normalizeCategorySlug,
} from "../../utils/categories.js";

const LENGTH_OPTIONS = [
  { value: "45-50 cm", label: "45-50 cm" },
  { value: "55-60 cm", label: "55-60 cm" },
];
const MIN_QUANTITY = 10;
const DEFAULT_QUANTITY = 60;
const MAX_QUANTITY = 65;
const QUANTITY_STEP = 5;
const PER_PIECE_LABELS = {
  fi: "kpl.",
  en: "pc.",
  ru: "шт.",
};

const MODAL_TEXT = {
  fi: {
    length: "Pituus",
    quantity: "Maara",
    buyNow: "Osta nyt",
    addToCart: "Lisaa ostoskoriin",
    errorAddToCart: "Tuotetta ei voitu lisata ostoskoriin",
    perPiece: "kpl.",
  },
  en: {
    length: "Length",
    quantity: "Quantity",
    buyNow: "Buy now",
    addToCart: "Add to cart",
    errorAddToCart: "Could not add item to cart",
    perPiece: "pc.",
  },
  ru: {
    length: "Длина",
    quantity: "Количество",
    buyNow: "Купить сейчас",
    addToCart: "Добавить в корзину",
    errorAddToCart: "Не удалось добавить товар в корзину",
    perPiece: "шт.",
  },
  de: {
    length: "Lange",
    quantity: "Menge",
    buyNow: "Jetzt kaufen",
    addToCart: "In den Warenkorb",
    errorAddToCart: "Produkt konnte nicht in den Warenkorb gelegt werden",
    perPiece: "Stk.",
  },
  fr: {
    length: "Longueur",
    quantity: "Quantite",
    buyNow: "Acheter maintenant",
    addToCart: "Ajouter au panier",
    errorAddToCart: "Impossible d'ajouter le produit au panier",
    perPiece: "pcs",
  },
  it: {
    length: "Lunghezza",
    quantity: "Quantita",
    buyNow: "Acquista ora",
    addToCart: "Aggiungi al carrello",
    errorAddToCart: "Impossibile aggiungere il prodotto al carrello",
    perPiece: "pz",
  },
  el: {
    length: "Μηκος",
    quantity: "Ποσοτητα",
    buyNow: "Αγορα τωρα",
    addToCart: "Προσθηκη στο καλαθι",
    errorAddToCart: "Δεν ηταν δυνατη η προσθηκη στο καλαθι",
    perPiece: "τεμ.",
  },
  es: {
    length: "Largo",
    quantity: "Cantidad",
    buyNow: "Comprar ahora",
    addToCart: "Anadir al carrito",
    errorAddToCart: "No se pudo anadir el producto al carrito",
    perPiece: "uds.",
  },
  et: {
    length: "Pikkus",
    quantity: "Kogus",
    buyNow: "Osta kohe",
    addToCart: "Lisa ostukorvi",
    errorAddToCart: "Toodet ei saanud ostukorvi lisada",
    perPiece: "tk",
  },
  lv: {
    length: "Garums",
    quantity: "Daudzums",
    buyNow: "Pirkt tagad",
    addToCart: "Pievienot grozam",
    errorAddToCart: "Produktu neizdevas pievienot grozam",
    perPiece: "gab.",
  },
  lt: {
    length: "Ilgis",
    quantity: "Kiekis",
    buyNow: "Pirkti dabar",
    addToCart: "I krepseli",
    errorAddToCart: "Nepavyko prideti produkto i krepseli",
    perPiece: "vnt.",
  },
  pl: {
    length: "Dlugosc",
    quantity: "Ilosc",
    buyNow: "Kup teraz",
    addToCart: "Dodaj do koszyka",
    errorAddToCart: "Nie udalo sie dodac produktu do koszyka",
    perPiece: "szt.",
  },
};

export function Shop() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sets } = useSelector((state) => state.sets);
  const user = useSelector((state) => state.auth.user);
  const { t, language } = useLanguage();
  const modalText = MODAL_TEXT[language] || MODAL_TEXT.en;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedLength, setSelectedLength] = useState(LENGTH_OPTIONS[0].value);
  const [selectedQuantity, setSelectedQuantity] = useState(DEFAULT_QUANTITY);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    dispatch(fetchSets());
  }, [dispatch]);

  const categoryTitle = useMemo(() => {
    if (!id) {
      return t("shop.title");
    }

    if (normalizeCategorySlug(id) === "curls-on-mini-dread" && language === "fi") {
      return "Kiharat pikku rastalla";
    }

    const translationKey = getCategoryTranslationKey(id);
    if (translationKey) {
      return t(translationKey);
    }

    const matchedSet = sets.find(
      (set) => normalizeCategorySlug(set.category) === normalizeCategorySlug(id),
    );

    return matchedSet?.category || id;
  }, [id, sets, t, language]);

  const filteredSets = useMemo(() => {
    return id
      ? sets.filter(
          (set) => normalizeCategorySlug(set.category) === normalizeCategorySlug(id),
        )
      : sets;
  }, [id, sets]);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setSelectedLength(LENGTH_OPTIONS[0].value);
    setSelectedQuantity(DEFAULT_QUANTITY);
    setSelectedImage(product.images?.[0] || product.photo || "");
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setSelectedImage("");
  };

  const adjustQuantity = (delta) => {
    setSelectedQuantity((prev) =>
      Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, Number(prev) + delta)),
    );
  };

  const addCurrentProductToCart = async () => {
    if (!selectedProduct) {
      return false;
    }

    if (!user) {
      closeProductModal();
      navigate("/login");
      return false;
    }

    const unitPrice = Number(selectedProduct.price);
    const strandQuantity = Math.min(
      MAX_QUANTITY,
      Math.max(MIN_QUANTITY, Number(selectedQuantity) || DEFAULT_QUANTITY),
    );

    const result = await dispatch(
      addItemToCart({
        productId: selectedProduct.id,
        name: selectedProduct.name,
        description: selectedProduct.description,
        img: selectedProduct.photo || selectedProduct.images?.[0] || "",
        images: selectedProduct.images || [],
        unitPrice,
        price: unitPrice,
        strandQuantity,
        setQuantity: 1,
        length: selectedLength,
        color: "",
        category: selectedProduct.category,
      }),
    );

    if (result.error) {
      alert(result.payload?.error || modalText.errorAddToCart);
    }

    if (!result.error) {
      await dispatch(fetchCart());
    }

    return !result.error;
  };

  const handleAddToCart = async () => {
    if (await addCurrentProductToCart()) {
      closeProductModal();
    }
  };

  const handleBuyNow = async () => {
    if (await addCurrentProductToCart()) {
      closeProductModal();
      navigate("/checkout");
    }
  };

  const selectedImages = selectedProduct?.images?.length
    ? selectedProduct.images
    : selectedProduct?.photo
      ? [selectedProduct.photo]
      : [];
  const selectedUnitPrice = Number(selectedProduct?.price || 0);
  const selectedTotalPrice = selectedUnitPrice * selectedQuantity;
  const perPieceLabel = modalText.perPiece;

  return (
    <>
      <div className={styles.shop}>
        <h1>{categoryTitle}</h1>
        <div className={styles.shopList}>
          {filteredSets.length
            ? filteredSets.map((set, index) => (
                <SetItem
                  className={styles.shopItem}
                  name={set.name}
                  img={set.photo || set.images?.[0]}
                  price={`${set.price} €`}
                  hideDetails
                  key={index}
                  onClick={() => openProductModal(set)}
                />
              ))
            : new Array(10).fill(0).map((_, index) => (
                <ContentLoader
                  speed={0.5}
                  width={250}
                  height={410}
                  viewBox="0 0 250 410"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                  key={index}
                >
                  <rect x="0" y="0" rx="0" ry="0" width="250" height="410" />
                </ContentLoader>
              ))}
        </div>
      </div>

      {selectedProduct ? (
        <div className={styles.modalOverlay} onClick={closeProductModal}>
          <div
            className={styles.productModal}
            onClick={(event) => event.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={closeProductModal}>
              ×
            </button>

            <div className={styles.modalContent}>
              <div className={styles.modalForm}>
                <h2>{selectedProduct.name}</h2>
                <p>{selectedProduct.description}</p>
                <div className={styles.priceBlock}>
                  <strong>{selectedTotalPrice.toFixed(2)} €</strong>
                  <span>
                    {selectedUnitPrice.toFixed(2)} € / {perPieceLabel}
                  </span>
                </div>

                <div className={styles.optionBlock}>
                  <h3>{modalText.length}</h3>
                  <div className={styles.lengthOptions}>
                    {LENGTH_OPTIONS.map((length) => (
                      <button
                        key={length.value}
                        type="button"
                        className={
                          selectedLength === length.value ? styles.lengthActive : ""
                        }
                        onClick={() => setSelectedLength(length.value)}
                      >
                        {length.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.optionBlock}>
                  <h3>{modalText.quantity}</h3>
                  <div className={styles.quantityControl}>
                    <button
                      type="button"
                      onClick={() => adjustQuantity(-QUANTITY_STEP)}
                    >
                      -
                    </button>
                    <div className={styles.quantityValue}>{selectedQuantity}</div>
                    <button
                      type="button"
                      onClick={() => adjustQuantity(QUANTITY_STEP)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className={styles.actionButtons}>
                  <button className={styles.payNowButton} onClick={handleBuyNow}>
                    {modalText.buyNow}
                  </button>
                  <button
                    className={styles.addToCartButton}
                    onClick={handleAddToCart}
                  >
                    {modalText.addToCart}
                  </button>
                </div>
              </div>

              <div className={styles.modalPreview}>
                <div className={styles.previewStage}>
                  {selectedImage ? (
                    <img src={selectedImage} alt={selectedProduct.name} />
                  ) : null}
                </div>

                {selectedImages.length > 1 ? (
                  <div className={styles.previewScrollerWrap}>
                    <div className={styles.previewScroller}>
                      {selectedImages.map((image, imageIndex) => (
                        <button
                          key={`${selectedProduct.id}-${imageIndex}`}
                          type="button"
                          className={`${styles.previewThumb} ${selectedImage === image ? styles.previewThumbActive : ""}`}
                          onClick={() => setSelectedImage(image)}
                        >
                          <img
                            src={image}
                            alt={`${selectedProduct.name} ${imageIndex + 1}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
