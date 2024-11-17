
import React from "react";
import { useRoute } from "./RouteContext";

const Link = ({ to, children }) => {
  const { navigate } = useRoute();

  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
};

export default Link;
