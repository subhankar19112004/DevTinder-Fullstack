import React from "react";
import { ImCross } from "react-icons/im";
import { PiHeartStraightFill } from "react-icons/pi";
import {
  FaUser,
  FaInfoCircle,
  FaCode,
  FaVenusMars,
  FaBirthdayCake,
} from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, photoUrl, firstName, lastName, skills, about, age, gender } = user;

  const handleUserClick = async (status, id) => {
    try {
      const res = await axios.post(BASE_URL
        + "/request/send/" + status + "/" + id,
        {},
        {
          withCredentials: true,
        }
      )
      dispatch(removeUserFromFeed(id));
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="max-w-sm w-full mx-auto rounded-2xl overflow-hidden shadow-lg bg-base-300 border border-blue-300 hover:shadow-pink-400 transition duration-300">

      {/* Profile Image */}
      <figure className="w-full h-64 overflow-hidden">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover object-center"
        />
      </figure>

      {/* Card Content */}
      <div className="p-5 bg-secondary text-white rounded-b-2xl">

        {/* Name */}
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-3">
          <FaUser className="text-pink-400" />
          {firstName} {lastName}
        </h2>

        {/* Age and Gender */}
        {(age || gender) && (
          <div className="flex items-center gap-3 text-blue-300 mb-3 text-sm">
            {age && (
              <>
                <FaBirthdayCake className="text-yellow-300" />
                <span>{age} years</span>
              </>
            )}
            {gender && (
              <>
                <FaVenusMars className="text-pink-400 ml-2" />
                <span className="uppercase">{gender}</span>
              </>
            )}
          </div>
        )}

        {/* Skills */}
        {skills && (
          <div className="mb-3">
            <div className="flex items-center gap-2 text-sm text-blue-200 mb-1">
              <FaCode className="text-green-300" />
              <span className="font-semibold text-white">Skills</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(Array.isArray(skills) ? skills : skills.split(",")).map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs bg-gray-700 backdrop-blur-xl text-white rounded-full font-medium shadow-sm"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}


        {/* About */}
        {about && (
          <div className="flex items-start gap-2 text-sm text-white mb-4">
            <FaInfoCircle className="text-indigo-300 mt-1" />
            <p>{about}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between mt-4">
          <button onClick={() => handleUserClick("ignored", _id)}
            className="bg-red-300 hover:bg-red-400 p-2 rounded-full border-2 border-red-400 shadow-md transition-transform hover:scale-105">
            <ImCross className="h-5 w-5 text-red-700" />
          </button>
          <button
            onClick={() => handleUserClick("interested", _id)}
            className="bg-pink-400 hover:bg-pink-500 p-2 rounded-full border-2 border-pink-500 shadow-md transition-transform hover:scale-105">
            <PiHeartStraightFill className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
