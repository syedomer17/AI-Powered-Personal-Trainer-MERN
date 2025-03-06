import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";

function WelcomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) navigate("/workout");
  }, [navigate]);

  useEffect(() => {
    // GSAP Animation for button hover effect
    gsap.fromTo(
      ".cta-button",
      { boxShadow: "0px 0px 10px rgba(255, 215, 0, 0.2)" },
      {
        boxShadow: "0px 0px 20px rgba(255, 215, 0, 0.8)",
        repeat: -1,
        yoyo: true,
        duration: 1.5,
      }
    );
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 p-6">
      <motion.div
        className="text-center text-white p-8 rounded-2xl shadow-xl bg-gray-800 max-w-2xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated Welcome Text */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-yellow-400"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Welcome to FitPlanner 🚀
        </motion.h1>

        <motion.p
          className="text-gray-300 text-lg mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Your personalized AI-powered workout planner is here. Select your
          fitness goal and start your journey today!
        </motion.p>

        {/* Call-to-Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cta-button mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition shadow-lg"
          onClick={() => navigate("/signup")}
        >
          Get Started 🚀
        </motion.button>
      </motion.div>
    </div>
  );
}

export default WelcomePage;
