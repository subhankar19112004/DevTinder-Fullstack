// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { BASE_URL } from '../utils/constants';
// import { useDispatch, useSelector } from 'react-redux';
// import { addConnections } from '../utils/connectionSlice';
// import { Link } from 'react-router-dom';

// const Connections = () => {
//   const [error, setError] = useState(null);
//   const dispatch = useDispatch();
//   const connections = useSelector((store) => store.connections);

//   const fetchConnections = async () => {
//     try {
//       const res = await axios.get(BASE_URL + "/user/connections", {
//         withCredentials: true
//       });
//       console.log(res.data.data);
//       dispatch(addConnections(res.data.data));
//     } catch (error) {
//       setError(error);
//     }
//   };

//   useEffect(() => {
//     fetchConnections();
//   }, []);

//   if (!connections) return null;

//   if (connections.length === 0) return (
//     <div className='flex justify-center my-10'>
//       <h1 className='font-bold text-sm text-center md:text-lg lg:text-2xl sm:text-accent  text-white'>
//         Hey Buddy, you do not have any connections 🧑‍🤝‍🧑 
//         <Link className='font-serif text-green-400' to={"/"}>Add some here</Link> to see your friend circle.
//       </h1>
//     </div>
//   );

//   return (
//     <div className='flex justify-center text-center flex-col my-10'>
//       <h1 className='font-serif text-2xl border-b-2 border-green-500 rounded-b-xl mx-40 text-white'>
//         My Connections
//       </h1>

//       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10'>
//         {connections.map((connection) => {
//           const { firstName, lastName, photoUrl, age, gender, about } = connection;
//           return (
//             <div key={firstName + lastName} className=' mx-2 bg-gray-900 text-white rounded-xl p-6 hover:shadow-none shadow-2xl/30 shadow-green-300 transition duration-300'>
//               <div className='flex justify-center mb-4'>
//                 <img src={photoUrl || 'https://via.placeholder.com/150'} alt={`${firstName} ${lastName}`} className='w-32 h-32 rounded-full object-cover border-4 border-green-500' />
//               </div>
//               <h2 className='text-2xl font-semibold'>{firstName} {lastName}</h2>
//               <p className='text-sm text-gray-400'>{age} years old - {gender}</p>
//               <p className='mt-4 text-gray-200'>{about || 'No information available.'}</p>
//               <Link to={`/profile/${firstName + lastName}`} className='mt-4 inline-block text-green-400 hover:underline'>
//                 View Profile
//               </Link>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Connections;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import { Link } from 'react-router-dom';

const Connections = () => {
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user profile
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const openModal = (connection) => {
    setSelectedUser(connection);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null); // Clear selected user when closing
  };

  if (!connections) return null;

  if (connections.length === 0) return (
    <div className='flex justify-center my-10'>
      <h1 className='font-bold text-sm text-center md:text-lg lg:text-2xl sm:text-accent  text-white'>
        Hey Buddy, you do not have any connections 🧑‍🤝‍🧑 
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
            <div key={firstName + lastName} className='mx-2 bg-gray-900 text-white rounded-xl p-6 hover:shadow-none shadow-2xl/30 shadow-green-300 transition duration-300'>
              <div className='flex justify-center mb-4'>
                <img src={photoUrl || 'https://via.placeholder.com/150'} alt={`${firstName} ${lastName}`} className='w-32 h-32 rounded-full object-cover border-4 border-green-500' />
              </div>
              <h2 className='text-2xl font-semibold'>{firstName} {lastName}</h2>
              <p className='text-sm text-gray-400'>{age} years old - {gender}</p>
              <p className='mt-4 text-gray-200'>{about || 'No information available.'}</p>
              <button
                onClick={() => openModal(connection)}
                className='mt-4 inline-block text-green-400 hover:underline'
              >
                View Profile
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal for Profile Details */}
      {isModalOpen && selectedUser && (
        <div className='fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50'>
          <div className='bg-gray-900 text-white rounded-xl w-96 p-8 shadow-lg transition-transform transform scale-95 duration-500'>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-semibold'>{selectedUser.firstName} {selectedUser.lastName}</h2>
              <button
                onClick={closeModal}
                className='text-white text-2xl font-semibold hover:text-gray-400'
              >
                &times;
              </button>
            </div>

            <div className='flex justify-center my-4'>
              <img
                src={selectedUser.photoUrl || 'https://via.placeholder.com/150'}
                alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                className='w-32 h-32 rounded-full object-cover border-4 border-green-500'
              />
            </div>

            <div className='text-gray-200'>
              <p className='mb-2'>Age: {selectedUser.age}</p>
              <p className='mb-2'>Gender: {selectedUser.gender}</p>
              <p className='mb-4'>{selectedUser.about || 'No information available.'}</p>

              <h3 className='text-xl font-semibold mb-2'>Skills</h3>
              <div className='flex flex-wrap gap-2'>
                {selectedUser.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs bg-gray-700 text-white rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connections;

