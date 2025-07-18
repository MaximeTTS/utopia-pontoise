// Entry point mounting the React app and router

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "../src/assets/index.css";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find root element");

const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
