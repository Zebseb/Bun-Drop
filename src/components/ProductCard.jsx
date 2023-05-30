import React from "react";

function ProductCard({ product }) {
  return (
    <div>
      <div className="product-card">
        <h4>{product.name}</h4>
        <img
          className="product-card-img"
          src={product.image}
          alt="Image of the product."
        />
        <p>{product.description}</p>
        <span>Price: </span>
        <em>{product.price}$</em>
        <div>
          <button className="add-btn">Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
