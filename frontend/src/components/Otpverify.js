import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";

import { toast } from "react-toastify";
import axios from "axios";

const URL = "/user/verifyOtp";
function Otpverify() {
  const [formData, setFormData] = useState({
    otp: "",
  });
  const { otp } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  //useEffect
  // useEffect(()=>{

  //     if(user){
  //         navigate('/main')
  //     }

  // },[user,navigate])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOtp = (event) => {
    event.preventDefault();

    async function verifingOtp() {
      const send = {
        userId: user._id,
        otp,
      };
      console.log(send);
      const response = await axios.post(URL, send).then((response) => {
        toast(response.data.status);
        if (response.data.status === "verified") {
          dispatch(logout());
          dispatch(reset());
          navigate("/login");
        }

        console.log(response);
      });

      return 0;
    }
    verifingOtp();
  };
  return (
    <div className="flex justify-center font-medium mt-24 w-screen ">
      <div className="border p-5 shadow">
        <div className="">
          <h3 className="text-xl font-bold  w-72 align-bottom ">
            Verify to acces your account
          </h3>
        </div>

        <div className="">
          <form className="" onSubmit={handleOtp}>
            <div className="">
              <div className="">
                <label>
                  Enter your otp
                  <input
                    className="flex px-5 h-10 w-80 border-bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    placeholder="otp "
                    value={otp}
                    name="otp"
                    onChange={onChange}
                  />
                </label>
              </div>

              <div>
                <input
                  className="bg-gray-700 text-white p-[5px] my-4 rounded-md"
                  type="submit"
                  value="Submit"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Otpverify;
