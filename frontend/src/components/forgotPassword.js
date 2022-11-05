import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import axios from "axios";

const URL = "/user/sendOtp";
const VERIFY = "/user/reset";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
    otp: "",
  });
  const { phone, email, password, otp } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //sending otp
  const sendingOtp = (event) => {
    event.preventDefault();

    async function sendOtp() {
      const userData = { userId: phone, email: email };
      const responseotp = await axios.post(URL, userData);
      console.log(responseotp);
    }
    sendOtp();
  };
  //verifing otp
  const sendingDetails = (event) => {
    async function verifyOtp() {
      event.preventDefault();
      const data = {
        userId: phone,
        email: email,
        otp: otp,
        password: password,
      };
      const response = await axios.post(VERIFY, data).then((response) => {
        toast(response.data.status);
        if (response.data.status === "success") {
          navigate("/login");
        } else {
          toast("Error");
        }

        console.log(response);
      });
    }
    verifyOtp();
  };

  return (
    <div
      className="ui form"
      style={{
        display: "flex",
        alignItems: "center",
        left: "500px",
        top: "150px",
      }}
    >
      <div className="  flex justify-center font-medium mt-24 w-screen">
        <form className="  font-bold   text-l p-4 shadow rounded-md  border">
          <div className="">
            <div className="">
              <label className=" ">
                Phone number
                <input
                  className="flex px-5 h-10 w-80 border-  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  placeholder="phone "
                  value={phone}
                  name="phone"
                  onChange={onChange}
                  required
                />
              </label>
            </div>
            <div className="field">
              <label className="block  py-0 ">
                Email
                <input
                  className="flex px-5 h-10 w-80 border-  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  placeholder="email "
                  value={email}
                  name="email"
                  onChange={onChange}
                  required
                />
              </label>
            </div>
            <div className="field">
              <label>OTP </label>
              <input
                className="flex px-5 h-10 w-80 border-  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="otp "
                value={otp}
                name="otp"
                onChange={onChange}
                required
              />
            </div>
            <button
              className="border p-1 bg-gray-700 text-white my-3 text-tiny rounded-md"
              onClick={sendingOtp}
            >
              Click to get Otp
            </button>
            <div className="field">
              <label>New Password</label>
              <input
                type="password"
                placeholder="New password"
                value={password}
                name="password"
                onChange={onChange}
                required
                className="flex px-5 h-10 w-80 border-  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <div>
                <button
                  className="bg-gray-700 text-white p-[5px] my-4 rounded-md"
                  onClick={sendingDetails}
                >
                  Update
                </button>
                {/* <a  className="link ui blue" href="./signup">Sign Up</a> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ForgotPassword;
