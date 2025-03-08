import { useState, useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSpinner } from "react-icons/fa"; // 🔹 Loading icon
import { ToastContainer, toast } from "react-toastify";

function WorkoutPlanner() {
  const [goal, setGoal] = useState(localStorage.getItem("userGoal") || "");
  const [planType, setPlanType] = useState(
    localStorage.getItem("userPlanType") || ""
  );
  const [height, setHeight] = useState(
    localStorage.getItem("userHeight") || ""
  );
  const [weight, setWeight] = useState(
    localStorage.getItem("userWeight") || ""
  );
  const [allergy, setAllergy] = useState(
    localStorage.getItem("userAllergy") || ""
  );

  const [gender, setGender] = useState(
    localStorage.getItem("userGender") || ""
  );
  const [injuries, setInjuries] = useState(
    localStorage.getItem("userInjuries") || ""
  );

  const [loading, setLoading] = useState(false);
  const API_KEY = "YOUR_Gemini_API_KEY"; // Replace with your API key
  const navigate = useNavigate();

  useLayoutEffect(() => {
    gsap.set(".form-container", { opacity: 0, y: -20 });
    gsap.to(".form-container", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("userGoal", goal);
    localStorage.setItem("userPlanType", planType);
    localStorage.setItem("userHeight", height);
    localStorage.setItem("userWeight", weight);
    localStorage.setItem("userAllergy", allergy);
    localStorage.setItem("userGender", gender);
    localStorage.setItem("userInjuries", injuries);
  }, [goal, planType, height, weight, allergy, gender, injuries]);

  const handleGeneratePlan = async (e) => {
    e.preventDefault();

    if (
      !goal ||
      !planType ||
      !height ||
      !weight ||
      !gender ||
      !injuries ||
      !allergy
    ) {
      toast("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Create a ${planType} workout plan for someone focused on ${goal}. 
                  Their height is ${height} cm, weight is ${weight} kg, and they have allergies: ${allergy} , and injuries: ${injuries}.`,
                },
              ],
            },
          ],
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      let workoutPlan =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No workout plan generated.";

      workoutPlan = workoutPlan.replace(/\*/g, ""); // 🔹 Remove all asterisks (*)

      localStorage.setItem("workoutPlan", workoutPlan);

      // Scroll to the top before navigating
      window.scrollTo({ top: 0, behavior: "smooth" });

      navigate("/plan");
    } catch (error) {
      console.error(
        "Error fetching workout plan:",
        error.response?.data || error.message
      );
      toast("Failed to generate workout plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-blue-800 p-6">
      <motion.div
        className="form-container w-full max-w-md p-6 bg-gray-800 rounded-2xl shadow-xl text-white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Workout Planner</h2>

        <div className="space-y-4">
          {/* Goal Selection */}
          <div>
            <label className="block text-gray-300">
              What is your fitness goal?
            </label>
            <select
              className="w-full p-3 mt-1 bg-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            >
              <option value="">Select a goal</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="weight_loss">Weight Loss</option>
              <option value="strength_training">Strength Training</option>
              <option value="endurance">Endurance & Cardio</option>
              <option value="flexibility">Mobility & Flexibility</option>
              <option value="crossfit">CrossFit / HIIT</option>
              <option value="calisthenics">Calisthenics</option>
              <option value="rehab">Rehabilitation & Recovery</option>
              <option value="senior_fitness">Senior Fitness</option>
            </select>
          </div>

          {/* Workout Type Selection */}
          <div>
            <label className="block text-gray-300">Select a workout type</label>
            <select
              className="w-full p-3 mt-1 bg-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white"
              value={planType}
              onChange={(e) => setPlanType(e.target.value)}
            >
              <option value="">Choose a workout plan</option>
              <option value="home">Home Workout</option>
              <option value="gym">Gym Workout</option>
              <option value="cardio">Cardio Training</option>
            </select>
          </div>

          {/* Height Input */}
          <div>
            <label className="block text-gray-300">Height (cm)</label>
            <input
              type="number"
              className="w-full p-3 mt-1 bg-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter your height in cm"
            />
          </div>

          {/* Weight Input */}
          <div>
            <label className="block text-gray-300">Weight (kg)</label>
            <input
              type="number"
              className="w-full p-3 mt-1 bg-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight in kg"
            />
          </div>

          {/* Allergy Input */}
          <div>
            <label className="block text-gray-300">Any Allergies?</label>
            <input
              type="text"
              className="w-full p-3 mt-1 bg-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white"
              value={allergy}
              onChange={(e) => setAllergy(e.target.value)}
              placeholder="List any allergies (optional)"
            />
          </div>

          {/* Gender Selection */}
          <div>
            <label className="block text-gray-300">Gender</label>
            <select
              className="w-full p-3 mt-1 bg-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non_binary">Non-Binary</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Injury Input */}
          <div>
            <label className="block text-gray-300">Injuries (if any)</label>
            <input
              type="text"
              className="w-full p-3 mt-1 bg-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white"
              value={injuries}
              onChange={(e) => setInjuries(e.target.value)}
              placeholder="List any injuries (optional)"
            />
          </div>

          {/* Generate Plan Button */}
          <motion.button
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            onClick={handleGeneratePlan}
            disabled={loading}
            className={`w-full p-3 mt-4 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600 text-white"
            }`}
          >
            {loading ? (
              <span className="flex justify-center items-center">
                <FaSpinner className="animate-spin mr-2" /> Generating...
              </span>
            ) : (
              "Generate Plan"
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default WorkoutPlanner;
