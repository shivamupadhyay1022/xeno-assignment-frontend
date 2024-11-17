import React, { createContext, useContext, useState, useEffect } from "react";

const RouteContext = createContext();

export const RouteProvider = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);

    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  return (
    <RouteContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = () => useContext(RouteContext);
