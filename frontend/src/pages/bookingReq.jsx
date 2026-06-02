import { useState, useEffect } from "react";
import api from "../services/api";
function BookingRequests() {

  const [requests, setRequests] =
    useState([]);

  const fetchRequests = async () => {

  try {

    const ownerId =
      localStorage.getItem("userId");

    const response =
      await api.get(
        `/owner/requests/${ownerId}`
      );

    console.log(response.data);

    setRequests(response.data);

  } catch(error) {

    console.log(error);

    alert("Failed to load requests");
  }
};
  useEffect(() => {

  fetchRequests();

  }, []);

  const acceptRequest = async (id) => {

    try {

      await api.put(
        `/booking/accept/${id}`
      );

      fetchRequests();

    } catch (error) {

      console.log(error);
    }
  };
  const rejectRequest = async (id) => {

    try {

      await api.put(
        `/booking/reject/${id}`
      );

      fetchRequests();

    } catch (error) {

      console.log(error);
    }
  };



  return (

    <div style={{ padding: "20px" }}>

      <h2>Booking Requests</h2>

      {
        requests.length === 0 ? (

          <h3>No Requests Available</h3>

        ) : (

          requests.map((request) => (

            <div
              key={request.id}
              style={{
                border: "1px solid black",
                padding: "15px",
                marginBottom: "15px"
              }}
            >

              <h3>
                Request #{request.id}
              </h3>

              <p>
                User:
                {request.user?.name}
              </p>

              <p>
                Bike:
                {request.bike?.model}
              </p>

              <p>
                Bike Number:
                {request.bike?.bikeNumber}
              </p>

              <p>
                Location:
                {request.bike?.location}
              </p>

              <p>
                Booking Date:
                {request.bookingDate}
              </p>

              <p>
                Status:
                <strong>
                  {request.status}
                </strong>
              </p>

              {
                request.status === "PENDING" && (

                  <>
                    <button
                      onClick={() =>
                        acceptRequest(request.id)
                      }
                    >
                      Accept
                    </button>

                    {" "}

                    <button
                      onClick={() =>
                        rejectRequest(
                          request.id
                        )
                      }
                    >
                      Reject
                    </button>
                  </>

                )
              }

            </div>

          ))

        )
      }

    </div>
  );
}

export default BookingRequests;