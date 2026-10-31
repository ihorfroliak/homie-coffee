import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { Workspace } from "./Workspace.jsx";
import "./styles.css";

const operations = new URLSearchParams(location.search).get('view') === 'operations';
document.documentElement.lang = operations ? 'pl' : 'uk';
document.title = operations ? 'Homie Coffee · Centrum operacyjne' : 'Homie Coffee · Робочий простір';

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {operations
      ? <><a className="operations-return" href="/">← Homie Coffee · робочий простір</a><App /></>
      : <Workspace />}
  </React.StrictMode>,
);
