// Defines routes and transitions for the React app
import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import Film from "./pages/Film";

export default function App() {
  const location = useLocation();
  const [ready, setReady] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!ready ? (
        <Loader key="loader" onReady={() => setReady(true)} />
      ) : (
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/film"
            element={
              <Layout>
                <Film />
              </Layout>
            }
          />
        </Routes>
      )}
    </AnimatePresence>
  );
}
