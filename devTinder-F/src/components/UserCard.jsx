import React from "react";

const UserCard = ({ user }) => {
  const { photoUrl, firstName, lastName, skills, about, age, gender } = user;
  return (
    <div>
      <div className="card bg-base-300 rounded-md w-96 shadow-2xl/30 shadow-pink-500">
        <figure>
          <img src={photoUrl} alt={firstName} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p className="text-blue-500" >{age + " "} <span className="text-yellow-400 uppercase">{gender}</span></p>}
          <p className="text-sm text-blue-400">
            {Array.isArray(skills) ? skills.join(", ") : skills}
          </p>
          <p>{about}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary bg-amber-500 rounded-sm">Ignore</button>
            <button className="btn btn-primary bg-blue-900 hover:bg-blue-400 rounded-sm">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
