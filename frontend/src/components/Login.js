import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "./Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  //useEffect
  useEffect(() => {
    if (user) {
      navigate("/main");
    }
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/main");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };
  return (
    <div>
      <body class="m-0 p-0 justify-center items-center font-['Jost',sans-serif] overflow-hidden flex">
        <div class="h-screen">
          <div class="login w-[320px] h-[370px] mt-20 bg-[#fff] shadow-[0_10px_15px_rgba(179,179,179,0.7)]">
            <form onSubmit={handleLogin}>
              <label class="flex ml-10 font-bold pt-4 pb-1 text-3xl">
                Sign in
              </label>
              <p class="ml-10 pb-3 text-sm ">
                Explore the infinite possibilities
              </p>
              <input
                class="w-60 h-10 mx-auto my-3 text-[#573b8a] justify-center flex rounded-[4px] font-medium indent-1.5 border-[1px] border-b-[1px] border-b-[#949090] border-[#b4adad] mb-6 focus:bg-[#e0dede]"
                type="email"
                placeholder="Email"
                value={email}
                name="email"
                required=""
                onChange={onChange}
              />
              <input
                class="w-60 h-10 mx-auto my-3 mb-2 text-[#573b8a] justify-center flex rounded-[4px] font-medium indent-1.5 border-[1px] border-b-[1px] border-b-[#949090] border-[#b4adad] focus:bg-[#e0dede]"
                type="password"
                placeholder="Password"
                value={password}
                name="password"
                required=""
                onChange={onChange}
              />
              <Link
                class="ml-10 text-red-600 text-sm hover:text-blue-500"
                to="/forgotPassword"
              >
                Forgot password?
              </Link>
              <button
                class="mt-4 w-60 h-[40px] bg-gray-700 rounded block  mx-auto p-[10px] text-[1em]  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                                        active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out font-medium text-white"
              >
                Log In
              </button>
              <br />
              <p class="ml-10 inline-block mr-2 font-[sans-serif]">
                New to Worxa?
              </p>
              <Link
                class="inline text-blue-600 font-[sans-serif]"
                to="/register "
              >
                Sign Up
              </Link>
              <br />
            </form>
          </div>
        </div>
      </body>
    </div>
  );
}
export default Login;
