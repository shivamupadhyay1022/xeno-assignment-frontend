import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavPageComponent from "./context/NavPageComponent";
import { RouteProvider } from "./context/RouteContext";
import Router from "./context/Router";
import Route from "./context/Route";
import Link from "./context/Link";
import { PageProvider, usePage } from "./context/PageContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import axios from "axios";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import OrdersPage from "./pages/OrdersPage";
import AudienceSetsPage from "./pages/AudienceSetsPage";

function App() {
  const [count, setCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [seed, setSeed] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    setSeed(Math.random());
    getCurrPage();
  }, [currentPage]);

  // useEffect(() => {
  //   axios.get("http://localhost:5000/api/check-session")
  //     .then((res) => {
  //       setIsLoggedIn(res.data.loggedIn);
  //       setUser(res.data.user);
  //       console.log(res.data.user)
  //     })
  //     .catch((err) => console.error("Session check error:", err));
  // }, []);

  async function getCurrPage() {
    const current_page = await window.localStorage.getItem("Current_page");
    if (current_page !== null) {
      setCurrentPage(JSON.parse(current_page));
    } else {
      window.localStorage.setItem("Current_page", JSON.stringify("Home"));
      setCurrentPage("Home");
    }
  }

  async function setCurrPage(page) {
    window.localStorage.setItem("Current_page", JSON.stringify(page));
    setCurrentPage(page);
  }

  return (
    <div>
      <RouteProvider>
        <nav className="bg-mint-green shadow-md p-4">
          <div className="flex justify-between">
            <button
              className="px-4 py-2 w-auto h-auto flex gap-1 items-center rounded-md font-semibold text-deep-teal focus:outline-none"
              onClick={() => setCurrPage("Home")}
            >
              Xeno CRM and Campaign Management App
            </button>
            <div className="md:flex hidden items-center gap-4">
              <span className="text-deep-teal hover:text-light-sky-blue hover:cursor-pointer">
                <Link to="/">Home</Link>
              </span>
              <span className="text-deep-teal hover:text-light-sky-blue hover:cursor-pointer">
                <Link to="/login">Login</Link>
              </span>
              <span className="text-deep-teal hover:text-light-sky-blue hover:cursor-pointer">
                <Link to="/about">About</Link>
              </span>
            </div>
          </div>
        </nav>

        <Router>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/dashboard/orders" component={OrdersPage} />
          <Route path="/dashboard/audience" component={AudienceSetsPage} />
        </Router>
      </RouteProvider>

      {/* Footer */}
      <footer className="bg-deep-teal text-white py-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left px-8">
          <p className="text-light-gray text-sm">
            &copy; 2024 Xeno CRM & Campaign Management. All Rights Reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-light-gray hover:text-mint-green">
              Privacy Policy
            </a>
            <a href="#" className="text-light-gray hover:text-mint-green">
              Terms of Service
            </a>
            <a href="#" className="text-light-gray hover:text-mint-green">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
