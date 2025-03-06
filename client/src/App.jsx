import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/public/SignUp";
import SignIn from "./components/public/SignIn";
import WorkOutPlanner from "./components/private/WorkOutPlanner";
import WorkoutPlanPage from "./components/private/WorkoutPlanPage";
import NotFoundPage from "./components/public/NotFoundPage";
import WelcomePage from "./components/public/WelcomePage";
import ReSetPassword from "./components/public/ReSetPassword";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/resetpassword" element={<ReSetPassword />} />
          <Route path="/workout" element={<WorkOutPlanner />} />
          <Route path="/plan" element={<WorkoutPlanPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
