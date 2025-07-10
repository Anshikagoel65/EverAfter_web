import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong...");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong...");
    }
  };

  return (
    <div className="flex justify-center my-20 mt-5">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-96 border p-6">
        <legend className="fieldset-legend text-3xl font-bold">
          {isLoginForm ? "Login" : "SignUp"}
        </legend>

        {!isLoginForm && (
          <>
            <label className="label text-xl">First Name</label>
            <input
              type="text"
              value={firstName}
              className="input h-12"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label text-xl pt-4">LastName</label>
            <input
              type="text"
              value={lastName}
              className="input h-12"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <label className="label text-xl">Email</label>
        <input
          type="email"
          value={emailId}
          className="input h-12"
          placeholder="Email"
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="label text-xl pt-4">Password</label>
        <input
          type="password"
          value={password}
          className="input h-12"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-500 pt-4 font-bold">{error}</p>
        <button
          className="btn btn-neutral mt-8 text-xl"
          onClick={isLoginForm ? handleLogin : handleSignUp}
        >
          {isLoginForm ? "Login" : "Sign Up"}
        </button>
        <p
          className="text-red-500 pt-4 text-lg font-bold cursor-pointer m-auto"
          onClick={() => setIsLoginForm((value) => !value)}
        >
          {isLoginForm
            ? "Not registered? SignUp here"
            : "Already registered? login here"}
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
