import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/useSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";


const Login = () => {
  const [emailId, setEmailId] = useState("sahoo18@gmail.com");
  const [password, setPassword] = useState("Papun@123");
  const [error,setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
      emailId,
      password    
    }, { withCredentials:true})
    console.log(res.data);
    dispatch(addUser(res.data));
    navigate("/");  
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  }; 

  return (
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
  );
};

export default Login;
