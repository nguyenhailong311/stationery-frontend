import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faTrash,
  faMoneyCheckDollar,
  faPenToSquare,
  faPlus,
  faSubtract,
  faArrowLeft,
  faArrowRight,
  faStar as faSolidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";
import ReactPaginate from "react-paginate";
import useAuthentication from "../hook/useAuthentication";
import ProductDeletion from "./ProductDeletion";
import { NavLink } from "react-router-dom";
const PRODUCT_URL = "/get-product";
const RELATED_PRODUCTS_URL = "/get-related-products";
const COMMENT_URL = "/send-comment";
const GET_EVALUATIONS_URL = "/get-evaluations-by-product";
const stars = [1, 2, 3, 4, 5];
export default function DetailedProduct() {
  const { authentication } = useAuthentication();
  const navigate = useNavigate();
  const [show_deletion, setShow_Deletion] = useState(false);
  const [show_edition, setShow_Edition] = useState(false);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState("1");
  const [related_products, setRelated_Products] = useState([]);
  const [comment, setComment] = useState("");
  const [star, setStar] = useState(0);
  const [check, setCheck] = useState(false);
  const [evaluations, setEvaluations] = useState([]);
  const [display_evaluations, setDisplay_Evaluations] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const getProduct = async () => {
    try {
      const response = await axios.get(`${PRODUCT_URL}/${id}`);
      console.log(response.data);
      setProduct(response.data);
      getRelatedProducts();
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        toast.error("No server response");
      } else {
        setProduct({});
      }
    }
  };
  const getRelatedProducts = async () => {
    try {
      const response = await axios.get(`${RELATED_PRODUCTS_URL}/${id}`);
      setRelated_Products(
        response.data.filter((item) => item.id !== Number(id)).slice(0, 4)
      );
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
    getProduct();
  }, [show_deletion]);
  const handlePlus = () => {
    if (quantity < product.quantity)
      setQuantity((quantity) => Number(quantity) + 1);
  };
  const handleSubstract = () => {
    if (quantity > 1) setQuantity((quantity) => Number(quantity) - 1);
  };
  const handleQuantity = (e) => {
    if (e.target.value === "") setQuantity("");
    else if (quantity === "" && e.target.value === "0") setQuantity("");
    else {
      if (Number(e.target.value) <= product.quantity)
        setQuantity(Number(e.target.value));
    }
  };
  const handleOpenEdition = () => {
    navigate(`/product-edition/${id}`);
  };
  const handleOpenDeletion = () => {
    setShow_Deletion(true);
  };
  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };
  const handleStar = (index) => {
    if (index + 1 === star) setStar((star) => star - 1);
    else setStar(index + 1);
  };
  const handleSend = async (e) => {
    console.log("Star: ", star);
    console.log("Comment: ", comment);
    console.log("User: ", authentication.id);
    console.log("Product: ", id);
    e.preventDefault();
    try {
      const response = await axios.post(
        COMMENT_URL,
        JSON.stringify({
          user_id: authentication.id,
          product_id: id,
          star: star,
          comment: comment,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
      setCheck((check) => !check);
      setComment("");
      setStar(0);
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        toast.error("No server response");
      } else {
        toast.error(error.response.data);
      }
    }
  };
  const getEvaluations = async () => {
    try {
      const response = await axios.get(`${GET_EVALUATIONS_URL}/${id}`);
      console.log(response.data);
      setEvaluations(response.data);
      setDisplay_Evaluations(response.data.slice(page * 5, page * 5 + 5));
      setPages(Math.ceil(response.data.length / 5));
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        toast.error("No server response");
      } else {
        setEvaluations([]);
      }
    }
  };
  useEffect(() => {
    getEvaluations();
  }, [check]);
  const handlePage = (e) => {
    const start = e.selected * 5;
    const end = start + 5;
    setDisplay_Evaluations(evaluations.slice(start, end));
    setPage(e.selected);
  };
  return (
    <>
      {isEmpty(product) ? (
        <div>
          <div className="row justify-content-center my-5">
            <div className="col-md-10">
              <div className="card m-5 p-5">
                <div className="text-center display-6 fw-bold mb-2">
                  Product not found!
                </div>
                <div className="text-center">
                  Please click the "Back to home page" button to return your
                  home page. Thank you!
                </div>
                <div className="form-group text-center">
                  <NavLink className="text-decoration-none text-info" to="/">
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      className="mx-2"
                      style={{ color: "#0dcaf0" }}
                    />
                    Back to home page
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container row">
          <div className="col col-5">
            <div className="m-auto p-4">
              <img
                src={`../../media/${product.image}`}
                className="col-12 rounded"
                alt=""
              />
            </div>
            <div className="m-auto px-4 mb-4 d-flex justify-content-between">
              <div className="ps-2">
                <p>Number of views: {product.number_of_views}</p>
              </div>
              <div className="pe-2">
                <p>Number of purchases: {product.number_of_purchases}</p>
              </div>
            </div>
          </div>
          <div className="col col-7">
            <div className="m-auto px-4 pt-4">
              <h1>{product.name}</h1>
              <p>
                <span className="fw-bold">Price:</span>&nbsp;
                {product.discount_price ? (
                  <span>
                    {product.discount_price}${" "}
                    <del className="text-danger pe-2">{product.price}$</del>
                  </span>
                ) : (
                  <span>{product.price}$</span>
                )}
              </p>
              <p>Available number of products: {product.quantity}</p>
            </div>
            <div
              className="m-auto px-4 pb-4 col-12"
              hidden={authentication?.role === "ADMIN" ? true : false}
            >
              <div className="form-group d-flex col-12">
                <label className="col-form-label me-2" htmlFor="quantity">
                  Quantity:{" "}
                </label>
                <button
                  className="btn btn-info text-white btn-sm col-1"
                  onClick={handleSubstract}
                >
                  <FontAwesomeIcon icon={faSubtract} />
                </button>
                <div className="col col-2 mx-2">
                  <input
                    type="number"
                    id="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => handleQuantity(e)}
                  />
                </div>
                <button
                  className="btn btn-info text-white btn-sm col-1"
                  onClick={handlePlus}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
            <div className="m-auto px-4 pb-4 d-flex">
              <button
                className="btn btn-info text-white col-2 me-2"
                title="Add to cart"
                hidden={authentication?.role === "ADMIN" ? true : false}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
              </button>
              <button
                className="btn btn-success text-white col-2 me-2"
                title="Buy now"
                hidden={authentication?.role === "ADMIN" ? true : false}
              >
                <FontAwesomeIcon icon={faMoneyCheckDollar} />
              </button>
              <button
                className="btn btn-info text-white col-2 me-2"
                title="Edit"
                hidden={authentication?.role === "ADMIN" ? false : true}
                onClick={handleOpenEdition}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <button
                className="btn btn-danger text-white col-2 me-2"
                title="Delete"
                hidden={authentication?.role === "ADMIN" ? false : true}
                onClick={handleOpenDeletion}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            <div className="m-auto px-4">
              <h5>Related products: </h5>
              <div className="d-flex">
                {related_products.map((item) => (
                  <>
                    <div
                      className="col-3 p-2 me-2 border rounded"
                      key={item.id}
                    >
                      <div className="card">
                        <img
                          className="card-img-top"
                          src={
                            item.image
                              ? `../../media/${item.image}`
                              : `../../media/default-image.jpg`
                          }
                          alt={`${item.name}'s image`}
                        />
                      </div>
                      <div className="card-body mt-2">
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
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
          <div
            className="col col-12 border rounded mb-2"
            hidden={authentication?.role === "USER" ? false : true}
          >
            <form className="form">
              <div className="form-group mt-3 col col-12 px-2">
                <label
                  htmlFor="comment"
                  className="cols-sm-2 control-label mb-2"
                >
                  Evaluation about the product:
                </label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <textarea
                      className="form-control"
                      name="comment"
                      id="comment"
                      placeholder="Enter your comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group my-2 col col-12 px-2 d-flex">
                <div className="col my-1">
                  <label htmlFor="comment" className="control-label">
                    Rate the product: &nbsp;
                  </label>
                  {stars.map((item, index) => (
                    <FontAwesomeIcon
                      key={index}
                      icon={index <= star - 1 ? faSolidStar : faRegularStar}
                      className="text-warning me-2"
                      onClick={() => handleStar(index)}
                    />
                  ))}
                </div>
                <div className="col-1">
                  <button
                    type="button"
                    title="Send comment"
                    className="btn btn-info text-white col-12"
                    onClick={handleSend}
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col col-12 mt-3">
            {evaluations.length === 0 ? (
              <div className="text-center">
                <p>No evaluations yet!</p>
              </div>
            ) : (
              <div className="d-flex flex-column align-items-center">
                <h4>Evaluations of the Product:</h4>
                {display_evaluations.map((evaluation, evaluation_index) => (
                  <div
                    key={evaluation_index}
                    className="col col-12 p-2 border-bottom"
                  >
                    <p><span className="fs-5 fw-bold">{evaluation.user.username} | <span className="fs-6 fw-normal">{evaluation.date} {evaluation.time}</span></span></p>
                    
                    <div>
                      {stars.map((star, star_index) => (
                        <FontAwesomeIcon
                          key={star_index}
                          icon={
                            star_index <= evaluation.rate - 1
                              ? faSolidStar
                              : faRegularStar
                          }
                          className="text-warning me-2"
                        />
                      ))}
                    </div>
                    <p>{evaluation.comment}</p>
                    
                  </div>
                ))}
                <div className="mt-2">
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
              </div>
            )}
          </div>
          <ProductDeletion
            show={show_deletion}
            handleClose={() => setShow_Deletion(false)}
            product={product}
          />
        </div>
      )}
    </>
  );
}
