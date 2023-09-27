import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { MDBFooter, MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";
const CATEGORIES_URL = "/get-categories";
export default function Footer() {
  const [categories, setCategories] = useState([]);
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
    getCategories();
  }, [categories]);
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-left">
      <MDBContainer className="p-4">
        <MDBRow>
          <MDBCol lg="3" sm="12" className="mb-4 mb-md-0">
            <h5 className="text-uppercase">ABOUT US</h5>
            <p className="text-justify">
              At STATIONERY, we're passionate about bringing creativity,
              organization, and quality to your daily life through our extensive
              range of stationery products. We understand that stationery isn't
              just about pens and paper; it's about expressing yourself, staying
              productive, and making everyday tasks enjoyable.
            </p>
          </MDBCol>
          <MDBCol lg="6" sm="12" className="mb-4 mb-md-0">
            <h5 className="text-uppercase">CATEGORIES</h5>
            <div className="d-flex flex-wrap">
              {categories.map((item, index) => (
                <div className="col-4">
                  <ul className="list-unstyled mb-0">
                    <li>
                      {item.name}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </MDBCol>
          <MDBCol lg="3" sm="12" className="mb-4 mb-md-0">
            <h5 className="text-uppercase">CONTACTS</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a
                  className="text-decoration-none text-info"
                  href="https://www.facebook.com/hailong310101/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  className="text-decoration-none text-info"
                  href="https://www.instagram.com/cardinal310101/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  className="text-decoration-none text-info"
                  href="https://www.tiktok.com/@hailong310101/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tiktok
                </a>
              </li>
              <li>
                <a
                  className="text-decoration-none text-info"
                  href="https://twitter.com/cardinal310101/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="text-center p-3 bg-secondary">
        <span className="text-white">&copy; Copyright: </span>
        <a
          className="text-info text-decoration-none"
          href="https://www.facebook.com/hailong310101/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Xerise Company
        </a>
      </div>
    </MDBFooter>
  );
}
