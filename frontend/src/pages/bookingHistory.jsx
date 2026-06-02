import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function bookingHistory() {

  const [history, setHistory] =
    useState([]);

  const userId =
    localStorage.getItem("userId");

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory = async () => {

    try {

      const response =
        await api.get(
          `/booking/history/${userId}`
        );

      console.log(response.data);

      setHistory(
        response.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <>
      <Navbar />

      <div style={{ padding: "20px" }}>

        <h2>
          Booking History
        </h2>

        {
          history.length === 0 ? (

            <h3>
              No Bookings Found
            </h3>

          ) : (

            history.map((booking) => (

              <div
                key={booking.id}
                style={{
                  border: "1px solid gray",
                  padding: "15px",
                  marginBottom: "15px",
                  borderRadius: "8px"
                }}
              >

                <h3>
                  {booking.bike?.model}
                </h3>

                <p>
                  Location:
                  {" "}
                  {booking.bike?.location}
                </p>

                <p>
                  Booking Date:
                  {" "}
                  {booking.bookingDate}
                </p>

                <p>

                  Status:

                  <span
                    style={{
                      color:
                        booking.status ===
                        "ACCEPTED"
                          ? "green"
                          : booking.status ===
                            "REJECTED"
                          ? "red"
                          : "orange",

                      fontWeight:
                        "bold"
                    }}
                  >
                    {" "}
                    {booking.status}
                  </span>

                </p>

              </div>

            ))

          )
        }

      </div>

    </>
  );
}

export default bookingHistory;