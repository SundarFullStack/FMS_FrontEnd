import React from "react";
import "./main.css"
import ReactDom from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Context from "./Components/Context/ContextProvider";

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <>
    <Context>
    <Router>
      <App />
      </Router>
      </Context>
      
  </>
);
