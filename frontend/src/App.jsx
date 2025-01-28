import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/welcome/Welcome.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx"
import AboutTheApp from "./pages/aboutTheApp/AboutTheApp.jsx";
import Home from "./pages/home/Home.jsx";
import Account from "./pages/account/Account.jsx";

{/* open the terminal and run: npm install packages */ }
{/* to run the project run: npm run dev     in the terminal and go to your localhost address shown in the terminal*/ }

function App() {
  return (
    <>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<Welcome />} /> {/* Welcome Page-ul - pagina pe care incepe user-ul navigarea */}
            <Route path="/login" element={<Login />} /> {/* Pagina de logare */}
            <Route path="/register" element={<Register />} /> {/* Pagina de register */}
            <Route path="/aboutapp" element={<AboutTheApp />} /> {/* Pagina Despre aplicatie */}
            <Route path="/home" element={<Home />} /> {/* Home Page-ul pe care user-ul il poate accesa doar daca e logat */}
            <Route path="/account" element={<Account />} /> {/* Pagina se setari cont. Momentan se poate ajunge doar prin adresa http://localhost:5173/home */}
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
