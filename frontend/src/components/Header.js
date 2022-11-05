import React from "react";
import WorxaImg from "./icon/WorxaImg.png";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

import locations from "./location.json";

const API_DATA = "/catogory/get";
const CatogoryUrl = "/user/workers";

const Header = ({ setData }) => {
  //locations

  const [formData, setFormData] = useState({
    location: "",
  });

  const { location } = formData;

  //searching

  const [jobs, setJobs] = useState([]);
  const [worker, setWorker] = useState([]);

  const [value, setValue] = useState("");
  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onChangeLocation = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    async function reciveCatagory() {
      const jobs = await axios.get(API_DATA);

      if (jobs.data) {
        console.log(jobs.data);
        setJobs(jobs.data);
        localStorage.setItem("search", JSON.stringify(jobs.data));
      }
      return jobs.data;
    }
    reciveCatagory();

    async function reciveWorkers() {
      const worker = await axios.get(CatogoryUrl);

      if (worker.data) {
        console.log(worker.data);
        setWorker(worker.data);
        localStorage.setItem("workerlist", JSON.stringify(worker.data));
      }
      return worker.data;
    }
    reciveWorkers();
  }, []);
  useEffect(() => {
    setData(location);
  }, [setData, location]);

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    // navigate('/main/'+searchTerm)
    console.log("search ", searchTerm);
  };

  //user checking
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/register");
  };

  //After Logging in
  return (
    <div className="z-40 border-b-4">
      <body class="box-border m-0 p-0">
        <header>
          {user ? (
            <div class=" bg-transparent">
              <div
                class="flex justify-between 
                                 space-x-11 items-center "
              >
                <Link to="/main">
                  <img class="w-40  ml-5 mt-4" src={WorxaImg} alt="logo" />
                </Link>
                <div>
                  <div class="inline-flex  flex-wrap ">
                    <div>
                      <input
                        class="ml-4 py-2 w-[26rem] rounded-l-lg border-solid focus:outline-none font-weight  border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 indent-4 select-auto flex relative left-5"
                        type="text"
                        placeholder="Search"
                        autocomplete="on"
                        value={value}
                        onChange={onChange}
                      />

                      {/* <label>Location {location}</label>                         */}
                      {/* <button onClick={() => onSearch(value)} className="ui primary button">search</button> */}
                    </div>

                    <div class="items-center  border-none  ">
                      <select
                        class="text-center focus:outline-none border-gray-300 text-gray-900  font-weight focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-slate-300 shadow dark:border-none dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg relative  left-4 h-[2.5rem]"
                        type="text"
                        placeholder="Location"
                        name="location"
                        id="location"
                        value={location}
                        onChange={onChangeLocation}
                      >
                        <option value="">Select Location</option>
                        {locations.map((location, i) => {
                          return <option>{location.city}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="absolute w-[25.5rem]  rounded font-medium text-white  bg-gray-700 mx-10 top-[3.2rem]  ">
                    {jobs
                      .filter((item) => {
                        const searchTerm = value.toLowerCase();
                        const fullName = item.catogory.toLowerCase();

                        return (
                          searchTerm &&
                          fullName.startsWith(searchTerm) &&
                          fullName !== searchTerm
                        );
                      })
                      .slice(0, 10)
                      .map((item) => (
                        <Link to={"/main/" + item.catogory}>
                          <div
                            className="p-2"
                            onClick={() => onSearch(item.catogory)}
                            key={item.catogory}
                          >
                            {item.catogory}
                          </div>
                        </Link>
                      ))}

                    {worker
                      .filter((item) => {
                        const searchTerm = value.toLowerCase();
                        const fullName = item.name.toLowerCase();

                        return (
                          searchTerm &&
                          fullName.startsWith(searchTerm) &&
                          fullName !== searchTerm
                        );
                      })
                      .slice(0, 10)
                      .map((item) => (
                        <Link to={"/main/" + item.job + "/" + item._id}>
                          <div
                            className="p-2"
                            onClick={() => onSearch(item.name)}
                            key={item.name}
                          >
                            <Link to={"/main/" + item.job + "/" + item._id}>
                              {" "}
                              {item.name},{item.job}
                              {item.sjob !== "none" ? "," + item.sjob : ""}
                            </Link>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
                <div class="flex space-x-10 items-center mt-2">
                  <div>
                    <Link to="/registerworker">
                      <i>
                        {user.type === "employee" ? (
                          <button class="bg-gray-700 hover:text-white text-white font-medium rounded w-40 h-10 ">
                            Update Worker
                          </button>
                        ) : (
                          <button class=" bg-[#7a04b5] font-medium hover:text-white text-white rounded w-40 h-10 ">
                            Become a Worker
                          </button>
                        )}
                      </i>
                    </Link>
                  </div>

                  <div class=" group">
                    <Link to="/profile">
                      <button
                        href=""
                        class="profile  w-[50px] h-[50px] rounded-[100%] mx-0 my-[10px] relative overflow-hidden flex justify-center items-center before:content-['']  before:w-[100%] before:h-[100%] before:absolute before:top-[100%] before: transition-all ease-in-out delay-[0.1s] hover:before:top-[0] bg-gray-200"
                      >
                        <svg
                          class="w-[30px] h-[30px] relative z-[1] transition-all ease-in-out delay-[0.2s] hover:rotate-[360deg]  "
                          id="Layer_1"
                          data-name="Layer 1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 246.15 246.15"
                        >
                          <title>User</title>
                          <path
                            class="fill-[#383838] transition-all ease-in-out delay-[0.5s] hover:fill-[#fff]  "
                            d="M150,36.92A113.08,113.08,0,1,1,70,70a112.38,112.38,0,0,1,80-33.12m0-10A123.08,123.08,0,1,0,273.08,150,123.09,123.09,0,0,0,150,26.92Z"
                            transform="translate(-26.92 -26.92)"
                          />
                          <circle cx="123.08" cy="99.02" r="39.36" />
                          <path
                            d="M243,222.14c-14.29-34.35-48.84-58.58-89.19-58.58-43.58,0-80.38,28.25-92.22,67C135,290.23,192.65,274,243,222.14Z"
                            transform="translate(-26.92 -26.92)"
                          />
                        </svg>
                      </button>
                    </Link>
                    <div class="absolute hidden mr-10 group-hover:inline-block">
                      <button
                        class="bg-[#ddd] rounded  w-24 h-10  text-black hover:text-white  hover:bg-gray-700"
                        onClick={onLogout}
                      >
                        Sign out
                      </button>
                    </div>
                  </div>

                  <div></div>
                </div>
              </div>
            </div>
          ) : (
            //Header before Login
            <div>
              <nav class=" px-4 sm:px-4 py-2.5  mb-0 ">
                <div class="flex justify-between items-center mx-auto">
                  <div>
                    <Link to="/">
                      <img src={WorxaImg} alt="logo" class="w-40 ml-1  mt-3 " />
                    </Link>
                  </div>
                  <div className="flex">
                    <Link to="/login">
                      <button class="text-white bg-gray-700  focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-l-md text-sm px-5 py-2.5 text-center mb-2">
                        Log in{" "}
                      </button>
                    </Link>

                    <Link to="/register">
                      <button className="text-white bg-[#7a04b5]  focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-r-md text-sm px-5 py-2.5 text-center mr-1 mb-2">
                        Sign Up
                      </button>
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </header>
      </body>
    </div>
  );
};

export default Header;

/*
class="relative bg-white z-[1]  "
class="relative px-[20px] py-[50px] block w-[200px] overflow-hidden rounded-[40px] "
class="liquid absolute top-[-80px] left-0 w-[200px] h-[200px] bg-[#4973ff] shadow-[0_0_50px_rgba(0,0,0,0.5)] transition delay-[0.5s] after:content[''] after:w-[200%] after:h-[200%] after:absolute after:top-0 after:left-[50%] after:translate-[] "
*/
