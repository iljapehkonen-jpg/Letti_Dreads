import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetItem } from "../../componets";
import { addItemToCart, fetchCart } from "../../redux/slices/cartSlice";
import { fetchSets } from "../../redux/slices/setSlice";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import shopStyles from "../shop/Shop.module.scss";
import styles from "./Instant.module.scss";
import { normalizeCategorySlug } from "../../utils/categories.js";

const INSTANT_LABELS = {
  fi: "Valmiit setit",
  en: "Instock",
  ru: "Готовые сеты",
  de: "Fertige Sets",
  fr: "Sets prêts",
  it: "Set pronti",
  el: "Έτοιμα σετ",
  es: "Sets listos",
  et: "Valmis komplektid",
  lv: "Gatavie komplekti",
  lt: "Paruošti rinkiniai",
  pl: "Gotowe zestawy",
};
const INSTANT_MODAL_TEXT = {
  fi: { buyNow: "Osta nyt", addToCart: "Lisää ostoskoriin", errorAddToCart: "Tuotetta ei voitu lisätä ostoskoriin" },
  en: { buyNow: "Buy now", addToCart: "Add to cart", errorAddToCart: "Could not add item to cart" },
  ru: { buyNow: "Купить сейчас", addToCart: "Добавить в корзину", errorAddToCart: "Не удалось добавить товар в корзину" },
  de: { buyNow: "Jetzt kaufen", addToCart: "In den Warenkorb", errorAddToCart: "Produkt konnte nicht in den Warenkorb gelegt werden" },
  fr: { buyNow: "Acheter maintenant", addToCart: "Ajouter au panier", errorAddToCart: "Impossible d'ajouter le produit au panier" },
  it: { buyNow: "Acquista ora", addToCart: "Aggiungi al carrello", errorAddToCart: "Impossibile aggiungere il prodotto al carrello" },
  el: { buyNow: "Αγορά τώρα", addToCart: "Προσθήκη στο καλάθι", errorAddToCart: "Δεν ήταν δυνατή η προσθήκη στο καλάθι" },
  es: { buyNow: "Comprar ahora", addToCart: "Añadir al carrito", errorAddToCart: "No se pudo añadir el producto al carrito" },
  et: { buyNow: "Osta kohe", addToCart: "Lisa ostukorvi", errorAddToCart: "Toodet ei saanud ostukorvi lisada" },
  lv: { buyNow: "Pirkt tagad", addToCart: "Pievienot grozam", errorAddToCart: "Produktu neizdevās pievienot grozam" },
  lt: { buyNow: "Pirkti dabar", addToCart: "Į krepšelį", errorAddToCart: "Nepavyko pridėti produkto į krepšelį" },
  pl: { buyNow: "Kup teraz", addToCart: "Dodaj do koszyka", errorAddToCart: "Nie udało się dodać produktu do koszyka" },
};

export function Instant() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const modalText = INSTANT_MODAL_TEXT[language] || INSTANT_MODAL_TEXT.en;
  const { sets } = useSelector((state) => state.sets);
  const user = useSelector((state) => state.auth.user);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    dispatch(fetchSets());
  }, [dispatch]);

  const instantTitle = t("header.instock");
  const instantSets = useMemo(
    () =>
      sets.filter(
        (set) => normalizeCategorySlug(set.category) === "instock",
      ),
    [sets],
  );

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setSelectedImage(product.images?.[0] || product.photo || "");
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setSelectedImage("");
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
    const result = await dispatch(
      addItemToCart({
        productId: selectedProduct.id,
        name: selectedProduct.name,
        description: selectedProduct.description,
        img: selectedProduct.photo || selectedProduct.images?.[0] || "",
        images: selectedProduct.images || [],
        unitPrice,
        price: unitPrice,
        strandQuantity: 1,
        setQuantity: 1,
        length: "",
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
      navigate("/cart");
    }
  };

  const selectedImages = selectedProduct?.images?.length
    ? selectedProduct.images
    : selectedProduct?.photo
      ? [selectedProduct.photo]
      : [];

  return (
    <>
      <div className={styles.instant}>
        <h1>{instantTitle}</h1>
        <div className={styles.instantList}>
          {instantSets.length ? (
            instantSets.map((set) => (
              <SetItem
                key={set.id}
                img={set.photo || set.images?.[0]}
                name={set.name}
                price={`${set.price} €`}
                onClick={() => openProductModal(set)}
              />
            ))
          ) : (
            <div className={styles.emptyState}>{t("common.noItems")}</div>
          )}
        </div>
      </div>

      {selectedProduct ? (
        <div className={shopStyles.modalOverlay} onClick={closeProductModal}>
          <div
            className={`${shopStyles.productModal} ${styles.instantModal}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button className={shopStyles.closeButton} onClick={closeProductModal}>
              ×
            </button>

            <div className={shopStyles.modalContent}>
              <div className={shopStyles.modalForm}>
                <h2>{selectedProduct.name}</h2>
                <p>{selectedProduct.description}</p>
                <div className={shopStyles.priceBlock}>
                  <strong>{Number(selectedProduct.price).toFixed(2)} €</strong>
                </div>

                <div className={styles.instantActions}>
                  <button className={shopStyles.payNowButton} onClick={handleBuyNow}>
                    {modalText.buyNow}
                  </button>
                  <button
                    className={shopStyles.addToCartButton}
                    onClick={handleAddToCart}
                  >
                    {modalText.addToCart}
                  </button>
                </div>
              </div>

              <div className={shopStyles.modalPreview}>
                <div className={shopStyles.previewStage}>
                  {selectedImage ? (
                    <img src={selectedImage} alt={selectedProduct.name} />
                  ) : null}
                </div>

                {selectedImages.length > 1 ? (
                  <div className={shopStyles.previewScrollerWrap}>
                    <div className={shopStyles.previewScroller}>
                      {selectedImages.map((image, imageIndex) => (
                        <button
                          key={`${selectedProduct.id}-${imageIndex}`}
                          type="button"
                          className={`${shopStyles.previewThumb} ${selectedImage === image ? shopStyles.previewThumbActive : ""}`}
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

