import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { removrUser } from '../utils/useSlice';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      await axios.post(BASE_URL + "/logout",{}, {
        withCredentials: true
      });
      dispatch(removrUser() );
      return navigate("/login");

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="navbar bg-gray-800 text-white px-4 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">DevTinder💡</Link>
      </div>

      {user && (
        <div className="flex items-center gap-3">
          {/* Welcome Text */}
          <p className="hidden sm:block text-sm sm:text-base">
            Welcome, {user.firstName}
          </p>

          {/* Dropdown Menu */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-9 sm:w-10 rounded-full overflow-hidden">
                <img
                  alt={`${user.firstName}'s photo`}
                  src={user.photoUrl}
                  className="object-cover"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-10 z-[1] p-2 shadow bg-gray-900 rounded-md rounded-box w-44 text-white"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><a>Settings</a></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
