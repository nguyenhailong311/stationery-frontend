import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "../api/axios";
const CATEGORY_ADDITION_URL = "/add-category";
export default function CategoryAddition(props) {
  const { show, handleClose } = props;
  const [name, setName] = useState("");
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        CATEGORY_ADDITION_URL,
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
            <Modal.Title>Category Addition Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="mb-2">
                <label className="form-label">Name: </label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div
                className="rounded text-danger px-2"
                style={{ fontSize: "12px" }}
                hidden={name ? true : false}
              >
                <p>* Name must be filled</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
            <button
              className="btn btn-info"
              onClick={handleAdd}
              disabled={name ? false : true}
            >
              Add
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
