import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";


 function NotFoundPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // GSAP Fade-in effect on load
    gsap.fromTo(
      ".not-found-container",
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // Auto-redirect countdown
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 p-6">
      <motion.div
        className="not-found-container text-center text-white p-8 rounded-lg shadow-xl bg-gray-800 max-w-lg"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated Icon */}
        <motion.div
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1.5,
          }}
        >
          🚀
        </motion.div>

        <motion.h1
          className="text-6xl font-bold text-yellow-400 mt-4"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          404
        </motion.h1>

        <motion.h2
          className="text-2xl font-semibold mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Oops! Page Not Found
        </motion.h2>

        <p className="text-gray-400 mt-4">
          The page you're looking for might have been removed or doesn't exist.
        </p>

        <p className="text-gray-300 font-semibold mt-2">
          Redirecting in <span className="text-yellow-400">{countdown}</span>{" "}
          seconds...
        </p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition"
        >
          Go Home Now
        </motion.button>
      </motion.div>
    </div>
  );
}

export default NotFoundPage