import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("anshikagoel@gmail.com");
  const [password, setPassword] = useState("Anshika@123");
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

  return (
    <div className="flex justify-center my-20 ">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-96 border p-6">
        <legend className="fieldset-legend text-3xl font-bold">Login</legend>

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
        <button className="btn btn-neutral mt-8 text-xl" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
