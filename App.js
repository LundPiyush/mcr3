import React from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Table from "./components/Table";

function App() {
  return (
    <div>
      <Table />
    </div>
  );
}
const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
export default App;
