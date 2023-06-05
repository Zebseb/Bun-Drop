import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(getUser);

  useEffect(() => {
    getProducts();
  }, []);

  function getUser() {
    const foundUser = localStorage.getItem("signedIn");

    if (foundUser) {
      return foundUser;
    } else {
      return false;
    }
  }

  function getProducts() {
    fetch("http://localhost:7001/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }

  function handleInput(e) {
    const searchWord = e.target.value.toLowerCase();

    const tempProducts = [...products].filter((p) => {
      if (
        p.name.toLowerCase().includes(searchWord) ||
        p.category.toLowerCase().includes(searchWord)
      ) {
        return true;
      }
    });

    setFilteredProducts(tempProducts);
  }

  function updateMenu() {
    getProducts();
    getUser();
  }

  return (
    <div className="flex-body">
      <div className="center-div input-icon">
        <FontAwesomeIcon className="search-icon" icon={faSearch} />
        <input
          className="search-bar"
          type="search"
          placeholder="Search..."
          onInput={handleInput}
        />
      </div>
      <div id="scroll-bar" className="grid-container">
        {filteredProducts.map((p) => (
          <div key={p.id}>
            <ProductCard
              product={p}
              foundUser={isLoggedIn}
              updateMenu={updateMenu}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
