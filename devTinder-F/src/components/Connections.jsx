import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import { Link } from 'react-router-dom';

const Connections = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) return (
    <div className='flex justify-center my-10'>
      <h1 className='font-bold text-2xl text-white'>
        Hey Buddy, you do not have any connections 🧑‍🤝‍🧑. 
        <Link className='font-serif text-green-400' to={"/"}>Add some here</Link> to see your friend circle.
      </h1>
    </div>
  );

  return (
    <div className='flex justify-center text-center flex-col my-10'>
      <h1 className='font-serif text-2xl border-b-2 border-green-500 rounded-b-xl mx-40 text-white'>
        My Connections
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10'>
        {connections.map((connection) => {
          const { firstName, lastName, photoUrl, age, gender, about } = connection;
          return (
            <div key={firstName + lastName} className=' mx-2 bg-gray-900 text-white rounded-xl p-6 hover:shadow-none shadow-2xl/30 shadow-green-300 transition duration-300'>
              <div className='flex justify-center mb-4'>
                <img src={photoUrl || 'https://via.placeholder.com/150'} alt={`${firstName} ${lastName}`} className='w-32 h-32 rounded-full object-cover border-4 border-green-500' />
              </div>
              <h2 className='text-2xl font-semibold'>{firstName} {lastName}</h2>
              <p className='text-sm text-gray-400'>{age} years old - {gender}</p>
              <p className='mt-4 text-gray-200'>{about || 'No information available.'}</p>
              <Link to={`/profile/${firstName + lastName}`} className='mt-4 inline-block text-green-400 hover:underline'>
                View Profile
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
