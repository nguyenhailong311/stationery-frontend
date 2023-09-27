import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "../api/axios";
const CATEGORY_DELETION_URL = "/delete-category";
export default function CategoryDeletion(props) {
  const { show, handleClose, category } = props;
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${CATEGORY_DELETION_URL}/${category.name}`
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
            <Modal.Title>Category Deletion Alert!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <p>
                Do you really want to delete this{" "}
                <span className="fw-bold">{category.name}</span> category?
              </p>
              <p>
                <span className="text-danger fw-bold">Be careful!</span> This
                action will affect to products relating to the category.
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
