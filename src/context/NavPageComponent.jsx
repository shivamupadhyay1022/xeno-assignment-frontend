import React, { useState,useEffect, useLayoutEffect } from "react";
import Home from "../pages/Home";
import About from "../pages/About";
// Import other components as needed
import { usePage } from "./PageContext";
import Login from "../pages/Login";

const NavPageComponent = () => {
  const [currentPage, setCurrentPage] = useState();

  useLayoutEffect(()=>{
    getCurrPage();
    window.addEventListener("Current_page", getCurrPage());
  },[currentPage])

  async function getCurrPage() {
    const current_page = await window.localStorage.getItem("Current_page");
    if (current_page !== null) {
      setCurrentPage(JSON.parse(current_page));
    } else {
      window.localStorage.setItem("Current_page", JSON.stringify("Home"));
      setCurrentPage("Home");
    }
  }

  switch (currentPage) {
    case "Home":
      return <Home />;
    case "About":
      return <About />;
    case "Login":
      return <Login />;
    // Add other cases as needed
    default:
      return null;
  }
};

export default NavPageComponent;
