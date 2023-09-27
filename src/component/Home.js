import React from "react";
import { useState, useEffect } from "react";
import Collapse from "react-bootstrap/Collapse";
import axios from "../api/axios";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CATEGORIES_URL = "/get-categories";
const PRODUCTS_URL = "/get-products";
const price_ranges = [
  { min: 0, max: 50 },
  { min: 50, max: 100 },
  { min: 100, max: 150 },
  { min: 150, max: 200 },
  { min: 200, max: 250 },
  { min: 250, max: 300 },
];
// const evaluation_ranges = [1, 2, 3, 4, 5];
export default function Home() {
  const navigate = useNavigate();
  const [categories_filter, setCategories_Filter] = useState(false);
  const [prices_filter, setPrices_Filter] = useState(false);
  // const [evaluations_filter, setEvaluations_Filter] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [display_products, setDisplay_Products] = useState([]);
  const [filter_products, setFilter_Products] = useState([]);
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [search_products, setSearch_Products] = useState([]);
  const [sort_products, setSort_Products] = useState([]);
  // const [evaluation, setEvaluation] = useState([]);
  const [sort, setSort] = useState("");
  const getCategories = async () => {
    try {
      const response = await axios.get(CATEGORIES_URL);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        toast.error("No server response");
      } else {
        toast.error(error.response.data);
      }
    }
  };
  const getProducts = async () => {
    try {
      const response = await axios.get(PRODUCTS_URL);
      setProducts(response.data);
      setSearch_Products(response.data);
      setFilter_Products(response.data);
      setSort_Products(response.data);
      setDisplay_Products(response.data.slice(page * 12, page * 12 + 12));
      setPages(Math.ceil(response.data.length / 12));
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        toast.error("No server response");
      } else {
        toast.error(error.response.data);
      }
    }
  };
  useEffect(() => {
    getCategories();
    getProducts();
  }, []);
  const handleCategoriesClick = (item) => {
    if (category.includes(item)) {
      const updatedCategory = category.filter((category) => category !== item);
      setCategory(updatedCategory);
    } else {
      setCategory((category) => [...category, item]);
    }
    setSort("");
  };
  const handlePricesClick = (item) => {
    if (price.includes(item)) {
      const updatedPrice = price.filter((price) => price !== item);
      setPrice(updatedPrice);
    } else {
      setPrice((price) => [...price, item]);
    }
    setSort("");
  };
  // const handleEvaluationsClick = (item) => {
  //   if (evaluation === item) setEvaluation(0);
  //   else setEvaluation(item);
  // };
  const handlePage = (e) => {
    const start = e.selected * 12;
    const end = start + 12;
    setDisplay_Products(sort_products.slice(start, end));
    setPage(e.selected);
  };
  const handleView = (id) => {
    navigate(`/detailed-product/${id}`);
  };
  const handlePriceSorting = (e) => {
    setSort(e.target.value);
  };
  const handleNewSorting = () => {
    if (sort === "new") setSort("");
    else setSort("new");
  };
  const handlePopularSorting = () => {
    if (sort === "popular") setSort("");
    else setSort("popular");
  };
  const handlePurchaseSorting = () => {
    if (sort === "purchase") setSort("");
    else setSort("purchase");
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const searchedProducts = products.filter((item) =>
      item.name.includes(keyword)
    );
    setSearch_Products(searchedProducts);
    setFilter_Products(search_products);
    setSort_Products(search_products);
    setDisplay_Products(searchedProducts.slice(0, 12));
    setPages(Math.ceil(searchedProducts.length / 12));
    setPage(0);
    setCategory([]);
    setPrice([]);
    setSort("");
  };
  useEffect(() => {
    if (category.length === 0 && price.length === 0) {
      setFilter_Products(search_products);
      setSort_Products(search_products);
      setDisplay_Products(search_products.slice(0, 12));
      setPages(Math.ceil(search_products.length / 12));
      setPage(0);
    } else {
      const filteredProducts = search_products.filter(
        (item) =>
          (category.length === 0
            ? true
            : category.includes(item.category.name)) &&
          (price.length === 0 ? true : comparePrices(price, item.price))
      );
      setFilter_Products(filteredProducts);
      setSort_Products(filteredProducts);
      setDisplay_Products(filteredProducts.slice(0, 12));
      setPages(Math.ceil(filteredProducts.length / 12));
      setPage(0);
    }
  }, [category, price]);
  useEffect(() => {
    const alternative = [...filter_products];
    if (sort === "") {
      setSort_Products(filter_products);
      setDisplay_Products(filter_products.slice(0, 12));
      setPages(Math.ceil(filter_products.length / 12));
      setPage(0);
    } else if (sort === "new") {
      const sortedProducts = alternative.sort((a, b) => {
        const dateA = new Date(convertDateFormat(a.creation_date));
        const dateB = new Date(convertDateFormat(b.creation_date));
        return dateB - dateA;
      });
      setSort_Products(sortedProducts);
      setDisplay_Products(sortedProducts.slice(0, 12));
      setPages(Math.ceil(sortedProducts.length / 12));
      setPage(0);
    } else if (sort === "popular") {
      const sortedProducts =  alternative.sort((a, b) => b.number_of_views - a.number_of_views);
      setSort_Products(sortedProducts);
      setDisplay_Products(sortedProducts.slice(0, 12));
      setPages(Math.ceil(sortedProducts.length / 12));
      setPage(0);
    } else if (sort === "purchase") {
      const sortedProducts =  alternative.sort((a, b) => b.number_of_purchases - a.number_of_purchases);
      setSort_Products(sortedProducts);
      setDisplay_Products(sortedProducts.slice(0, 12));
      setPages(Math.ceil(sortedProducts.length / 12));
      setPage(0);
    } else if (sort === "top") {
      const sortedProducts =  alternative.sort((a, b) => b.price - a.price);
      setSort_Products(sortedProducts);
      setDisplay_Products(sortedProducts.slice(0, 12));
      setPages(Math.ceil(sortedProducts.length / 12));
      setPage(0);
    } else if (sort === "bottom") {
      const sortedProducts = alternative.sort((a, b) => a.price - b.price);
      setSort_Products(sortedProducts);
      setDisplay_Products(sortedProducts.slice(0, 12));
      setPages(Math.ceil(sortedProducts.length / 12));
      setPage(0);
    }
  }, [sort]);
  const comparePrices = (ranges, price) => {
    for (let i = 0; i < ranges.length; i++) {
      const range = ranges[i];
      if (price >= range.min && price <= range.max) {
        return true;
      }
    }
    return false;
  };
  function convertDateFormat(inputDate) {
    const parts = inputDate.split('/');
    if (parts.length === 3) {
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      const newDate = `${year}/${month}/${day}`;
      return newDate;
    } else {
      return null;
    }
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col col-2 py-3">
            <div className="text-center py-3">
              <h5>Filtering Priorities</h5>
            </div>
            <div className="my-2">
              <button
                className="btn btn-info border shadow col col-12 text-white"
                onClick={() => setCategories_Filter(!categories_filter)}
                aria-controls="categories-filter"
                aria-expanded={categories_filter}
              >
                Categories
              </button>
              <Collapse in={categories_filter}>
                <div id="categories-filter">
                  <table className="table table-hover table-bordered rounded">
                    {categories.map((item) => (
                      <tr key={item.id} className="col-12">
                        <button
                          className={`col-12 btn ${
                            category.includes(item.name)
                              ? "btn-secondary"
                              : "btn-light"
                          }`}
                          onClick={() => handleCategoriesClick(item.name)}
                        >
                          {item.name}
                        </button>
                      </tr>
                    ))}
                  </table>
                </div>
              </Collapse>
            </div>
            <div className="my-2">
              <button
                className="btn btn-info border shadow col col-12 text-white"
                onClick={() => setPrices_Filter(!prices_filter)}
                aria-controls="prices-filter"
                aria-expanded={prices_filter}
              >
                Prices
              </button>
              <Collapse in={prices_filter}>
                <div id="prices-filter">
                  <table className="table table-hover table-bordered rounded">
                    {price_ranges.map((item, index) => (
                      <tr key={index} className="col-12">
                        <button
                          className={`col-12 btn ${
                            price.includes(item) ? "btn-secondary" : "btn-light"
                          }`}
                          onClick={() => handlePricesClick(item)}
                        >
                          {item.min}$ - {item.max}$
                        </button>
                      </tr>
                    ))}
                  </table>
                </div>
              </Collapse>
            </div>
            {/* <div className="my-2">
              <button
                className="btn btn-info border shadow col col-12 text-white"
                onClick={() => setEvaluations_Filter(!evaluations_filter)}
                aria-controls="evaluations-filter"
                aria-expanded={evaluations_filter}
              >
                Evaluations
              </button>
              <Collapse in={evaluations_filter}>
                <div id="evaluations-filter">
                  <table className="table table-hover table-bordered rounded">
                    {evaluation_ranges.map((item, index) => (
                      <tr key={index} className="col-12">
                        <button
                          className={`col-12 btn ${
                            evaluation === item ? "btn-secondary" : "btn-light"
                          }`}
                          onClick={() => handleEvaluationsClick(item)}
                        >
                          {item} &#9733;
                        </button>
                      </tr>
                    ))}
                  </table>
                </div>
              </Collapse>
            </div> */}
          </div>
          <div className="col col-10 py-3">
            <div className="form-group row p-2">
              <label htmlFor="search" className="col-1 col-form-label">
                <h5>Search: </h5>
              </label>
              <div className="col col-10">
                <input
                  type="text"
                  className="form-control"
                  id="search"
                  placeholder="Enter your keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <div className="col col-1">
                <button
                  className="btn btn-info col-12 text-white"
                  type="button"
                  onClick={(e) => handleSearch(e)}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
            </div>
            <div className="p-2 d-flex align-items-center justify-content-between">
              <label className="me-2 col-form-label">
                <h5>Sorting Priorities: </h5>
              </label>
              <button
                type="button"
                className={`btn ${
                  sort === "new" ? "btn-info" : "btn-outline-info"
                } col col-2 me-2`}
                onClick={handleNewSorting}
              >
                Newest
              </button>
              <button
                type="button"
                className={`btn ${
                  sort === "popular" ? "btn-info" : "btn-outline-info"
                } col col-2 me-2`}
                onClick={handlePopularSorting}
              >
                Most popular
              </button>
              <button
                type="button"
                className={`btn ${
                  sort === "purchase" ? "btn-info" : "btn-outline-info"
                } col col-2 me-2`}
                onClick={handlePurchaseSorting}
              >
                Most purchased
              </button>
              <div className="col col-3">
                <select
                  className="form-control"
                  onChange={(e) => handlePriceSorting(e)}
                  value={
                    sort !== "" && sort !== "top" && sort !== "bottom"
                      ? ""
                      : sort
                  }
                >
                  <option value="">-- Sorting by prices --</option>
                  <option value="top">From high prices to low prices</option>
                  <option value="bottom">From low prices to high prices</option>
                </select>
              </div>
            </div>
            <div className="d-flex flex-wrap">
              {display_products.map((item) => (
                <div className="col-3 p-2" key={item.id}>
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={
                        item.image
                          ? `../../media/${item.image}`
                          : `../../media/default-image.jpg`
                      }
                      alt={`${item.name}`}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">
                        <span className="fw-bold">Price:</span>{" "}
                        {item.discount_price ? (
                          <span>
                            {item.discount_price}${" "}
                            <del className="text-danger">{item.price}$</del>
                          </span>
                        ) : (
                          <span>{item.price}$</span>
                        )}
                      </p>
                      <div className="col-12">
                        <button
                          className="btn btn-info col-12"
                          onClick={() => handleView(item.id)}
                        >
                          <FontAwesomeIcon
                            icon={faEye}
                            className="text-white"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-center mt-3">
              <ReactPaginate
                breakLabel="..."
                nextLabel="NEXT >"
                onPageChange={handlePage}
                pageRangeDisplayed={1}
                pageCount={pages}
                previousLabel="< PREVIOUS"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                forcePage={page}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
