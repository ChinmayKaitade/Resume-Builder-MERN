import { Lock, Mail, User2Icon, LoaderCircleIcon } from "lucide-react";
import React from "react";
import api from "../configs/api";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();

  // Retrieves query parameters from the URL (e.g., ?state=register).
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");

  const [state, setState] = React.useState(urlState || "login");
  const [isLoading, setIsLoading] = React.useState(false); // State to control button loading/disabling

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const { data } = await api.post(`/api/users/${state}`, formData);
      dispatch(login(data));
      localStorage.setItem("token", data.token);
      toast.success(data.message);
    } catch (error) {
      // Use toast.error for explicit failure notification
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false); // Stop loading regardless of success or failure
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    // Centering container for the form
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        {/* Dynamic Title */}
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Please {state === "login" ? "login" : "sign up"} to Continue
        </p>

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

        {/* Email Input Field */}
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

        {/* Password Input Field */}
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

        {/* Primary Submit Button with Loading State */}
        <button
          type="submit"
          disabled={isLoading} // Disable button while loading
          className="mt-2 w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity flex items-center justify-center"
        >
          {isLoading ? (
            <>
              {/* Show spinner when loading */}
              <LoaderCircleIcon className="animate-spin size-4 mr-2" />
              Please Wait...
            </>
          ) : state === "login" ? (
            "Login"
          ) : (
            "Sign up"
          )}
        </button>

        {/* State Toggle Link */}
        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-gray-500 text-sm mt-3 mb-11 cursor-pointer"
        >
          {/* Dynamic question and link */}
          {state === "login"
            ? "Don't have an Account?"
            : "Already have an Account?"}{" "}
          <a href="#" className="text-green-500 hover:underline">
            Click Here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
