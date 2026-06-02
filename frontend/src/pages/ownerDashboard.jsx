import Navbar from "../components/Navbar";
import "../styles/OwnerDashboard.css";
import {useEffect ,useState } from "react";
import api from "../services/api";

function OwnerDashboard() {

  const [totalBikes, setTotalBikes] =
    useState(0);

  const [availableBikes,
         setAvailableBikes] =
    useState(0);
  const [pendingRequests,
       setPendingRequests] =
    useState(0);

  const [bookedBikes,
         setBookedBikes] =
    useState(0);

  const ownerId =
    localStorage.getItem("userId");

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const response =
        await api.get(
          `/owner/my-bikes/${ownerId}`
        );

      const bikes =
        response.data;

      setTotalBikes(
        bikes.length
      );

      setAvailableBikes(

        bikes.filter(
          bike =>
            bike.status ===
            "AVAILABLE"
        ).length

      );

      setBookedBikes(

        bikes.filter(
          bike =>
            bike.status ===
            "BOOKED"
        ).length

      );
      const requestsResponse =
      await api.get(
        `/owner/requests/${ownerId}`
      );

    const pendingCount =

      requestsResponse.data.filter(
        request =>
          request.status ===
          "PENDING"
      ).length;

    setPendingRequests(
      pendingCount
    );



  } catch(error) {

      console.log(error);
    }
  };
  return (

    <>
      <Navbar />

      <div className="owner-dashboard" style={{padding:"20px"}}>

        <h1 className="owner-title">Owner Dashboard</h1>

        <div className="stats-container">

          <h3 className="stat-card">My Bikes : {totalBikes}</h3>

          <h3 className="stat-card">Available Bikes : {availableBikes}</h3>

          <h3 className="stat-card">Booked Bikes : {bookedBikes}</h3>

          <h3 className="stat-card">Pending Requests :{pendingRequests} </h3>

          <h3 className="stat-card">Earnings : ₹12,000</h3>

        </div>

      </div>
    </>
  );
}

export default OwnerDashboard;