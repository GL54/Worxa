import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { toast } from "react-toastify";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import locations from "./location.json";

function Workregister() {
  const [formData, setFormData] = useState({
    job: "",
    sjob: "",
    price: "",
    sprice: "",
    wlocation: "",
    wduration: "",
  });
  const { job, sjob, price, sprice, wlocation, wduration } = formData;

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const API_DATA = "/catogory/get";
  const updateUrl = "/user/employee/" + user._id;

  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.verify === false || !user.verify) {
      navigate("/otpverify");
    }

    async function selectJob() {
      const jobs = await axios.get(API_DATA);

      if (jobs.data) {
        console.log(jobs.data);
        setJobs(jobs.data);
        localStorage.setItem("employee", JSON.stringify(jobs.data));
      }
      return jobs.data;
    }
    selectJob();
  }, [user, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    console.log(jobs.title);
    const update = {
      type: "employee",
      job: job,
      price: price,
      sjob: sjob,
      sprice: sprice,
      wlocation: wlocation,
      wduration: wduration,
    };
    if (job !== sjob) {
      axios.put(updateUrl, update).then((res) => {
        console.log(jobs.title);
      });
      toast.success("Registered Successfully");
      navigate("/main");
    } else {
      e.preventDefault();
      toast.error("Please Select Different Job");
    }
  };

  // useEffect(()=>{
  //     const update={type:'employee',job:job,price:price}
  //     axios.put(updateUrl,update)

  // },[job,price])

  return (
    //To add background color
    <div class="">
      <body class="m-0 p-0 font-['Jost',sans-serif] overflow-hidden flex ">
        <form class="h-[100vh] w-screen" onSubmit={onSubmit}>
          <div class="flex flex-wrap w-[40.625rem]  ml-8 mt-6 bg-white shadow-md">
            <div class="flex-wrap">
              <label class="font-medium" for="job">
                Choose your Main Job {job}
                <select
                  class="block w-72 h-10 my rounded-[6px]  indent-1.5 font-normal border-[1px] border-b-[1px] border-b-[#949090] border-[#b4adad] mb-6 focus:bg-[#e0dede] mr-8"
                  name="job"
                  value={job}
                  id="job"
                  onChange={onChange}
                >
                  <option>None</option>

                  {jobs.map((jobs, i) => {
                    return <option>{jobs.catogory}</option>;
                  })}
                </select>
              </label>
            </div>
            <div>
              <label class="font-medium">Rate{price}</label>
              <input
                class="block w-72 h-10 my rounded-[6px]  indent-1.5 font-normal border-[1px] border-b-[1px] border-b-[#949090] border-[#b4adad] mb-6 focus:bg-[#e0dede] mr-8"
                type="Number"
                placeholder="Price"
                name="price"
                id="price"
                value={price}
                onChange={onChange}
              />
            </div>

            <div class="block">
              <label class="font-medium" for="job">
                Choose a Job you are also skilled at {sjob}
              </label>
              <select
                class="block w-72 h-10 my rounded-[6px]  indent-1.5 font-normal border-[1px] border-b-[1px] border-b-[#949090] border-[#b4adad] mb-6 focus:bg-[#e0dede] mr-8"
                name="sjob"
                value={sjob}
                id="sjob"
                onChange={onChange}
              >
                <option>None</option>

                {jobs.map((jobs, i) => {
                  return <option>{jobs.catogory}</option>;
                })}
              </select>
            </div>
            <div>
              <label class="font-medium">Rate{sprice}</label>

              <input
                class="block w-72 h-10 my rounded-[6px]  indent-1.5 font-normal border-[1px] border-b-[1px] border-b-[#949090] border-[#b4adad] mb-6 focus:bg-[#e0dede] mr-8"
                type="Number"
                placeholder="Price"
                name="sprice"
                id="sprice"
                value={sprice}
                onChange={onChange}
              />
            </div>

            <div>
              <label class="font-medium">
                How long can you work:{wduration} (In Hours)
              </label>
              <input
                class="block w-72 h-10 my rounded-[6px]  indent-1.5 font-normal border-[1px] border-b-[1px] border-b-[#949090] border-[#b4adad] mb-6 focus:bg-[#e0dede] mr-8"
                type="Number"
                placeholder="Duration"
                name="wduration"
                id="wduration"
                value={wduration}
                onChange={onChange}
              />

              <label class="font-medium">
                Choose the Location you are avilable for working
              </label>
              <select
                class="block w-72 h-10 my rounded-[6px]  indent-1.5 font-normal border-[1px] border-b-[1px] border-b-[#949090] border-[#b4adad] mb-6 focus:bg-[#e0dede] mr-8"
                type="text"
                placeholder="Location"
                name="wlocation"
                id="wlocation"
                value={wlocation}
                onChange={onChange}
              >
                {locations.map((location, i) => {
                  return <option>{location.city}</option>;
                })}
              </select>

              <input
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 hover:cursor-pointer"
                type="submit"
                value="Submit"
              />
            </div>
          </div>
        </form>
      </body>
    </div>
  );
}
export default Workregister;
