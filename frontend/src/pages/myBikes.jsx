import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function MyBikes() {

  const navigate = useNavigate();

  const [bikes, setBikes] = useState([]);

  const ownerId =
    localStorage.getItem("userId");

  const fetchBikes = async () => {

    try {

      const response =
        await api.get(
          `/owner/my-bikes/${ownerId}`
        );
        console.log(response.data);

      setBikes(response.data);

    } catch (error) {

      console.log(error);

      alert("Failed to load bikes");
    }
  };

  useEffect(() => {

    fetchBikes();

  }, []);

  const deleteBike = async (id) => {

    try {

      await api.delete(
        `/owner/delete-bike/${id}`
      );

      alert("Bike Deleted");

      fetchBikes();

    } catch (error) {

      console.log(error);

      alert("Delete Failed");
    }
  };

  return (

    <div style={{ padding: "20px" }}>

      <h2>
        My Bikes
      </h2>

      <button
        onClick={() =>
          navigate("/add-bike")
        }
      >
        Add New Bike
      </button>

      <hr />

      {
        bikes.length === 0 ? (

          <h3>
            No Bikes Added
          </h3>

        ) : (

          bikes.map((bike) => (

            <div
              key={bike.id}
              style={{
                border: "1px solid black",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px"
              }}
            >

              <h3>
                {bike.model}
              </h3>

              <p>
                <strong>
                  Bike Number:
                </strong>{" "}
                {bike.bikeNumber}
              </p>

              <p>
                <strong>
                  Location:
                </strong>{" "}
                {bike.location}
              </p>

              <p>
                <strong>
                  Price:
                </strong>{" "}
                ₹{bike.pricePerHour}/hour
              </p>

              <p>
                <strong>
                  Status:
                </strong>

                <span
                  style={{
                    color:
                      bike.status ===
                      "AVAILABLE"
                        ? "green"
                        : "red",
                    fontWeight:
                      "bold"
                  }}
                >
                  {" "}
                  {bike.status}
                </span>
              </p>

              <button
                onClick={() =>
                  deleteBike(bike.id)
                }
              >
                Delete
              </button>

            </div>

          ))

        )
      }

    </div>
  );
}

export default MyBikes;