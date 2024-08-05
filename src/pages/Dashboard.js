import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../services/Apis'; // Ensure this path is correct

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const userValid = async () => {
    let token = localStorage.getItem("userdbtoken");
    if (token) {
      try {
        const response = await getUserData(token);
        if (response.status === 200) {
          setUserData(response.data);
        } else {
          navigate("*");
        }
      } catch (error) {
        console.log(error);
        navigate("*");
      }
    } else {
      navigate("*");
    }
  }

  useEffect(() => {
    userValid();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {userData ? (
        <div className="card">
          <h2>{userData.name}</h2>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.role}</p>
          {/* Add more fields as necessary */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
