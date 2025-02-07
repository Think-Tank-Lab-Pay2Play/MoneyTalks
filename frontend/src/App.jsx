import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/welcome/Welcome.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx"
import AboutTheApp from "./pages/aboutTheApp/AboutTheApp.jsx";
import Home from "./pages/home/Home.jsx";
import Account from "./pages/account/Account.jsx";
import Tutorial from "./pages/tutorial/Tutorial.jsx";
import UploadBill from "./pages/uploadBill/UploadBill.jsx";
import ViewSpendings from "./pages/viewSpendings/ViewSpendings.jsx";
import MoreStatistics from "./pages/moreStatistics/MoreStatistics.jsx";
import GenerateReports from "./pages/generateReports/GenerateReports.jsx";
import { AuthProvider } from './components/authContext/AuthContext.jsx';

{/* open the terminal and run: npm install packages */ }
{/* to run the project run: npm run dev     in the terminal and go to your localhost address shown in the terminal*/ }

function App() {
  return (
    <>
      <Router>
        <main>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Welcome />} /> {/* Welcome Page-ul - pagina pe care incepe user-ul navigarea */}
              <Route path="/login" element={<Login />} /> {/* Pagina de logare */}
              <Route path="/register" element={<Register />} /> {/* Pagina de register */}
              <Route path="/aboutapp" element={<AboutTheApp />} /> {/* Pagina Despre aplicatie */}
              {/*<Route element={<ProtectedRoutes />}>*/}
                <Route path="/home" element={<Home />} /> {/* Home Page-ul pe care user-ul il poate accesa doar daca e logat */}
                <Route path="/account" element={<Account />} /> {/* Pagina de setari cont */}
                <Route path="/tutorial" element={<Tutorial />} /> {/* Pagina pentru informatii utilizare platforma */}
                <Route path="/generate-reports" element={<GenerateReports />} /> {/* Pagina pentru generarea rapoartelor personalizate */}
                <Route path="/upload-bill" element={<UploadBill />} /> {/* Pagina pentru upload bill */}
                <Route path="/view-spendings" element={<ViewSpendings />} /> {/* Pagina pentru vizualizarea cheltuielilor */}
                <Route path="/more-statistics" element={<MoreStatistics />} /> {/* Pagina pentru diferite statistici */}
              {/* </Route> */}
            </Routes>
          </AuthProvider>
        </main>
      </Router>
    </>
  );
}

export default App;
