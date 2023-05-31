import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
    <div>
      <div className="center-div">
        <FontAwesomeIcon icon={faSearch} />
        <input className="search-bar" type="search" placeholder="Search..." />
      </div>
      <div className="grid-container">
        {products.map((p) => (
          <div key={p.id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
