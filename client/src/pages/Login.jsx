import { Lock, Mail, User2Icon } from "lucide-react";
import React from "react";
import api from "../configs/api";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();

  // Retrieves query parameters from the URL (e.g., ?state=register).
  const query = new URLSearchParams(window.location.search);
  // Extracts the 'state' parameter value (e.g., 'login' or 'register').
  const urlState = query.get("state");

  // State to control the form's mode: 'login' or 'register'.
  // Defaults to the URL state if present, otherwise defaults to 'login'.
  const [state, setState] = React.useState(urlState || "login");

  // State to hold form data (Name, Email, Password).
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/api/users/${state}`, formData);
      dispatch(login(data));
      localStorage.setItem("token", data.token);
      toast.success(data.message);
    } catch (error) {
      toast(error?.response?.data?.message || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Uses the input's 'name' attribute dynamically to update the state key.
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    // Centering container for the form
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        {/* Dynamic Title based on current state ('Login' or 'Sign up') */}
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>
        {/* Dynamic subtitle */}
        <p className="text-gray-500 text-sm mt-2">Please {state} to Continue</p>

        {/* Name Input Field: Only rendered in 'Sign up' mode */}
        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User2Icon size={16} color="#6B7280" />

            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-none outline-none ring-0"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Email Input Field (Visible in both modes) */}
        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail size={13} color="#6B7280" />

          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="border-none outline-none ring-0"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Input Field (Visible in both modes) */}
        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock size={13} color="#6B7280" />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-none outline-none ring-0"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Forget Password Link/Button */}
        <div className="mt-4 text-left text-green-500">
          <button className="text-sm" type="reset">
            Forget Password?
          </button>
        </div>

        {/* Primary Submit Button (Dynamic text) */}
        <button
          type="submit"
          className="mt-2 w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity"
        >
          {state === "login" ? "Login" : "Sign up"}
        </button>

        {/* State Toggle Link: Switches between 'login' and 'register' modes */}
        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-gray-500 text-sm mt-3 mb-11"
        >
          {/* Dynamic question and link */}
          {state === "login"
            ? "Don't have an Account?"
            : "Already have an Account?"}{" "}
          {/*
            SUGGESTION: For better accessibility and SEO, consider using a
            <Link to={...} /> from React Router or a full <a> tag with a calculated
            href here, instead of just <a> with href="#".
          */}
          <a href="#" className="text-green-500 hover:underline">
            Click Here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
