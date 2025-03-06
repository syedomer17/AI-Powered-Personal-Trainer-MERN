import { useEffect, useState } from "react";
import { gsap } from "gsap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/workout");
  }, [navigate]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const apiUrl = "https://workout.syedomer.xyz/api/public/signin";
      const response = await axios.post(apiUrl, formData);

      if (!response.data) {
        toast.error("Invalid response from server.");
        return;
      }

      const { email, token } = response.data;

      if (!email) {
        toast.error("Account does not exist. Please sign up first.");
        return;
      }

      localStorage.setItem("email", email);
      localStorage.setItem("user", JSON.stringify(response.data));

      if (token) {
        localStorage.setItem("token", token);
      }

      toast.success("Sign in successful");
      navigate("/workout");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.msg );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sign-in-form",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    });

    return () => ctx.revert(); // Cleanup animation on unmount
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="sign-in-form w-full max-w-md p-6 bg-gray-800 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Sign In
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
            />
          </div>

          <div>
            <label className="block text-gray-400">Password</label>
            <input
              type="password"
              className="w-full p-3 mt-1 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white outline-none"
              placeholder="Enter your password"
              required
              name="password"
              onChange={handleChange}
              value={formData.password}
            />
          </div>

          <p
            className="text-sm text-blue-400 hover:underline cursor-pointer text-center"
            onClick={() => navigate("/resetpassword")}
          >
            Forgot Password?
          </p>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 mt-4 rounded-lg font-semibold transition duration-300 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default SignIn;
