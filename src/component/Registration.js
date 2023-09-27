import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "react-toastify";
const PASSWORD_REGREX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const EMAIL_REGREX = /@gmail\.com$/;
const REGISTRATION_URL = "/register-user";
export default function Registration() {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const [email_validation, setEmail_Validation] = useState(false);
  const [password_validation, setPassword_Validation] = useState(false);
  const [password_matching, setPassword_Matching] = useState(false);
  useEffect(() => {
    usernameRef.current.focus();
  }, []);
  useEffect(() => {
    const check = EMAIL_REGREX.test(email);
    setEmail_Validation(check);
  }, [email]);
  useEffect(() => {
    const check = PASSWORD_REGREX.test(password);
    setPassword_Validation(check);
  }, [password]);
  useEffect(() => {
    const check = password === confirm_password;
    setPassword_Matching(check);
  }, [password, confirm_password]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        REGISTRATION_URL,
        JSON.stringify({ username, email, password }),
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success(response.data);
      navigate("/login");
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
    <div className="row justify-content-center my-5">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header text-center display-6 fw-bold">
            Registration Form
          </div>
          <div className="card-body">
            <form
              className="form-horizontal"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="form-group mb-3">
                <label htmlFor="name" className="cols-sm-2 control-label">
                  Username:
                </label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <input
                      ref={usernameRef}
                      type="text"
                      className="form-control"
                      name="username"
                      id="username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div
                    className="rounded mt-2 text-danger px-2"
                    style={{ fontSize: "12px" }}
                    hidden={username ? true : false}
                  >
                    <p>* Username must be filled</p>
                  </div>
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email" className="cols-sm-2 control-label">
                  Email:
                </label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div
                    className="rounded mt-2 text-danger px-2"
                    style={{ fontSize: "12px" }}
                    hidden={email && email_validation ? true : false}
                  >
                    <p>* Email doesn't match with the default format</p>
                  </div>
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="username" className="cols-sm-2 control-label">
                  Password:
                </label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div
                    className="rounded mt-2 text-danger px-2"
                    style={{ fontSize: "12px" }}
                    hidden={password && password_validation ? true : false}
                  >
                    <p>
                      * Password must have at least 8 characters, and include
                      both letters and digits
                    </p>
                  </div>
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="confirm" className="cols-sm-2 control-label">
                  Confirm password:
                </label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <input
                      type="password"
                      className="form-control"
                      name="confirm_password"
                      id="confirm_password"
                      placeholder="Enter your password again"
                      value={confirm_password}
                      onChange={(e) => setConfirm_Password(e.target.value)}
                    />
                  </div>
                  <div
                    className="rounded mt-2 text-danger px-2"
                    style={{ fontSize: "12px" }}
                    hidden={
                      password && confirm_password && password_matching
                        ? true
                        : false
                    }
                  >
                    <p>* Password doesn't match</p>
                  </div>
                </div>
              </div>
              <div className="form-group col-6 m-auto">
                <button
                  type="submit"
                  className="btn btn-info text-white btn-lg btn-block login-button col-12 mb-2"
                  disabled={
                    username &&
                    email &&
                    email_validation &&
                    password &&
                    password_validation &&
                    confirm_password &&
                    password_matching
                      ? false
                      : true
                  }
                >
                  Register
                </button>
              </div>
              <div className="form-group col-6 m-auto d-flex">
                <p className="me-3">You have already had an account?</p>
                <NavLink className="text-decoration-none text-info" to="/login">
                  Login
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
