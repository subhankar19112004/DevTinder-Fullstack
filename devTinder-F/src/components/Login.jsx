import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/useSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toastify
import { BadgeInfo, Calendar, Heart, ImageIcon, Pencil, Settings2, User } from "lucide-react";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and signup
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");  // Optional field
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");  // Optional field
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", { emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    // Log the data being sent
    const signUpData = {
      emailId,
      password,
      firstName,
      lastName,
      photoUrl,  // Optional field
      age,
      gender,
      about,  // Optional field
      skills
    };

    try {
      const res = await axios.post(BASE_URL + "/signup", signUpData);

      // Show success toast
      toast.success("Sign-up successful! Redirecting to login...");

      // After success, toggle to Login and redirect after 2 seconds
      setTimeout(() => {
        setIsSignUp(false);  // Toggle to show login view
        navigate("/login");  // Redirect to login page
      }, 2000);  // 2 seconds delay to show the toast
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill(""); // Clear the input field after adding the skill
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border border-cyan-200 bg-base-100 w-96 rounded-md shadow-2xl/30 shadow-blue-400">
        <div className="card-body">
          <h2 className="card-title justify-center">{isSignUp ? "Sign Up" : "Login"}</h2>

          <div className="flex flex-col">
            {/* Email */}
            <label className="w-full max-w-xs">
              <span className="label-text">Email ID</span>
              <input
                type="email"
                value={emailId}
                placeholder="mail@site.com"
                onChange={(e) => setEmailId(e.target.value)}
                className="input"
              />
            </label>

            {/* Password */}
            <label className="form-control w-full max-w-xs py-4">
              <span className="label-text">Password</span>
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="input"
              />
            </label>

            {/* Show SignUp Fields if isSignUp is true */}
            {isSignUp && (
              <>
                {/* First Name */}
                <label className="w-full max-w-xs py-4">
                  <span className="label-text">First Name</span>
                  <input
                    type="text"
                    value={firstName}
                    placeholder="Your first name"
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input"
                  />
                </label>

                {/* Last Name */}
                <label className="w-full max-w-xs py-4">
                  <span className="label-text">Last Name</span>
                  <input
                    type="text"
                    value={lastName}
                    placeholder="Your last name"
                    onChange={(e) => setLastName(e.target.value)}
                    className="input"
                  />
                </label>

                {/* Profile Image URL (Optional) */}
                <label className="w-full max-w-xs py-4">
                  <span className="label-text">Profile Image URL</span>
                  <input
                    type="url"
                    value={photoUrl}
                    placeholder="Profile Image URL (optional)"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="input"
                  />
                </label>

                {/* Age */}
                <label className="w-full max-w-xs py-4">
                  <span className="label-text">Age</span>
                  <input
                    type="number"
                    value={age}
                    placeholder="Your age"
                    onChange={(e) => setAge(e.target.value)}
                    className="input"
                  />
                </label>

                {/* Gender */}
                <label className="w-full max-w-xs py-4">
                  <span className="label-text">Gender</span>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="input"
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                {/* About (Optional) */}
                <label className="w-full max-w-xs py-4">
                  <span className="label-text">About</span>
                  <textarea
                    value={about}
                    placeholder="Tell something about yourself (optional)"
                    onChange={(e) => setAbout(e.target.value)}
                    className="textarea"
                  />
                </label>

                {/* Skills */}
                <label className="w-full max-w-xs py-4">
                  <span className="label-text">Skills</span>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs bg-gray-700 backdrop-blur-xl text-white rounded-full font-medium shadow-sm"
                      >
                        {skill}
                        <button
                          type="button"
                          className="ml-2 text-sm text-red-500"
                          onClick={() => removeSkill(skill)}
                        >
                          x
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      placeholder="Add a new skill"
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addSkill()}
                      className="input"
                    />
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={addSkill}
                    >
                      Add Skill
                    </button>
                  </div>
                </label>
              </>
            )}
          </div>

          <p className="text-red-500">{error}</p>

          <div className="card-actions justify-center">
            <button
              onClick={isSignUp ? handleSignUp : handleLogin}
              className="btn btn-neutral btn-outline text-white"
            >
              {isSignUp ? "Register" : "Login"}
            </button>
          </div>

          {/* Toggle between Login and SignUp */}
          <div className="text-center mt-4">
            <span
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-500 cursor-pointer"
            >
              {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </span>
          </div>
        </div>
      </div>

      {/* React Toastify container */}
      <ToastContainer /> {/* Correctly placed ToastContainer here */}
    </div>
  );
};

export default Login;
