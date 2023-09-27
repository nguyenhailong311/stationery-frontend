import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "react-toastify";
import useAuthentication from "../hook/useAuthentication";
const EMAIL_REGREX = /@gmail\.com$/;
const LOGIN_URL = "/log-in-user";
export default function Login() {
  const { setAuthentication } = useAuthentication();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [email_validation, setEmail_Validation] = useState(false);
  useEffect(() => {
    emailRef.current.focus();
  }, []);
  useEffect(() => {
    const check = EMAIL_REGREX.test(email);
    setEmail_Validation(check);
  }, [email]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("User logged in successfully");
      setAuthentication(response.data);
      navigate(from, { replace: true });
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
          <div className="card-header text-center display-6 fw-bold">Login</div>
          <div className="card-body">
            <form
              className="form-horizontal"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="form-group mb-3">
                <label htmlFor="email" className="cols-sm-2 control-label">
                  Email:
                </label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <input
                      ref={emailRef}
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
                  <div className="d-flex">
                    <div
                      className="rounded mt-2 text-danger px-2"
                      style={{ fontSize: "12px" }}
                      hidden={password ? true : false}
                    >
                      <p>* Password must be filled</p>
                    </div>
                    <div
                      className="rounded ms-auto mt-2 text-info px-2"
                      style={{ fontSize: "12px" }}
                    >
                      <NavLink
                        className="text-decoration-none text-info"
                        to="/forgotten-password"
                      >
                        Forgotten password?
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group col-6 m-auto">
                <button
                  type="submit"
                  className="btn btn-info text-white btn-lg btn-block login-button col-12 mb-2"
                  disabled={
                    email && email_validation && password ? false : true
                  }
                >
                  Log in
                </button>
              </div>
              <div className="form-group col-6 m-auto d-flex">
                <p className="me-2">You haven't had an account?</p>
                <NavLink
                  className="text-decoration-none text-info"
                  to="/registration"
                >
                  Registration
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
