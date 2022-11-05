import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import sbk from "./icon/sbk.jpg";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import locations from "./location.json";
import axios from "axios";
import usr from "./icon/user.png";

import { FaUserNinja } from "react-icons/fa";

function Settings() {
  const navigate = useNavigate();
  //getting profile data

  const [profile, setProfile] = useState([]);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    async function profiles() {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const profile = await axios.get("/user/profile", config);
      if (profile.data) {
        setProfile(profile.data);
        localStorage.setItem("profiles", JSON.stringify(profile.data));
      }
      return profile.data;
    }
    profiles();
  }, [user, navigate]);
  console.log("profile data", profile);
  console.log("profile", profile.image);

  const [formData, setFormData] = useState({
    name: profile.name,
    dob: profile.dob,
    phone: profile.phone,
    email: profile.email,
    location: profile.location,
    oldPassword: "",
    newPassword: "",
    type: profile.type,
    job: profile.job,
    sjob: profile.sjob,
    price: profile.price,
    sprice: profile.sprice,
    wlocation: profile.wlocation,
    wduration: profile.wduration,
  });
  const [image, setImage] = useState({});
  // setImage(user.image)
  console.log("formdata", formData);

  const API_UPDATE = "/user/update/" + user._id;

  const {
    name,
    dob,
    phone,
    email,
    location,
    job,
    sjob,
    price,
    sprice,
    wlocation,
    wduration,
    oldPassword,
    newPassword,
  } = formData;

  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    async function selectJob() {
      setImage(profile.image);
      setFormData({
        name: profile.name,
        dob: profile.dob,
        phone: profile.phone,
        email: profile.email,
        location: profile.location,
        oldPassword: "",
        newPassword: "",
        type: profile.type,
        job: profile.job,
        sjob: profile.sjob,
        price: profile.price,
        sprice: profile.sprice,
        wlocation: profile.wlocation,
        wduration: profile.wduration,
      });

      const jobs = await axios.get(API_DATA);

      if (jobs.data) {
        console.log(jobs.data);
        setJobs(jobs.data);
        localStorage.setItem("jobs", JSON.stringify(jobs.data));

        // const config ={
        //     headers: {
        //         Authorization: `Bearer ${user.token}`
        //     }
        // }

        // const test= await axios.get('/user/profile',config)
        // console.log("Response from protected API: "+ test.data.name)
      }
      return jobs.data;
    }
    selectJob();
  }, [user, navigate, profile]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  console.log("hai", image);

  const onSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name: name,
      dob: dob,
      phone: phone,
      email: email,
      location: location,
      oldPassword: oldPassword,
      newPassword: newPassword,
      job: job,
      sjob: sjob,
      price: price,
      sprice: sprice,
      wlocation: wlocation,
      wduration: wduration,
      image: image,
    };
    if (job !== sjob) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const res = await axios.put(API_UPDATE, userData, config);
        toast.success("Profile Updated Successfully");
        navigate("/main");
        console.log(res);
      } catch (e) {
        toast.error("error");
        console.log(e);
      }
    } else if (user.type === "user") {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const res = await axios.put(API_UPDATE, userData, config);
        toast.success("Profile Updated Successfully");
        navigate("/main");
        console.log(res);
      } catch (e) {
        toast.error("error");
        console.log(e);
      }
    } else {
      toast.error("Error updating profile");
    }
    console.log(userData);
  };

  console.log(formData, profile.image);
  const API_DATA = "/catogory/get";

  //uploading image
  const handleImage = async (e) => {
    const file = e.target.files[0];
    let image = new FormData();
    image.append("image", file);
    console.log([...image]);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/user/image", image, config);
      console.log("Image data", data);

      setImage({
        url: data.url,
        public_id: data.public_id,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="  p-0  text-black ">
      <div className=" py-10 mx-6 relative flex  mr-4  ">
        <form
          className=" shadow border-[4px] rounded-lg p-5"
          onSubmit={onSubmit}
        >
          <div className="h-20 w-20 rounded mx-auto">
            <label>
              <input
                type="file"
                name="image"
                id="image"
                hidden
                accept="images/*"
                className=" p-1 w-20 h-20 overflow-hidden"
                onChange={handleImage}
              />

              {image && image.url ? (
                <img
                  src={image.url}
                  alt="upload your images"
                  className="object-cover relative  mx-auto inset-0  w-20 h-20  rounded-full border shadow-sm  "
                ></img>
              ) : (
                <FaUserNinja
                  className="object-center p-1 mx-auto space-y-10 w-20 h-20  rounded-full border shadow-sm p-200 hover:cursor-pointer"
                  size={50}
                />
              )}
            </label>
          </div>
          <div className="flex">
            <div className=" p-5">
              <label className=" block  py-0 font-medium ">
                Name
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  id="name"
                  value={name}
                  className=" flex px-5 h-10 w-80 border-bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={onChange}
                />
              </label>
              <label className="block  my-5 font-medium ">
                DOB
                <input
                  type="date"
                  placeholder="Date"
                  name="dob"
                  id="dob"
                  value={dob}
                  className=" flex px-5 w-80 h-10 borderbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  onChange={onChange}
                />
              </label>

              <div className="flex space-x-10">
                <label className="block  my-5 font-medium ">
                  Phone Number:
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    name="phone"
                    id="phone"
                    value={phone}
                    className=" flex px-5 h-10 w-80 borderbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={onChange}
                  />
                </label>
                <label className="block  my-5 font-medium ">
                  Email:
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    id="email"
                    value={email}
                    className=" flex px-5 h-10 w-80 borderbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={onChange}
                    disabled
                  />
                </label>
              </div>
              <label className="block  my-5 font-medium ">
                Location
                <select
                  type="text"
                  placeholder="Location"
                  name="location"
                  id="location"
                  value={location}
                  className=" flex px-5 h-10 w-50 borderbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={onChange}
                >
                  {locations.map((location, i) => {
                    return <option>{location.city}</option>;
                  })}
                </select>
              </label>
              <div className=" flex space-x-10">
                <label className="block  my-5 font-medium ">
                  old Password
                  <input
                    type="Password"
                    placeholder="Old Password"
                    name="oldPassword"
                    id="password"
                    value={oldPassword}
                    className=" flex px-5 h-10 w-50 borderbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={onChange}
                  />
                </label>
                <label className="block  my-5 font-medium ">
                  New Password
                  <input
                    type="password"
                    placeholder="New Password"
                    name="newPassword"
                    id="ConfirmPassword"
                    value={newPassword}
                    className=" flex px-5 h-10 w-50 borderbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={onChange}
                  />
                </label>
              </div>
            </div>

            <div className=" p-5">
              {user.type === "employee" ? (
                <div>
                  <div className="flex space-x-10 ">
                    <label for="job" className=" block  py-0 font-medium">
                      Choose you Main Job
                      <select
                        name="job"
                        value={job}
                        id="job"
                        className="flex px-5 h-10 w-80 borderbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={onChange}
                      >
                        <option>none</option>

                        {jobs.map((jobs, i) => {
                          return <option>{jobs.catogory}</option>;
                        })}
                      </select>
                    </label>
                    <label className=" block  py-0 font-medium">
                      Rate
                      <input
                        type="Number"
                        placeholder="price"
                        name="price"
                        id="price"
                        value={price}
                        className=" flex px-5 w-80 h-10  borderbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500 m-0"
                        onChange={onChange}
                      />
                    </label>
                  </div>

                  <div className="flex space-x-10 my-5">
                    <label for="job" className=" block  py-0 font-medium ">
                      Choose a Job you are also skilled at :
                      <select
                        name="sjob"
                        value={sjob}
                        id="sjob"
                        className=" flex px-5 w-80 h-10 borderbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={onChange}
                      >
                        <option>none</option>

                        {jobs.map((jobs, i) => {
                          return <option>{jobs.catogory}</option>;
                        })}
                      </select>
                    </label>
                    <label className=" block  py-0 font-medium">
                      Rate
                      <input
                        type="Number"
                        placeholder="sprice"
                        name="sprice"
                        id="sprice"
                        className=" flex px-5 w-80 h-10 borderbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={sprice}
                        onChange={onChange}
                      />
                    </label>
                  </div>
                  <label className=" block  py-0 font-medium">
                    How long can you work:{wduration} (In Hours)
                  </label>
                  <input
                    type="Number"
                    placeholder="duration"
                    name="wduration"
                    id="wduration"
                    className="  flex px-5 w-80 h-10 borderbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={wduration}
                    onChange={onChange}
                  />

                  <div className="my-5">
                    <label className=" block  py-0 font-medium">
                      Choose the Location you are avilable for working
                      <select
                        className=" flex  px-5 w-80 h-10  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    </label>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <button className="object-center bg-[#7a04b5] font-medium text-white px-4 py-2 rounded space-x-20 mx-5 my-3 ">
            Update{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;
