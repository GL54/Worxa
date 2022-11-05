import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const CatogoryUrl = "/user/workers";
let AllData = () => {
  const navigate = useNavigate();

  let { catogory } = useParams();
  const [worker, setWorker] = useState([]);
  // const [formData,setFormData,]=useState({
  //  sorting:''
  // })
  const [sorting, setSort] = useState("");

  // const {sorting} = formData

  async function reciveWorkers() {
    const worker = await axios.get(CatogoryUrl);

    return worker.data;
  }
  reciveWorkers();
  const onChange = async (e) => {
    e.preventDefault();
    setSort(await e.target.value);
    if (sorting === "sortRate") {
      console.log("Sorted");
    }
  };

  return (
    <main className="  main h-[42.6rem]  overflow-x-hidden font-semibold text-black   text-2xl ">
      <div className="m-5">
        <h3>{catogory}</h3>

        <label className=" p-1 rounded object-center bg-gray-700 text-white  text-sm ">
          Sort By:
          <select
            className=" object-center bg-gray-700  rounded "
            value={sorting}
            name="sorting"
            onChange={onChange}
          ></select>
        </label>
        <div className="  my-3 rounded-md m-5 grid grid-cols-4 gap-20"></div>
      </div>
    </main>
  );
};
export default AllData;
