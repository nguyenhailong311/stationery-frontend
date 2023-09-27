import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowLeft,
  faPlus,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import CategoryAddition from "./CategoryAddition";
import { toast } from "react-toastify";
import axios from "../api/axios";
import ReactPaginate from "react-paginate";
import CategoryDeletion from "./CategoryDeletion";
import CategoryEdition from "./CategoryEdition";
const CATEGORIES_URL = "/get-categories";
const CATEGORIES_SEARCH_URL = "/search-categories";
export default function CategoryManagement() {
  const navigate = useNavigate();
  const [show_addition, setShow_Addition] = useState(false);
  const [show_deletion, setShow_Deletion] = useState(false);
  const [show_edition, setShow_Edition] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [display_categories, setDisplay_Categories] = useState([]);
  const [search_categories, setSearch_Categories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const handleBack = () => {
    navigate("/product-management");
  };
  const getCategories = async () => {
    try {
      const response = await axios.get(CATEGORIES_URL);
      setCategories(response.data);
      setSearch_Categories(response.data);
      setDisplay_Categories(response.data.slice(page * 10, page * 10 + 10));
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
  useEffect(() => {
    getCategories();
  }, [show_addition, show_deletion, show_edition]);
  const handlePage = (e) => {
    const start = e.selected * 10;
    const end = start + 10;
    setDisplay_Categories(search_categories.slice(start, end));
    setPage(e.selected);
  };
  const handleSearch = async (e) => {
    const searchedCategories = categories.filter((item) => item.name.includes(keyword));
    setSearch_Categories(searchedCategories)
    setDisplay_Categories(searchedCategories.slice(0, 10));
    setPages(Math.ceil(searchedCategories.length / 10));
    setPage(0);
  };
  const handleOpenEdition = (item) => {
    setCategory(item);
    setShow_Edition(true);
  };
  const handleOpenDeletion = (item) => {
    setCategory(item);
    setShow_Deletion(true);
  };
  return (
    <>
      <div className="container text-center m-3">
        <div className="display-6 fw-bold m-2">Categories Management</div>
        <div className="d-flex justify-content-center align-items-center col-10 mx-auto my-3">
          <div className="form-group row col-9">
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
              onClick={() => setShow_Addition(true)}
            >
              <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
            </button>
          </div>
          <div className="col-1 ">
            <button
              type="button"
              title="Back to product management"
              className="btn btn-info col-10"
              onClick={handleBack}
            >
              <FontAwesomeIcon icon={faArrowLeft} style={{ color: "white" }} />
            </button>
          </div>
        </div>
        <div className="my-3 col-8 m-auto">
          <table className="table table-hover table-bordered rounded">
            <thead>
              <tr className="table-info">
                <th scope="col">ID</th>
                <th scope="col">Category</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {display_categories.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-info col-2 mx-2"
                      onClick={() => handleOpenEdition(item)}
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ color: "white" }}
                      />
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger col-2 mx-2"
                      onClick={() => handleOpenDeletion(item)}
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
            <p>Total categories: {display_categories.length}</p>
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
          forcePage={page}
        />
      </div>
      <CategoryAddition
        show={show_addition}
        handleClose={() => setShow_Addition(false)}
      />
      <CategoryDeletion
        show={show_deletion}
        handleClose={() => setShow_Deletion(false)}
        category={category}
      />
      <CategoryEdition
        show={show_edition}
        handleClose={() => setShow_Edition(false)}
        category={category}
      />
    </>
  );
}
