import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoURL, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequests = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      //handle error.
    }
  };
  return (
    <div>
      <div className="card bg-secondary-content w-96 shadow-sm mb-20">
        <figure>
          <img src={photoURL} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-xl font-bold">
            {firstName + " " + lastName}
          </h2>
          {age && gender && <p className="text-lg">{age + ", " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button
              type="submit"
              className="btn btn-primary text-lg font-bold"
              onClick={(e) => {
                e.preventDefault();
                handleSendRequests("ignored", _id);
              }}
            >
              Ignore
            </button>
            <button
              type="submit"
              className="btn btn-secondary text-lg font-bold"
              onClick={(e) => {
                e.preventDefault();
                handleSendRequests("interested", _id);
              }}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
