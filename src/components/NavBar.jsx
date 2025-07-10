import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, {withCredentials: true});
      dispatch(removeUser());
      navigate("/login");
    } catch(err) {
      //resolve error if any.
    }
  }

  return (
    <div className="navbar bg-secondary text-primary-content shadow-sm">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">✨EverAfter</Link>
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="dropdown dropdown-end mx-8 flex">
          <p className="p-2">Welcome, {user.firstName}</p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="user photo"
                  src={user.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-secondary-content text-neutral rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to={"/connections"}>Connections</Link>
              </li>
              <li>
                <Link to={"/requests"}>Requests</Link>
              </li>
              <li>
                <a onClick={handleLogOut}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
