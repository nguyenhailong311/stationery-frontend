import React, { useEffect, useState } from "react";
import {
  faMagnifyingGlass,
  faPlus,
  faList,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "react-toastify";
import ProductDeletion from "./ProductDeletion";
import ReactPaginate from "react-paginate";
const PRODUCTS_URL = "/get-products";
const PRODUCTS_SEARCH_URL = "/search-products";
const CATEGORIES_URL = "/get-categories";
export default function ProductManagement() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [show_deletion, setShow_Deletion] = useState(false);
  // const [show_edition, setShow_Edition] = useState(false);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [display_products, setDisplay_Products] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [categories, setCategories] = useState([]);
  const [category_name, setCategory_Name] = useState("");
  const handleAdd = () => {
    navigate("/product-addition");
  };
  const handleCategory = () => {
    navigate("/category-management");
  };
  const getProducts = async () => {
    try {
      const response = await axios.get(PRODUCTS_URL);
      setProducts(response.data);
      setDisplay_Products(response.data.slice(page * 10, page * 10 + 10));
      setPages(Math.ceil(response.data.length / 10));
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        toast.error("No server response");
      } else {
        toast.error(error.response.data);
      }
    }
  };
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
  useEffect(() => {
    getProducts();
    getCategories();
  }, [show_deletion]);
  const handlePage = (e) => {
    const start = e.selected * 10;
    const end = start + 10;
    setDisplay_Products(products.slice(start, end));
    setPage(e.selected);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${PRODUCTS_SEARCH_URL}?keyword=${keyword}&category_name=${category_name}`);
      setProducts(response.data);
      setDisplay_Products(response.data.slice(page * 10, page * 10 + 10));
      setPages(Math.ceil(response.data.length / 10));
      setKeyword("");
      setCategory_Name("");
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        toast.error("No server response");
      } else {
        toast.error(error.response.data);
      }
    }
  };
  // const handleOpenEdition = (item) => {
  //   setProduct(item);
  //   setShow_Edition(true);
  // };
  const handleOpenEdition = (id) => {
    navigate(`/product-edition/${id}`);
  }
  const handleOpenDeletion = (item) => {
    setProduct(item);
    setShow_Deletion(true);
  };
  return (
    <>
      <div className="container text-center m-3">
        <div className="display-6 fw-bold m-2">Products Management</div>
        <div className="d-flex justify-content-center align-items-center col-10 mx-auto my-3">
          <div className="col-9 d-flex">
            <div className="form-group row col-6">
              <label htmlFor="search" className="col-2 col-form-label text-end">
                Search:{" "}
              </label>
              <div className="col-10">
                <input
                  type="text"
                  className="form-control"
                  id="search"
                  placeholder="Enter your keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row col-6 ms-1">
              <label
                htmlFor="category"
                className="col-2 col-form-label text-start"
              >
                Category:{" "}
              </label>
              <div className="col-10 ps-4">
                <select
                  className="form-control"
                  value={category_name}
                  onChange={(e) => setCategory_Name(e.target.value)}
                >
                  <option key="0" value="">
                    All
                  </option>
                  {categories.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="col-1 ms-2">
            <button
              type="button"
              title="Search"
              className="btn btn-info col-10"
              onClick={handleSearch}
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{ color: "white" }}
              />
            </button>
          </div>
          <div className="col-1 ">
            <button
              type="button"
              title="Product addition"
              className="btn btn-info col-10"
              onClick={handleAdd}
            >
              <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
            </button>
          </div>
          <div className="col-1 ">
            <button
              type="button"
              title="Category management"
              className="btn btn-info col-10"
              onClick={handleCategory}
            >
              <FontAwesomeIcon icon={faList} style={{ color: "white" }} />
            </button>
          </div>
        </div>
        <div className="my-3 col-12 m-auto">
          <table className="table table-hover table-bordered rounded">
            <thead>
              <tr className="table-info">
                <th scope="col">ID</th>
                <th scope="col">Product</th>
                <th scope="col">Price ($)</th>
                <th scope="col">Discount price</th>
                <th scope="col">Category</th>
                <th scope="col">Quantity</th>
                <th scope="col">Number of views</th>
                <th scope="col">Number of purchases</th>
                <th scope="col">Created date</th>
                <th scope="col">Image</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {display_products.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.discount_price}</td>
                  <td>{item.category.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.number_of_views}</td>
                  <td>{item.number_of_purchases}</td>
                  <td>{item.creation_date}</td>
                  <td>
                    <img
                      src={`../../media/${item.image}`}
                      alt={item.name}
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-info col-10 mx-2 mb-2"
                      onClick={() => {
                        handleOpenEdition(item.id);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ color: "white" }}
                      />
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger col-10 mx-2 mb-2"
                      onClick={() => {
                        handleOpenDeletion(item);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "white" }}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-end">
            <p>Total products: {products.length}</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
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
        />
      </div>
      <ProductDeletion
        show={show_deletion}
        handleClose={() => setShow_Deletion(false)}
        product={product}
      />
      {/* <ProductEdition
        show={show_edition}
        handleClose={() => setShow_Edition(false)}
        product={product}
      /> */}
    </>
  );
}
