import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/features/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutUser = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    <div className="shadow bg-white">
      {/* Navigation container: Ensures max width and centers content. */}
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all">
        {/* Logo Link: Always redirects to the home page (/). */}
        <Link to="/">
          <img
            src="/logo.svg"
            alt="Resume Builder Logo"
            className="w-11 w-auto"
          />
        </Link>

        {/* User Info and Action Buttons */}
        <div className="flex items-center gap-4 text-sm">
          {/* User Greeting: Dynamically displays the user's name (hidden on small screens). */}
          <p className="max-sm:hidden">Hi, {user?.name}</p>

          {/* Logout Button: Triggers the logout handler */}
          <button
            onClick={logoutUser}
            className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
