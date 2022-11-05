import { useEffect, useState } from "react";
import axios from "axios";
import usr from "./icon/user.png";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

let prof = "/user/workers";
const getRating = "/user/getUserRating";

let ViewWorkerProfile = () => {
  const { user } = useSelector((state) => state.auth);

  let { id } = useParams();
  //rating link
  const ratingUrl = "/user/rating/" + id;

  const [rating, setRating] = useState();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.verify === false || !user.verify) {
      navigate("/otpverify");
    }
    async function reciveRating() {
      const values = { employeeId: id, userId: user._id };
      const rating = await axios.post(getRating, values);

      // .then((response)=>{response.data.value[0].value})
      console.log(rating.data);
      console.log(rating.data.value);
      setRating(rating.data.value);
      return rating.data.value;
    }

    const value = reciveRating();
  }, [id, user._id]);
  const [worker, setWorker] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function reciveUser() {
      const worker = await axios.get(prof);

      if (worker.data) {
        console.log(worker.data);
        setWorker(worker.data);
        localStorage.setItem("workers", JSON.stringify(worker.data));
      }
      return worker.data;
    }
    reciveUser();
  }, []);

  function submit(e) {
    setRating(e.target.value);
    console.log(rating);
  }

  // submit rating
  console.log(id);
  const submitted = (e) => {
    console.log(rating);
    const update = { rating: rating, employeeId: id, userId: user._id };
    const temp = axios
      .put(ratingUrl, update)
      .then((response) => {
        console.log(response, ratingUrl);
      })
      .catch((error) => {
        console.log(error.response, ratingUrl);
      });
    toast.success("Rated Successfully");
    navigate("/main");
    console.log(temp);
  };

  console.log(rating);
  return (
    <div>
      {worker.map((usr, i) => {
        if (id === usr._id) {
          return (
            <div>
              <body class="m-0 p-0 box-border ">
                {usr.image && usr.image.url ? (
                  <img
                    src={usr.image.url}
                    alt="logo"
                    className="w-40 h-40 object-cover rounded-full inline float-left mx-14 mt-6"
                  ></img>
                ) : (
                  <img
                    src={usr}
                    alt="logo"
                    className="w-40 h-40 object-cover inline float-left mx-14 mt-6 rounded-full"
                  ></img>
                )}
                <div className="flex flex-col">
                  <div class="flex flex-wrap w-[36rem] ml-8 mt-9  ">
                    <div>
                      <label class="mr-8 text-lg">Name</label>
                      <label class="w-60 h-7 block mb-3 roundedfont-medium indent-1.5 pr-40    px-3 bg-gray-200 mr-8">
                        {usr.name}
                      </label>
                    </div>
                    <div>
                      <label class="mr-8 text-lg">Phone</label>
                      <label class="w-60 h-7 block mb-3 rounded-[4px] font-medium indent-1.5 pr-40    px-3 bg-gray-200 mr-8">
                        {usr.phone}
                      </label>
                    </div>
                    <div>
                      <label class="mr-8 text-lg">Location</label>
                      <label class="w-60 h-7 block mb-3 rounded-[4px] font-medium indent-1.5 pr-40    px-3 bg-gray-200 mr-8">
                        {usr.location}
                      </label>
                    </div>
                    <div>
                      <label class="mr-8 text-lg">Rating</label>
                      <label class="w-60 h-7 block mb-3 rounded-[4px] font-medium indent-1.5 pr-40  px-3 bg-gray-200   mr-8">
                        {usr.rating}
                      </label>
                    </div>
                    <div>
                      <label class="mr-8 text-lg ">Job</label>
                      <label class="w-60 h-7 block rounded font-medium indent-1.5 pr-40   px-3 bg-gray-200  mr-8">
                        {usr.job}
                      </label>
                    </div>
                    <div>
                      <label class="py-0 font-medium">
                        Rate
                        <label class="w-auto h-7 block mb-3 rounded font-medium indent-1.5 pr-40    px-3 bg-gray-200 mr-8">
                          {usr.price}
                        </label>
                      </label>
                    </div>
                    <div>
                      {usr.sjob === "none" ? (
                        <div></div>
                      ) : (
                        <div className="flex ">
                          <label class=" text-lg ">
                            Second Job
                            <label className="text-lg w-60 h-7 block mb-3 rounded font-medium     px-3 bg-gray-200 mr-8">
                              {" "}
                              {usr.sjob}
                            </label>
                          </label>
                          <label className="text-lg">
                            Rate
                            <label class="text-lg w-60  block mb-3 rounded font-medium     px-3 bg-gray-200 ">
                              {""}
                              {usr.sprice}
                            </label>
                          </label>
                        </div>
                      )}
                    </div>
                    <div>
                      <select
                        class="block mr-36 text-lg my-7"
                        value={rating}
                        onChange={submit}
                      >
                        <option value="none" selected disabled hidden>
                          Select a Rating
                        </option>
                        <option value="1">Bad: 1</option>
                        <option value="2">Fair: 2</option>
                        <option value="3">Ok: 3</option>
                        <option value="4">Good: 4</option>
                        <option value="5">Excelent: 5</option>
                      </select>
                    </div>
                  </div>
                  <div className="mr-36">
                    <input
                      class="block bg-transparent hover:bg-blue-500 ml-60 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded hover:cursor-pointer"
                      type="submit"
                      onClick={submitted}
                    />
                  </div>
                </div>
              </body>
            </div>
          );
        }
      })}
    </div>
  );
};
export default ViewWorkerProfile;
