import React from "react";

const UserCard = ({ user }) => {
  console.log(user);
  const { firstName, lastName, photoURL, age, gender, about } = user;
  return (
    <div>
      <div className="card bg-secondary-content w-96 shadow-sm mb-20">
        <figure>
          <img src={photoURL} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-xl font-bold">{firstName + " " + lastName}</h2>
          {age && gender && <p className="text-lg">{age + ", " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary text-lg font-bold">Ignore</button>
            <button className="btn btn-secondary text-lg font-bold">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
