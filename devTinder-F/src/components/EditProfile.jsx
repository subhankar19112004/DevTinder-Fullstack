import React, { useState } from "react";
import {
  User,
  ImageIcon,
  BadgeInfo,
  Calendar,
  Heart,
  Pencil,
  Settings2,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/useSlice";

const EditProfile = ({ user }) => {
  const [activeTab, setActiveTab] = useState("profile"); // "profile" | "password"

  // Profile fields
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [skills, setSkills] = useState(user.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

  // Password fields
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password visibility states
  const [showCurrPassword, setShowCurrPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const dispatch = useDispatch();

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, age, gender, skills, about, photoUrl },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      setToastMessage(res.data.message || "Profile updated successfully!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const updatePassword = async () => {
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/password`,
        { currPassword, password: newPassword },
        { withCredentials: true },
      );
      setCurrPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setToastMessage(res.data || "Password updated successfully!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full px-6 py-10 gap-8">
        {/* Edit Section */}
        <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 shadow-xl rounded-2xl border border-cyan-200 p-6 flex flex-col">
          {/* Navigation Toggle */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
            <button
              type="button"
              className={`flex-1 pb-3 text-center font-medium transition-colors flex items-center justify-center gap-2 border-b-2 ${
                activeTab === "profile"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
              onClick={() => {
                setActiveTab("profile");
                setError("");
              }}
            >
              <Settings2 className="w-4 h-4" /> Edit Profile
            </button>
            <button
              type="button"
              className={`flex-1 pb-3 text-center font-medium transition-colors flex items-center justify-center gap-2 border-b-2 ${
                activeTab === "password"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
              onClick={() => {
                setActiveTab("password");
                setError("");
              }}
            >
              <Lock className="w-4 h-4" /> Change Password
            </button>
          </div>

          {/* Profile Form View */}
          {activeTab === "profile" && (
            <div className="space-y-4">
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

              <div>
                <label className="flex items-center gap-2 mb-1 text-sm font-medium">
                  <Heart className="w-4 h-4" /> Gender
                </label>
                <select
                  className="select select-primary w-full"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="other">other</option>
                </select>
              </div>

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

              <div>
                <label className="flex items-center gap-2 mb-1 text-sm font-medium">
                  <Pencil className="w-4 h-4" /> Skills
                </label>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs bg-gray-700 backdrop-blur-xl text-white rounded-full font-medium shadow-sm flex items-center gap-1"
                    >
                      {skill}
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-200 font-bold"
                        onClick={() => removeSkill(skill)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={newSkill}
                    placeholder="Add a new skill"
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addSkill())
                    }
                  />
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={addSkill}
                  >
                    Add
                  </button>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="text-center pt-4">
                <button
                  className="btn btn-primary w-full rounded-md"
                  onClick={saveProfile}
                >
                  Confirm Updates
                </button>
              </div>
            </div>
          )}

          {/* Password Form View */}
          {activeTab === "password" && (
            <div className="space-y-4 my-auto">
              {/* Current Password */}
              <div>
                <label className="flex items-center gap-2 mb-1 text-sm font-medium">
                  <Lock className="w-4 h-4" /> Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrPassword ? "text" : "password"}
                    className="input input-bordered w-full pr-10"
                    value={currPassword}
                    placeholder="Enter current password"
                    onChange={(e) => setCurrPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                    onClick={() => setShowCurrPassword(!showCurrPassword)}
                  >
                    {showCurrPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="flex items-center gap-2 mb-1 text-sm font-medium">
                  <Lock className="w-4 h-4" /> New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className="input input-bordered w-full pr-10"
                    value={newPassword}
                    placeholder="Enter new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="flex items-center gap-2 mb-1 text-sm font-medium">
                  <Lock className="w-4 h-4" /> Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="input input-bordered w-full pr-10"
                    value={confirmPassword}
                    placeholder="Confirm new password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="text-center pt-4">
                <button
                  className="btn btn-primary w-full rounded-md"
                  onClick={updatePassword}
                >
                  Update Password
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
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
