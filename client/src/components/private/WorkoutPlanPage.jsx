import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function WorkoutPlanPage() {
  const [workoutPlan, setWorkoutPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function sendPlan() {
    if (!workoutPlan) {
      toast.error("No workout plan available to send.");
      return;
    }

    const email = localStorage.getItem("email");
    if (!email) {
      toast.error("No email found! Please log in or set your email.");
      return;
    }

    setLoading(true);

    try {
      const apiURL = "https://workout.syedomer.xyz/api/public/sendplan";
      const response = await axios.post(
        apiURL,
        { email, plan: workoutPlan },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success(response.data.message || "Workout plan sent successfully!");
    } catch (error) {
      console.error(error.response?.data?.message);
      toast.error(
        error.response?.data?.message ||
          "Failed to send workout plan. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const storedPlan = localStorage.getItem("workoutPlan");

    if (storedPlan) {
      setWorkoutPlan(storedPlan);

      gsap.fromTo(
        ".plan-container",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    } else {
      setTimeout(() => navigate("/"), 500); // Ensures GSAP animation completes
    }
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/signin");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="w-full max-w-5xl flex justify-between items-center p-4">
        <h1 className="text-yellow-400 text-2xl font-bold">Workout Planner</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-lg text-white font-semibold text-lg hover:bg-red-600 transition"
        >
          Logout
        </motion.button>
      </div>

      <motion.div
        className="plan-container max-w-5xl w-full bg-gray-800 text-white p-8 rounded-2xl shadow-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center uppercase">
          Your Workout Plan
        </h2>

        <motion.div
          className="bg-gray-700 p-6 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {workoutPlan.split("\n").map((line, index) => {
            if (line.includes("|") || line.trim() === "") return null;

            if (
              /^(Core Principles|Workout Plan Structure|Workout Options)/.test(
                line
              )
            ) {
              return (
                <p
                  key={index}
                  className="font-bold text-yellow-400 text-lg mt-4"
                >
                  {line}
                </p>
              );
            }

            if (/^[-•*]\s/.test(line)) {
              return (
                <p
                  key={index}
                  className="pl-4 text-gray-300 text-sm flex items-start mt-1"
                >
                  <span className="mr-2 text-yellow-400">•</span>
                  {line.replace(/^[-•*]\s*/, "").trim()}
                </p>
              );
            }

            if (
              /^(Low-Impact|Moderate Intensity|Strategic Timing|Keep it Short|Nutrition is Key)/.test(
                line
              )
            ) {
              return (
                <p key={index} className="text-gray-300 text-sm mt-2">
                  <span className="font-semibold text-white">
                    {line.split(":")[0]}:
                  </span>{" "}
                  {line.split(":")[1]}
                </p>
              );
            }

            return (
              <p key={index} className="text-gray-300 text-sm mt-2">
                {line}
              </p>
            );
          })}
        </motion.div>

        <motion.button
          whileHover={{ scale: loading ? 1 : 1.05 }}
          whileTap={{ scale: loading ? 1 : 0.95 }}
          onClick={sendPlan}
          disabled={loading}
          className={`mt-4 w-full py-3 rounded-lg font-semibold text-lg transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {loading ? "Sending..." : "Send Plan to Email"}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="mt-4 w-full bg-yellow-500 py-3 rounded-lg text-white font-semibold text-lg hover:bg-yellow-600 transition"
        >
          Back to Home
        </motion.button>
      </motion.div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default WorkoutPlanPage;
