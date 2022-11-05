import Login from "./components/Login";
import AllData from "./components/AllData";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <h2>hai</h2>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AllData />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
