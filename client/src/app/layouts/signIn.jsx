import React, { useState } from "react";
import { useParams } from "react-router";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const SignIn = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(type === "signup" ? type : "signin");
  const toggleFormType = () => {
    setFormType((prevState) => (prevState === "signup" ? "signin" : "signup"));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === "signup" ? (
            <>
              <h3 className="mb-4">Register</h3>
              <RegisterForm />
              <p>
                Already have an account?{" "}
                <a role="button" onClick={toggleFormType}>
                  {" "}
                  Sign In
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4">Login</h3>
              <LoginForm />
              <p>
                Don't have an account?{" "}
                <a role="button" onClick={toggleFormType}>
                  {" "}
                  Sign Up
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default SignIn;
