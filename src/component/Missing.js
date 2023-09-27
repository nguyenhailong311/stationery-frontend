import React from "react";
import { NavLink } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Missing() {
  return (
    <div>
      <div className="row justify-content-center my-5">
        <div className="col-md-10">
          <div className="card m-5 p-5">
            <div className="text-center display-6 fw-bold mb-2">
              Missing page!
            </div>
            <div className="text-center">
              Please click the "Back to home page" button to return your home
              page. Thank you!
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
  );
}
