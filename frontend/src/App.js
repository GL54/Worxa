import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

import Header from "./components/Header";
import Login from "./components/Login";
import history from "./utils/history";
import Signup from "./components/Signup";
import Mainpage from "./components/Mainpage";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Workeregister from "./components/Workregister";
import ViewWorker from "./components/Viewworkers";
import ViewWorkerProfile from "./components/Viewworkerprofile";
import Settings from "./components/Settings";
import Otpverify from "./components/Otpverify";
import ForgotPassword from "./components/forgotPassword";

function App() {
  const [data, setData] = useState("");

  return (
    <>
      <Router history={history}>
        <div className="contianer">
          <Header setData={setData} />

          <Routes>
            <Route path="/settings" element={<Settings />} />
            <Route path="/main/:catogory/:id" element={<ViewWorkerProfile />} />
            <Route
              path="/main/:catogory"
              element={<ViewWorker data={data} />}
            />
            <Route path="/registerworker" element={<Workeregister />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
            <Route path="/main" element={<Mainpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/otpverify" element={<Otpverify />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />

            {/* <Route path="/home" element={<Home/>} /> */}
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
