import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (feed?.length === 0) {
    return (
      <>
        <div className="font-bold text-sm flex justify-center mt-[10%] items-center text-center md:text-lg lg:text-2xl sm:text-accent text-white">
          Hey {user?.firstName} ufff... no users left for you as of now 😔
        </div>
        <div className="font-bold text-sm flex justify-center items-center text-center md:text-lg lg:text-2xl sm:text-accent text-white">
          <p>
            Continue to explore{" "}
            <span className="text-green-500 font-serif">
              <Link to={"/connections"}>your connections</Link>
            </span>{" "}
            or{" "}
            <span className="text-red-500 font-serif">
              <Link to={"/requests"}>your requests</Link>
            </span>{" "}
          </p>
        </div>
      </>
    );
  }

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
