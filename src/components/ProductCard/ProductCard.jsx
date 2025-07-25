import React from "react";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <img src={product.urlImage} alt={product.name} className={styles.image} />
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.price}>R$ {Number(product.price).toFixed(2)}</p>
      <button className={styles.button}>Ver mais</button>
    </div>
  );
};

export default ProductCard;
