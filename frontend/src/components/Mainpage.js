import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserNinja, FaBeer } from "react-icons/fa";

const API_DATA = "/catogory/get";
let Mainpage = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.verify === false || !user.verify) {
      navigate("/otpverify");
    }
    async function reciveCatagory() {
      const jobs = await axios.get(API_DATA);

      if (jobs.data) {
        console.log(jobs.data);
        setJobs(jobs.data);
        localStorage.setItem("jobs", JSON.stringify(jobs.data));
      }
      return jobs.data;
    }
    reciveCatagory();
  }, [user, navigate]);

  return (
    <main className=" main h-[42.6rem] overflow-x-hidden font-semibold text-black  text-2xl ">
      <div className="  m-5 rounded-md  grid grid-cols-4">
        {jobs.map((jobs, i) => {
          return (
            <div className=" border rounded-md bg-slate-100  m-auto w-[19rem] h-auto p-4 px-auto my-10 ">
              <div>
                <Link
                  className=" hover:text-black flex flex-col "
                  to={"/main/" + jobs.catogory}
                >
                  <label className=" ">
                    {jobs.image && jobs.image ? (
                      <img
                        src={jobs.image}
                        alt="upload your images"
                        className="object-cover relative  mx-auto inset-0  w-30 h-30  rounded border shadow-sm  "
                      ></img>
                    ) : (
                      <FaUserNinja
                        className="object-center p-1 mx-auto space-y-10 w-20 h-20  rounded-full border shadow-sm p-200"
                        size={50}
                      />
                    )}
                  </label>
                  <h3 className="  py-4 mx-auto">{jobs.catogory}</h3>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};
export default Mainpage;
