import React, { createContext, useContext, useState } from "react";

// Create the context
const PageContext = createContext();

// Context provider component
export const PageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("Home");

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  );
};

// Hook to use the context
export const usePage = () => useContext(PageContext);
