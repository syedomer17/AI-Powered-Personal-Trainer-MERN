import { useEffect, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    age: "",
  });

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) navigate("/workout");
  }, [navigate]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const apiUrl = "https://workout.syedomer.xyz/api/public/signup";
      const response = await axios.post(apiUrl, formData);
      console.log(response.data);

      localStorage.setItem("userData", JSON.stringify(formData));

      // Check if userName has at least 2 characters
      if (formData.userName.trim().length < 2) {
        toast(JSON.stringify(response.message.message));
        setLoading(false);
        return;
      }
      // checking the age limit
      if (formData.age > 70 || formData.age < 10) {
        toast(JSON.stringify(response.data.message.message));
        setLoading(false);
        return;
      }

      console.log(response.data);
      navigate("/signin");
    } catch (error) {
      toast(JSON.stringify(error.response.data.message));
      console.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  useLayoutEffect(() => {
    gsap.set(".form-container", { opacity: 0, y: -100 });
    gsap.to(".form-container", {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
    });
  }, []);

  const handleFocus = (e) => {
    gsap.to(e.target, { scale: 1.05, duration: 0.3 });
  };

  const handleBlur = (e) => {
    gsap.to(e.target, { scale: 1, duration: 0.3 });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="form-container w-full max-w-md p-6 bg-gray-800 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Sign Up
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-400">User Name</label>
            <input
              type="text"
              className="w-full p-3 mt-1 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white outline-none"
              placeholder="Enter your full name"
              required
              onFocus={handleFocus}
              onBlur={handleBlur}
              name="userName"
              maxLength={20}
              minLength={2}
              onChange={handleChange}
              value={formData.userName}
            />
          </div>

          <div>
            <label className="block text-gray-400">Email</label>
            <input
              type="email"
              className="w-full p-3 mt-1 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white outline-none"
              placeholder="Enter your email"
              required
              onFocus={handleFocus}
              onBlur={handleBlur}
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
              placeholder="Create a password"
              required
              onFocus={handleFocus}
              onBlur={handleBlur}
              name="password"
              onChange={handleChange}
              value={formData.password}
            />
          </div>

          <div>
            <label className="block text-gray-400">Age</label>
            <input
              type="number"
              className="w-full p-3 mt-1 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white outline-none"
              placeholder="Enter your age"
              required
              min="10"
              max="70"
              onFocus={handleFocus}
              onBlur={handleBlur}
              name="age"
              onChange={handleChange}
              value={formData.age}
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
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-400 hover:underline cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
