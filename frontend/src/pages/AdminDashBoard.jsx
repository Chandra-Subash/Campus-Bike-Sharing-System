
import Navbar
from "../components/Navbar";

function AdminDashboard() {

  return (

    <>
      <Navbar />

      <div
        style={{
          padding:"20px"
        }}
      >

      <h2>
        Admin Dashboard
      </h2>

      <div>

        <h3>
          Total Bikes : 50
        </h3>

        <h3>
          Active Bookings : 15
        </h3>

        <h3>
          Users : 100
        </h3>

      </div>

      </div>
    </>
  );
}

export default AdminDashboard;

