

import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/resquestsSlice";
import { Link } from "react-router-dom";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai"; // Import icons from react-icons

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const user = useSelector((store) => store.user);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/" + "review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReRequests();
  }, []);

  if (requests?.length == 0) {
    return (
      <>
        <div className="font-bold text-sm flex justify-center mt-[10%] items-center text-center md:text-lg lg:text-2xl sm:text-accent text-white">
          {" "}
          Hey {user?.firstName} no requests for you 😔{" "}
        </div>
        <div className="font-bold text-sm flex justify-center items-center text-center md:text-lg lg:text-2xl sm:text-accent text-white">
          <p>
            Continue to explore{" "}
            <span className=" text-green-500 font-serif">
              <Link to={"/connections"}>your connections</Link>
            </span>{" "}
            or{" "}
            <span className=" text-red-500 font-serif">
              <Link to={"/"}>your feed</Link>
            </span>{" "}
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-3xl mb-6 border-b-2 border-green-300 rounded-md mx-50">
        Connection Requests
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 mt-30 ">
        {requests?.map((request) => {
          const { _id, firstName, lastName, photoUrl, gender, about, age } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="relative flex flex-col justify-between p-6 rounded-lg bg-base-300 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-base-400"
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img
                  alt={`${firstName} ${lastName}`}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white"
                  src={photoUrl}
                />
              </div>
              <div className="pt-16 text-center">
                <h2 className="text-white font-semibold text-xl mb-2">
                  {firstName} {lastName}
                </h2>
                <p className="text-white text-sm mb-4">{about}</p>
                <div className="flex justify-center gap-6 text-white text-sm mb-4">
                  <p>Age: {age}</p>
                  <p>Gender: {gender}</p>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <button
                    onClick={() => reviewRequest("accepted", request._id)}
                    className="bg-green-600 text-white p-2 rounded-md flex items-center gap-2 transition-all duration-300 ease-in-out hover:bg-green-500 hover:scale-105"
                  >
                    <AiOutlineCheck size={20} />
                    Accept
                  </button>
                  <button
                    onClick={() => reviewRequest("rejected", request._id)}
                    className="bg-red-600 text-white p-2 rounded-md flex items-center gap-2 transition-all duration-300 ease-in-out hover:bg-red-500 hover:scale-105"
                  >
                    <AiOutlineClose size={20} />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
