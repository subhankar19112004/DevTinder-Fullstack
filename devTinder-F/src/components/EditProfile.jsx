import React, { useState } from "react";
import {
  User,
  ImageIcon,
  BadgeInfo,
  Calendar,
  Heart,
  Pencil,
  Settings2,
} from "lucide-react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/useSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [skills, setSkills] = useState(user.skills.join(", "));
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError(""); // Clear any previous errors
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          skills,
          about,
          photoUrl,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      dispatch(addUser(res.data.data));
      setToastMessage(res.data.message || "Profile updated successfully!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full px-6 py-10 gap-8">
        {/* Edit Section */}
        <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 shadow-xl rounded-2xl border border-cyan-200 p-6">
          <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center gap-2">
            <Settings2 className="w-6 h-6" /> Edit Your Profile
          </h2>

          <div className="space-y-4">
            {/* Photo URL */}
            <div>
              <label className="flex items-center gap-2 mb-1 text-sm font-medium">
                <ImageIcon className="w-4 h-4" /> Profile Image URL
              </label>
              <input
                type="url"
                className="input input-bordered w-full"
                value={photoUrl}
                placeholder="Enter your profile image URL"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>

            {/* First Name */}
            <div>
              <label className="flex items-center gap-2 mb-1 text-sm font-medium">
                <User className="w-4 h-4" /> First Name
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={firstName}
                placeholder="Your first name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="flex items-center gap-2 mb-1 text-sm font-medium">
                <User className="w-4 h-4" /> Last Name
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={lastName}
                placeholder="Your last name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Age */}
            <div>
              <label className="flex items-center gap-2 mb-1 text-sm font-medium">
                <Calendar className="w-4 h-4" /> Age
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                value={age}
                placeholder="Your age"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="flex items-center gap-2 mb-1 text-sm font-medium">
                <Heart className="w-4 h-4" /> Gender
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={gender}
                placeholder="Male / Female / Other"
                onChange={(e) => setGender(e.target.value)}
              />
            </div>

            {/* About */}
            <div>
              <label className="flex items-center gap-2 mb-1 text-sm font-medium">
                <BadgeInfo className="w-4 h-4" /> About
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                value={about}
                placeholder="Tell something about yourself"
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            {/* Skills */}
            <div>
              <label className="flex items-center gap-2 mb-1 text-sm font-medium">
                <Pencil className="w-4 h-4" /> Skills
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={skills}
                placeholder="e.g., React, Node.js, MongoDB"
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                className="btn btn-primary w-full rounded-md"
                onClick={saveProfile}
              >
                Confirm Updates
              </button>
            </div>
          </div>
        </div>

        {/* Divider for large screens */}
        <div className="hidden md:flex items-center justify-center">
          <div className="h-[80%] w-[2px] bg-gray-300 dark:bg-gray-700"></div>
        </div>

        {/* Preview Card */}
        <div className="w-full md:w-1/2">
          <UserCard
            user={{ photoUrl, firstName, lastName, skills, about, age, gender }}
          />
        </div>
      </div>

      {/* Toast Message */}
      {showToast && (
        <div className="toast toast-end toast-middle">
          <div className="alert alert-info">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
