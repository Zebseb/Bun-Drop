import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    await fetch("http://localhost:7001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }

  return (
    <div className="grid-container">
      {products.map((p) => (
        <div key={p.id}>
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
