import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import usr from "./icon/user.png";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CatogoryUrl = "/user/workers";
let ViewWorker = ({ data }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  let { catogory } = useParams();
  const [worker, setWorker] = useState([]);
  // const [formData,setFormData,]=useState({
  //  sorting:''
  // })
  const [sorting, setSort] = useState("");

  // const {sorting} = formData
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.verify === false || !user.verify) {
      navigate("/otpverify");
    }
    async function reciveWorkers() {
      const worker = await axios.get(CatogoryUrl);

      if (worker.data) {
        console.log(worker.data);
        setWorker(worker.data);
        localStorage.setItem("workerlist", JSON.stringify(worker.data));
      }
      if (sorting === "sortRate") {
        const temp = await worker.data.sort((a, b) =>
          Number(a.rating) < Number(b.rating) ? 1 : -1
        );
        console.log(temp);
        setWorker(temp);
      }
      if (sorting === "sortPrice") {
        const temp = await worker.data.sort((a, b) =>
          Number(a.price) > Number(b.price) ? 1 : -1
        );
        console.log(temp);
        setWorker(temp);
      }
      return worker.data;
    }

    reciveWorkers();
  }, [sorting]);
  const onChange = async (e) => {
    e.preventDefault();
    setSort(await e.target.value);
    if (sorting === "sortRate") {
      console.log("Sorted");
    }
  };

  function loc(worker) {
    return data.toLowerCase()
      ? worker.location.toLowerCase() === data.toLowerCase()
      : worker.location.toLowerCase() === user.location.toLowerCase();
    //  || worker.wlocation.toLowerCase()===data.toLowerCase()
  }

  return (
    <main className="  main h-[42.6rem]  overflow-x-hidden font-semibold text-black   text-2xl ">
      <div className="m-5">
        <h1>Workers in {data || user.location}</h1>

        <h3>{catogory}</h3>

        <label className=" p-1 rounded object-center bg-gray-700 text-white  text-sm ">
          Sort By:
          <select
            className=" object-center bg-gray-700  rounded "
            value={sorting}
            name="sorting"
            onChange={onChange}
          >
            <option value="none">none</option>
            <option value="sortRate">rating</option>
            <option value="sortPrice">price</option>
          </select>
        </label>
        <div className="  my-3 rounded-md m-5 grid grid-cols-4 gap-20">
          {worker
            // .filter(Sort)
            .filter(loc)

            .map((worker, i) => {
              if (
                catogory.toLowerCase() === worker.job.toLowerCase() ||
                catogory.toLowerCase() === worker.sjob.toLowerCase()
              ) {
                return (
                  <div className=" border border-blue-200 rounded-md p-2 bg-slate-100 my-0 mx-1 ">
                    <div className="">
                      <Link
                        to={"/main/" + catogory + "/" + worker._id}
                        className=" text-black hover:text-black flex flex-col   mx-2 "
                      >
                        <div className=" ">
                          <label className="">
                            {worker.image && worker.image.url ? (
                              <img
                                src={worker.image.url}
                                alt="logo"
                                className="object-cover relative   mx-auto inset-0  w-22 h-25 mt-3 rounded border shadow-sm  "
                              ></img>
                            ) : (
                              <img
                                src={usr}
                                alt="logo"
                                className="object-cover relative   mx-auto inset-0  w-25 h-25 mt-3 rounded-full border shadow-sm "
                              ></img>
                            )}
                          </label>
                        </div>

                        <div className="mt-1 text-sm">
                          <div className="  ">
                            <div className="font-semibold text-[2rem] ">
                              {" "}
                              {worker.name}
                            </div>
                            <div className="flex mt-3">
                              <AiFillStar className="mt-[3px]" />
                              <div>{worker.rating}/5</div>
                            </div>
                          </div>
                          <div>
                            <div className="flex gap-2">
                              Price:
                              <div className="font-sans">
                                ₹
                                {catogory.toLowerCase() ===
                                worker.sjob.toLowerCase()
                                  ? worker.sprice
                                  : worker.price}
                              </div>
                            </div>
                            <div className="">{worker.location}</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <br />
                  </div>
                );
              }
            })}
        </div>
      </div>
    </main>
  );
};
export default ViewWorker;
