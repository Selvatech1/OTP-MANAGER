import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Dashboard.css'; 

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  const userValid = async () => {
    let token = localStorage.getItem("userdbtoken");
    if (token) {
      try {
        const response = await axios.get("https://server-yazi.onrender.com/user/data", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          setUserData(response.data); // Assuming response.data is an array of users
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
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {userData.length > 0 ? (
        userData.map(user => (
          <div key={user._id} className="card">
            <h2>{user.fname}</h2>
            <p>Email: {user.email}</p>
            <p>User: {user.fname}</p>
            <p>Id: {user._id}</p>
            {/* Add more fields as necessary */}
          </div>
        ))
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
