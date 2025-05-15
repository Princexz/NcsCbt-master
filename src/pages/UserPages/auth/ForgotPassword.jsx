import React, { useState } from "react";
import { Button } from "../../../components/shared/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

  const resetPassword = async (e) => {
    if(validateEmail(email)){
    console.log("Forgot password form submitted", email);
    setIsValid(true);
    setIsLoading(true);
      await axios.post("https://ncs-cbt-api.onrender.com/users/forgotPassword", {
        email,
      }).then((res) => {
        setError(res.data.message + `. Check your email for the reset link`);
        setIsLoading(false);
        setEmail("");
      }).catch((err) => {
        console.log(err);
        setIsLoading(false);
        if(err.message === "Request failed with status code 401"){
        setError(`User with ${email} does not exist`);
        }
        setEmail("");
      }
      )
  }
  else {
    setError("Enter a valid email address");
    setIsValid(false);
  }
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="bg-vector min-h-screen flex flex-col gap-2 items-center justify-center">
      <div className="w-full max-w-lg px-10 py-8 mx-8 md:mx-auto bg-secondary rounded-2xl shadow-md">
        <div className="max-w-md mx-auto space-y-3">
          <h3 className="text-3xl text-primary font-bold">Forgot Password</h3>
          <p className="text-grey mb-8">
            Please enter the email address you used to create your account
          </p>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <div>
            <label htmlFor="email address" className="block py-1 -mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                validateEmail(e.target.value);
                setEmail(e.target.value);
                if (e.target.value == "") {
                  setIsValid(false);
                  setError("Enter a valid ID");
                }
                setIsValid(true);
                setError("");
              }}
              className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary"
              placeholder="Enter your email address"
            />
          </div>
        </div>
        <div className="flex flex-col mt-10 items-center">
            <Button
              title={isLoading ? "Loading..." : "Reset Password"}
              btnStyles={`${isLoading ? "bg-grey text-secondary animate-pulse" : "bg-primary text-white"} text-lg rounded-lg shadow-sm py-4 px-4 w-full relative text-center flex justify-center items-center`}
              btnClick={resetPassword}
              disabled={isValid === false}
            />
          </div>
      </div>
      <div className="dark:text-secondary">Remember Password?
      <Link to="/login" className="text-sm dark:text-grey text-primary"> Login</Link>
      </div>
    </div>
  );
};
