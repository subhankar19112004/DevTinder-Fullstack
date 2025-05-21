import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../utils/resquestsSlice'
import { Link } from 'react-router-dom'

const Requests = () => {

  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const user = useSelector((store) => store.user);


  const fetchReRequests = async () => {
    try {
      const res =  await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials:true
      });
      console.log(res.data);
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchReRequests();
  }, []);

  if (!requests) {
    return (
      <>
        <div className="font-bold text-sm flex justify-center mt-[10%] items-center text-center md:text-lg lg:text-2xl sm:text-accent  text-white">
          {" "}
          Hey {user?.firstName} no requests for you 😔{" "}
        </div>
        <div className="font-bold text-sm flex justify-center items-center text-center md:text-lg lg:text-2xl sm:text-accent  text-white">
          <p>
            Continue to explore{" "}
            <span className=" text-green-500 font-serif">
              <Link to={"/connections"}>your connections</Link>
            </span>{" "}
            or{" "}
            <span className=" text-red-500 font-serif">
              <Link to={"/feed"}>your feed</Link>
            </span>{" "}
          </p>
        </div>
      </>
    );
  }

  return requests &&(
    <div>{requests[0].fromUserId.firstName}</div>
  )
}

export default Requests;