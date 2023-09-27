import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CategoryAddition from "./CategoryAddition";
import { useParams, useNavigate } from "react-router-dom";
const PRODUCT_EDITION_URL = "/edit-product";
const CATEGORIES_URL = "/get-categories";
const PRODUCT_URL = "/get-product";
export default function ProductEdition(props) {
  // const { show, handleClose, product } = props;
  const { id } = useParams();
  const nameRef = useRef();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discount_price, setDiscount_Price] = useState(0);
  const [category_name, setCategory_Name] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [show_addition, setShow_Addition] = useState(false);
  const [product, setProduct] = useState({});
  const getProduct = async () => {
    try {
      const response = await axios.get(`${PRODUCT_URL}/${id}`);
      console.log(response.data);
      console.log(response.data.category.name);
      setProduct(response.data);
      setName(response.data.name);
      setPrice(response.data.price);
      setDiscount_Price(response.data.discount_price);
      setCategory_Name(response.data.category.name);
      setQuantity(response.data.quantity);
      setImage(response.data.image);
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        toast.error("No server response");
      } else {
        setProduct({});
      }
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  useEffect(() => {
    getCategories();
  }, [show_addition]);
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
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${PRODUCT_EDITION_URL}/${product.id}`,
        JSON.stringify({
          name,
          price,
          discount_price,
          category_name,
          quantity,
          image,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success(response.data);
      navigate(-1);
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        toast.error("No server response");
      } else {
        toast.error(error.response.data);
      }
    }
  };
  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  return (
    <>
      <div className="row justify-content-center my-5">
        <div className="col-md-10">
          <div className="card">
            <div className="card-header text-center display-6 fw-bold">
              Product Edition Form
            </div>
            <div className="card-body">
              <form
                className="form-horizontal"
                method="post"
              >
                <div className="form-group mb-3">
                  <label htmlFor="name" className="cols-sm-2 control-label">
                    Name:
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <input
                        ref={nameRef}
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        placeholder="Enter product's name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div
                      className="rounded mt-2 text-danger px-2"
                      style={{ fontSize: "12px" }}
                      hidden={name ? true : false}
                    >
                      <p>* Name must be filled</p>
                    </div>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="price" className="cols-sm-2 control-label">
                    Price:
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        id="price"
                        placeholder="Enter product's price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div
                      className="rounded mt-2 text-danger px-2"
                      style={{ fontSize: "12px" }}
                      hidden={price ? true : false}
                    >
                      <p>* Price must be filled</p>
                    </div>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label
                    htmlFor="discount-price"
                    className="cols-sm-2 control-label"
                  >
                    Discount price:
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        name="discount-price"
                        id="discount-price"
                        placeholder="Enter product's discount price"
                        value={discount_price}
                        onChange={(e) => setDiscount_Price(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="quantity" className="cols-sm-2 control-label">
                    Quantity:
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        id="quantity"
                        placeholder="Enter product's quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>
                    <div
                      className="rounded mt-2 text-danger px-2"
                      style={{ fontSize: "12px" }}
                      hidden={quantity ? true : false}
                    >
                      <p>* Quantity must be filled</p>
                    </div>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="confirm" className="cols-sm-2 control-label">
                    Category:
                  </label>
                  <div className="cols-sm-10 d-flex">
                    <div className="input-group me-2">
                      <select
                        className="form-control"
                        value={category_name}
                        onChange={(e) => setCategory_Name(e.target.value)}
                      >
                        <option key="0" value="">
                          None
                        </option>
                        {categories.map((item) => (
                          <option key={item.id} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => setShow_Addition(true)}
                      >
                        <FontAwesomeIcon
                          icon={faPlus}
                          className="mx-2 text-white"
                        />
                      </button>
                    </div>
                  </div>
                  <div
                    className="rounded mt-2 text-danger px-2"
                    style={{ fontSize: "12px" }}
                    hidden={!category_name ? false : true}
                  >
                    <p>* Category must be chosen</p>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="image" className="cols-sm-2 control-label">
                    Image:
                  </label>
                  <div className="cols-sm-10">
                    <div className="row d-flex align-items-center">
                      <div className="col-10">
                        <input
                          type="file"
                          className="form-control"
                          name="image"
                          id="image"
                          placeholder="Enter product's image"
                          onChange={(e) => setImage(e.target.files[0].name)}
                        />
                      </div>
                      <div className="col-2">
                        <img
                          src={!image ? `../../media/default-image.jpg` : `../../media/${image}`}
                          alt="Product's image"
                          style={{ width: "150px" }}
                        />
                      </div>
                    </div>
                    <div
                      className="rounded mt-2 text-danger px-2"
                      style={{ fontSize: "12px" }}
                      hidden={!image ? false : true}
                    >
                      <p>* Image must be chosen</p>
                    </div>
                  </div>
                </div>
                <div className="form-group col-6 m-auto">
                  <button
                    type="button"
                    className="btn btn-info text-white btn-lg btn-block login-button col-12 mb-2"
                    disabled={
                      name &&
                      price &&
                      quantity &&
                      category_name !== "" &&
                      image !== ""
                        ? false
                        : true
                    }
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                </div>
                <div className="form-group text-center">
                  <button
                    type="button"
                    className="text-info"
                    onClick={handleBack}
                  >
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      className="mx-2"
                      style={{ color: "#0dcaf0" }}
                    />
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <CategoryAddition show={show_addition} handleClose={() => setShow_Addition(false)} />
    </>
  );
}
