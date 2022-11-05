import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import usr from "./icon/user.png";

let Profile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.verify === false || !user.verify) {
      navigate("/otpverify");
    }
    async function profile() {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const profile = await axios.get("/user/profile", config);
      if (profile.data) {
        setProfile(profile.data);
        localStorage.setItem("profile", JSON.stringify(profile.data));

        // console.log("Response from protected API: " + profile.data.image.url);
      }
      return profile.data;
    }
    profile();
  }, [user, navigate]);

  return (
    //To add background color
    <div class="">
      <body class="b-0 m-0 box-border">
        <div class=" font-['Jost',sans-serif] overflow-hidden">
          <div class="bg-white rounded  w-[73rem] border-black  mt-16 ml-6">
            <div>
              {profile.image && profile.image.url ? (
                <img
                  class="w-40 h-40 object-cover inline float-left mx-14 mt-6 rounded-full"
                  src={profile.image.url}
                  alt="logo"
                ></img>
              ) : (
                <img
                  class="w-40 h-40 object-cover inline float-left mx-14 mt-6 rounded-full"
                  src={usr}
                  alt="logo"
                ></img>
              )}
            </div>
            {user ? (
              <div>
                <div class="flex flex-wrap w-[56rem]">
                  <div>
                    <label class="mr-8 text-lg">Name</label>
                    <label class="w-60 h-7 block mb-3 rounded-[4px] font-medium indent-1.5 pr-40   bg-[#e0dede] mr-8">
                      {profile.name}
                    </label>
                  </div>
                  <div>
                    <label class="mr-8 text-lg">Email</label>
                    <label class="w-60 h-7 block mb-3 rounded-[4px] font-medium indent-1.5 pr-40   bg-[#e0dede] mr-8">
                      {profile.email}
                    </label>
                  </div>
                  <div>
                    <label class="mr-8 text-lg">Phone</label>
                    <label class="w-60 h-7 block mb-3 rounded-[4px] font-medium indent-1.5 pr-40   bg-[#e0dede] mr-8">
                      {profile.phone}
                    </label>
                  </div>
                  <div>
                    <label class="mr-8 text-lg">DOB</label>
                    <label class="w-60 h-7 block mb-3 rounded-[4px] font-medium indent-1.5  bg-[#e0dede] mr-8">
                      {profile.dob}
                    </label>
                  </div>
                  <div>
                    <label class="mr-8 text-lg">Location</label>
                    <label class="w-60 h-7 block mb-3 rounded-[4px] font-medium indent-1.5 pr-40   bg-[#e0dede] mr-8">
                      {profile.location}
                    </label>
                  </div>
                  {profile.type === "employee" ? (
                    <div class="flex flex-wrap">
                      <div>
                        <label class="mr-8 text-lg">Work Location</label>{" "}
                        <label class="w-60 h-7 block mb-3 rounded-[4px] font-medium indent-1.5   bg-[#e0dede] mr-8 ">
                          {profile.wlocation}
                        </label>
                      </div>
                      <div>
                        <label class="mr-8 text-lg">Main job</label>
                        <label class="w-60 h-7 block mb-3 rounded-[4px] font-medium indent-1.5  bg-[#e0dede] mr-8 ">
                          {profile.job}
                        </label>
                      </div>
                      <div>
                        <label class="mr-8 text-lg">
                          Rate of {profile.job}
                        </label>
                        <label class="w-60 h-7 block mb-3 rounded-[4px] font-medium indent-1.5  bg-[#e0dede] mr-8">
                          {profile.price}
                        </label>
                      </div>
                      <div>
                        <label class="mr-8 text-lg">Second job</label>{" "}
                        <label class="w-60 h-7 block mb-3 rounded-[4px] font-medium indent-1.5  bg-[#e0dede] mr-8 ">
                          {profile.sjob}
                        </label>
                      </div>
                      <div>
                        <label class="mr-8 text-lg">
                          Rate of {profile.sjob}
                        </label>
                        <label class="w-60 h-7 block mb-3 rounded-[4px] font-medium indent-1.5 bg-[#e0dede] mr-8 ">
                          {profile.sprice}
                        </label>
                      </div>
                      <div>
                        <label class="mr-8 text-lg">Duration of work</label>
                        <label class="w-60 h-7 block mb-3 rounded-[4px] font-medium indent-1.5  bg-[#e0dede] mr-8 ">
                          {profile.wduration}hr
                        </label>
                      </div>
                      <div>
                        <label class="mr-8 text-lg">Rating</label>
                        <label class="w-60 h-7 block mb-3 rounded-[4px] font-medium indent-1.5  bg-[#e0dede] mr-8 ">
                          {profile.rating}
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            ) : (
              navigate("/login")
            )}

            <div class="absolute">
              <Link to="/settings">
                <button class="block mx-20 text-white bg-purple-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 relative top-20 ">
                  Edit Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};
export default Profile;
