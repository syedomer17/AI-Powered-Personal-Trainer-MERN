import React from 'react'
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ReSetPassword = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "" });

    function handleChange(e) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(event) {
      event.preventDefault();
      setLoading(true);
      try {
        const apiUrl = "https://workout.syedomer.xyz/api/public/resetpassword";
        const response = await axios.post(apiUrl, formData);
        toast(response.data.message);
        navigate("/signin");
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        toast(errorMessage);
        console.error(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      gsap.fromTo(
        ".reset-password-form",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }, []);

    const handleFocus = (e) => {
      gsap.to(e.target, { scale: 1.05, duration: 0.3 });
    };

    const handleBlur = (e) => {
      gsap.to(e.target, { scale: 1, duration: 0.3 });
    };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="reset-password-form w-full max-w-md p-6 bg-gray-800 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-white text-center mb-6">
            Reset Password
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-400">Email</label>
              <input
                type="email"
                className="w-full p-3 mt-1 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white outline-none"
                placeholder="Enter your email"
                required
                name="email"
                onChange={handleChange}
                value={formData.email}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 mt-4 rounded-lg font-semibold transition duration-300 ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {loading ? "Sending Email..." : "Reset Password"}
            </button>
          </form>

          <p className="text-gray-400 text-center mt-4">
            Remember your password?{" "}
            <Link to="/signin" className="text-blue-400 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default ReSetPassword