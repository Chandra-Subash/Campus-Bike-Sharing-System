

import Navbar from "../components/Navbar";
import "../styles/dashboard.css";

import { useState, useEffect } from "react";
import api from "../services/api";

function Dashboard() {

  const bookBike = async (bike) => {

  try {

    const userId =
      localStorage.getItem("userId");

    const response =
      await api.post(
        "/booking/book-bike",
        {
          userId: Number(userId),
          bikeId: bike.id
        }
      );

    alert(response.data);
    fetchBikes();

  } catch (error) {

    console.log(error);

    alert("Booking Failed");
  }
};
  const [searchTerm, setSearchTerm] =
    useState("");


    const [allBikes, setAllBikes] =
  useState([]);
const fetchBikes = async () => {

  try {

    const response =
      await api.get(
        "/user/available-bikes"
      );

    console.log(response.data);

    setAllBikes(
      response.data
    );

  } catch(error) {

    console.log(error);
  }
};

const [location, setLocation] =
  useState("");
  useEffect(() => {

  fetchBikes();

}, []);


  const filteredBikes = allBikes.filter((bike) => {

    const matchesLocation =
      location === "" ||
      bike.location === location;

    const matchesSearch =
      bike.model
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    return (
      matchesLocation &&
      matchesSearch &&
      bike.status === "AVAILABLE"
    );
  });
  return (

    <>
      <Navbar />

      <div style={{ padding: "20px" }} className="dashboard-container">

        <div className="filter-section"
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px"
          }}
        >

          <input className="search-input"
            type="text"
            placeholder="Search by bike model..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            style={{
              padding: "8px",
              width: "250px"
            }}
          />


        </div>

        <h2 className="dashboard-title">
          Available Bikes
        </h2>

        <select  className="location-select"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
        >

          <option value="">
            All Locations
          </option>

          <option value="CB">
            CB
          </option>

          <option value="Hostel">
            Hostel
          </option>

          <option value="AB">
            AB
          </option>

        </select>

        <hr />
        {
          filteredBikes.length === 0 && (
            <h3 className="no-bikes">No Bikes Found</h3>
          )
        }
        {

          filteredBikes.map((bike) => (

            <div  className="bike-card"
              key={bike.id}
              style={{
                border: "1px solid gray",
                padding: "15px",
                marginBottom: "15px"
              }}
            >

              <h3 className="bike-model">
                {bike.model}
              </h3>

              <p className="bike-info">
                Bike Number:
                {bike.bikeNumber}
              </p>

              <p className="bike-info">
                Owner:
                {bike.owner?.name}
              </p>

              <p className="bike-info">
                Location:
                {bike.location}
              </p>

              <p className="bike-info">
                Price:
                ₹{bike.pricePerHour}/hour
              </p>

              <button  className="book-btn"
                onClick={() =>
                  bookBike(bike)
                }
              >
                Book Bike
              </button>

            </div>


          ))
        }

      </div>
    </>
  );
}

export default Dashboard;