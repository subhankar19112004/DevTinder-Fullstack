import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="navbar bg-gray-800 text-white px-4 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">DevTinder💡</a>
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
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
