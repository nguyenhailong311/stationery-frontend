import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, NavLink } from "react-router-dom";
import CategoryAddition from "./CategoryAddition";
const CATEGORIES_URL = "/get-categories";
const PRODUCT_ADDITION_URL = "/add-product";
const ProductAddition = () => {
  const navigate = useNavigate();
  const nameRef = useRef();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discount_price, setDiscount_Price] = useState(0);
  const [category_name, setCategory_Name] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    nameRef.current.focus();
  }, []);
  useEffect(() => {
    getCategories();
  }, [show]);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        PRODUCT_ADDITION_URL,
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
      console.log(response);
      navigate("/product-management");
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        toast.error("No server response");
      } else {
        toast.error(error.response.data);
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="row justify-content-center my-5">
        <div className="col-md-10">
          <div className="card">
            <div className="card-header text-center display-6 fw-bold">
              Product Addition Form
            </div>
            <div className="card-body">
              <form
                className="form-horizontal"
                method="post"
                onSubmit={handleSubmit}
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
                        onClick={() => setShow(true)}
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
                    type="submit"
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
                  >
                    Add
                  </button>
                </div>
                <div className="form-group text-center">
                  <NavLink
                    className="text-decoration-none text-info"
                    to="/product-management"
                  >
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      className="mx-2"
                      style={{ color: "#0dcaf0" }}
                    />
                    Back to management
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <CategoryAddition show={show} handleClose={() => setShow(false)} />
    </>
  );
};
export default ProductAddition;
