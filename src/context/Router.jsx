import React from "react";
import { useRoute } from "./RouteContext";

const Router = ({ children }) => {
  const { currentPath } = useRoute();

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.props.path === currentPath) {
          return child;
        }
        return null;
      })}
    </>
  );
};

export default Router;
