import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/welcome/Welcome.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx"
import AboutTheApp from "./pages/aboutTheApp/AboutTheApp.jsx";

{/* open the terminal and run: npm install packages */ }
{/* to run the project run: npm run dev     in the terminal and go to your localhost address shown in the terminal*/ }

function App() {
  return (
    <>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/aboutapp" element={<AboutTheApp />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
