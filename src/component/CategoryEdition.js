import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "../api/axios";
const CATEGORY_EDITION_URL = "/edit-category";
export default function CategoryEdition(props) {
  const { show, handleClose, category } = props;
  const [name, setName] = useState("");
  useEffect(() => {
    if (show) {
      setName(category.name);
    }
  }, [category]);
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${CATEGORY_EDITION_URL}/${category.name}`,
        JSON.stringify({ name }),
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success(response.data);
      setName("");
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
            <Modal.Title>Category Edition Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="mb-3">Category: {category.name}</div>
              <div className="mb-3">
                <label className="form-label">New name: </label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
            <button className="btn btn-info" onClick={handleEdit}>
              Edit
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
