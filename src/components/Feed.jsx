import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard_Temp";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed?.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      //handle error.
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed?.length > 0 ? (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    ) : null
  );
};

export default Feed;
