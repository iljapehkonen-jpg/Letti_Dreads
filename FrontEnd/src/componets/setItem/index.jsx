import React from "react";
import { Link } from "react-router-dom";
import styles from "./SetItem.module.scss";

export function SetItem({
  img,
  name,
  price,
  category,
  to,
  onClick,
  hideDetails = false,
  className = "",
}) {
  const baseClassName = `${styles.setItem} ${hideDetails ? styles.imageOnly : styles.withDetails} ${className}`.trim();

  const content = (
    <>
      <img src={img} alt={name || "set image"} />
      {!hideDetails ? <h4>{name}</h4> : null}
      {!hideDetails && category ? (
        <span className={styles.category}>{category}</span>
      ) : null}
      {!hideDetails && price ? <p>{price}</p> : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={baseClassName}>
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        className={`${baseClassName} ${styles.setItemButton}`.trim()}
        onClick={onClick}
      >
        {content}
      </button>
    );
  }

  return <div className={baseClassName}>{content}</div>;
}
