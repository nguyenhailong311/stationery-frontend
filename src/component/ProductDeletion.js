import React from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "../api/axios";
const PRODUCT_DELETION_URL = "/delete-product";
export default function ProductDeletion(props) {
  const { show, handleClose, product } = props;
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${PRODUCT_DELETION_URL}/${product.id}`
      );
      toast.success(response.data);
      handleClose();
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        toast.error("No server response");
      } else {
        toast.error(error.response.data);
      }
    }
  };
  return (
    <>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Product Deletion Alert!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <p>
                Do you really want to delete this{" "}
                <span className="fw-bold">{product.name}</span> product?
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
            <button className="btn btn-info" onClick={handleDelete}>
              Delete
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
