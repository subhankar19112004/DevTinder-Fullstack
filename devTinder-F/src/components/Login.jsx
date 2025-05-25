import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/useSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { BadgeInfo, Calendar, Heart, ImageIcon, Pencil, Settings2, User } from "lucide-react";


const Login = () => {
  const [emailId, setEmailId] = useState("sahoo18@gmail.com");
  const [password, setPassword] = useState("Papun@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const [skills, setSkills] = useState("");
    const [newSkill, setNewSkill] = useState(""); 
  

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password
      }, { withCredentials: true })
      console.log(res.data);
      dispatch(addUser(res.data));
      navigate("/");
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
    <>
       {/* login */}
      <div className=" flex justify-center my-10 ">
        <div className="card card-border border-cyan-200 bg-base-100 w-96 rounded-md shadow-2xl/30  shadow-blue-400">
          <div className="card-body">
            <h2 className="card-title justify-center" >Login</h2>
            <div className="flex flex-col">
              {/* email */}
              <label className=" w-full max-w-xs">
                <div className="label">
                  <span className=" label-text">Email ID</span>
                </div>
                <label className="input validator">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                  </svg>
                  <input
                    type="email"
                    value={emailId}
                    placeholder="mail@site.com"
                    onChange={(e) => {
                      setEmailId(e.target.value);
                    }}
                  />
                </label>
                <div className="validator-hint hidden">
                  Enter valid email address
                </div>
              </label>

              {/* password */}
              <label className=" form-control w-full max-w-xs py-4">
                <div className="label">
                  <span className=" label-text">Password</span>
                </div>
                <label className="input validator">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                      <circle
                        cx="16.5"
                        cy="7.5"
                        r=".5"
                        fill="currentColor"
                      ></circle>
                    </g>
                  </svg>
                  <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  />
                </label>
              </label>


            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
              <button
                onClick={handleLogin}
                className="btn btn-neutral btn-outline text-white">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>





    {/* signup */}

      <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 shadow-xl rounded-2xl border border-cyan-200 p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center gap-2">
          <Settings2 className="w-6 h-6" /> Sign Up
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
              value="{photoUrl}"
              placeholder="Enter your profile image URL"
              
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
              value="{firstName}"
              placeholder="Your first name"
              
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
              value="{lastName}"
              placeholder="Your last name"
             
            />
          </div>

          {/* email Id */}
          <div>
            <label className="flex items-center gap-2 mb-1 text-sm font-medium">
              <ImageIcon className="w-4 h-4" /> Enter Email ID
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              value="{photoUrl}"
              placeholder="Enter your profile image URL"
              
            />
          </div>

          {/* Password */}
          <div>
            <label className="flex items-center gap-2 mb-1 text-sm font-medium">
              <ImageIcon className="w-4 h-4" /> Enter a strong Password
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              value="{photoUrl}"
              placeholder="Enter your profile image URL"
              
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
              value="{age}"
              placeholder="Your age"
              
            />
          </div>

          {/* Gender */}
          <div>
            <label className="flex items-center gap-2 mb-1 text-sm font-medium">
              <Heart className="w-4 h-4" /> Gender
            </label>
            <select
              className="select select-primary w-full"
              value="{gender}"
              
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </select>
          </div>

          {/* About */}
          <div>
            <label className="flex items-center gap-2 mb-1 text-sm font-medium">
              <BadgeInfo className="w-4 h-4" /> About
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              value="{about}"
              placeholder="Tell something about yourself"
              
            />
          </div>

          {/* Skills */}
          <div>
            <label className="flex items-center gap-2 mb-1 text-sm font-medium">
              <Pencil className="w-4 h-4" /> Skills
            </label>
            <div className="flex flex-wrap gap-2">
              {/* {skills.map((skill, index) => (
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
              ))} */}
            </div>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                className="input input-bordered w-full"
                value={newSkill}
                placeholder="Add a new skill"
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={addSkill}
              >
                Add Skill
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              className="btn btn-primary w-full rounded-md"
              // onClick={saveProfile}
            >
              Confirm Updates
            </button>
          </div>
        </div>
      </div>
    </>


  );
};

export default Login;
