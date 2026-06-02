import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddBike() {

  const navigate = useNavigate();

  const [bikeNumber, setBikeNumber] =
    useState("");

  const [model, setModel] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [pricePerHour, setPricePerHour] =
    useState("");

  const ownerId =
    localStorage.getItem("userId");

  const handleAddBike = async (e) => {

    e.preventDefault();

    try {

      const response =
        await api.post(
          "/owner/add-bike",
          {
            bikeNumber,
            model,
            location,
            pricePerHour,
            ownerId
          }
        );

      alert(response.data);

      navigate("/my-bikes");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data ||
        "Failed to add bike"
      );
    }
  };

  return (

    <div style={{ padding: "20px" }}>

      <h2>Add Bike</h2>

      <form onSubmit={handleAddBike}>

        <input
          type="text"
          placeholder="Bike Number"
          value={bikeNumber}
          onChange={(e) =>
            setBikeNumber(e.target.value)
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Bike Model"
          value={model}
          onChange={(e) =>
            setModel(e.target.value)
          }
        />

        <br /><br />

        <select
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
        >

          <option value="">
            Select Location
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

        <br /><br />

        <input
          type="number"
          placeholder="Price Per Hour"
          value={pricePerHour}
          onChange={(e) =>
            setPricePerHour(
              e.target.value
            )
          }
        />

        <br /><br />

        <button type="submit">
          Add Bike
        </button>

      </form>

    </div>
  );
}

export default AddBike;