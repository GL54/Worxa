import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import locations from "./location.json";
import Spinner from "./Spinner";
import SignupImg from "./icon/SignupImg.png";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    phone: "",
    email: "",
    location: "",
    password: "",
    ConfirmPassword: "",
  });

  const { name, dob, phone, email, location, password, ConfirmPassword } =
    formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/main");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== ConfirmPassword) {
      toast.error("Password does not match");
    } else {
      const userData = {
        name,
        dob,
        phone,
        email,
        location: location,
        password,
      };
      // console.log(userData);
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <body class="m-0 p-0 box-border">
        <div class="containerr flex justify-center">
          <div class="leftPart w-[50%] h-screen ">
            <img alt="workers" class="my-20 mx-auto" src={SignupImg}></img>
          </div>
          <div class="rightPart w-[50%] h-screen flex justify-center">
            <div class="ml-5 w-[540px] mt-[135px]  flex justify-center h-[460px]">
              <form className="border rounded-md shadow" onSubmit={onSubmit}>
                <label class="flex ml-6 font-bold pt-4 pb-1 text-3xl">
                  Sign up
                </label>
                <input
                  class="w-60 h-10 my-3 ml-5  rounded-[4px] font-medium indent-1.5 border-[1px] border-b-[1px] border-b-[#949090] border-[#b4adad] mb-6 focus:bg-[#e0dede]"
                  type="text"
                  placeholder="Name"
                  name="name"
                  id="name"
                  required=""
                  value={name}
                  onChange={onChange}
                />
                <input
                  class="w-60 h-10 my-3 ml-5   rounded-[4px] font-medium indent-1.5 border-[1px] border-b-[1px] border-b-[#949090] border-[#b4adad] mb-6 focus:bg-[#e0dede]"
                  type="date"
                  placeholder="Date of Birth"
                  required=""
                  name="dob"
                  id="dob"
                  value={dob}
                  onChange={onChange}
                />
                <input
                  class="w-60 h-10 my-3 ml-5   rounded-[4px] font-medium indent-1.5 border-[1px] border-b-[1px] border-b-[#949090] border-[#b4adad] mb-6 focus:bg-[#e0dede]"
                  type="number"
                  placeholder="Phone Number"
                  name="phone"
                  id="phone"
                  required=""
                  minLength="10"
                  maxLength="10"
                  value={phone}
                  onChange={onChange}
                />
                <input
                  class="w-60 h-10 my-3 ml-5  rounded-[4px] font-medium indent-1.5 border-[1px] border-b-[1px] border-b-[#949090] border-[#b4adad] mb-6 focus:bg-[#e0dede]"
                  type="email"
                  placeholder="Email"
                  name="email"
                  id="email"
                  required=""
                  value={email}
                  onChange={onChange}
                />
                <input
                  class="w-60 h-10 my-3 ml-5   rounded-[4px] font-medium indent-1.5 border-[1px] border-b-[1px] border-b-[#949090] border-[#b4adad] mb-6 focus:bg-[#e0dede]"
                  type="Password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  required=""
                  minLength="8"
                  value={password}
                  onChange={onChange}
                />
                <input
                  class="w-60 h-10 mt-3 ml-5   rounded-[4px] font-medium indent-1.5 border-[1px] border-b-[1px] border-b-[#949090] border-[#b4adad] mb-6 focus:bg-[#e0dede]"
                  type="password"
                  placeholder="Confirm Password"
                  name="ConfirmPassword"
                  id="Confirm Password"
                  required=""
                  value={ConfirmPassword}
                  onChange={onChange}
                />
                <select
                  class="w-60 h-10 my-3 ml-5   rounded-[4px] font-medium indent-1.5 border-[1px] border-b-[1px] border-b-[#949090] border-[#b4adad] mb-6 focus:bg-[#e0dede]"
                  type="text"
                  placeholder="Location"
                  name="location"
                  id="location"
                  required=""
                  value={location}
                  onChange={onChange}
                >
                  <option value="" selected disabled hidden>
                    Select Location
                  </option>
                  {locations.map((location, i) => {
                    return <option>{location.city}</option>;
                  })}
                </select>
                <button class=" w-60 h-[40px] bg-gray-700 rounded font-medium text-white justify-center block  mx-auto text-[1em] hover:bg-blue-800 mb-2">
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Signup;
