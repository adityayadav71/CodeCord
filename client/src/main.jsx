import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/tailwind.css";
import { Analytics } from "@vercel/analytics/next"

ReactDOM.createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <BrowserRouter>
      <App />
      <Analytics />
    </BrowserRouter>
  /* </StrictMode> */
);
