import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PageProvider } from "./context/PageContext.jsx";
import { RouteProvider } from "./context/RouteContext.jsx";
import axios from "axios";
axios.defaults.withCredentials = true;
import { GoogleOAuthProvider } from "@react-oauth/google";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="913341075053-co9s1p7ti482seh6p886dg6imucj1f7m.apps.googleusercontent.com">
      <RouteProvider>
        <App />
      </RouteProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
