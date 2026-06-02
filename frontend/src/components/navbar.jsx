import { NavLink, useNavigate } from "react-router-dom";

import "../styles/Navbar.css";
function Navbar() {

  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const activeStyle = ({ isActive }) => ({
    color: isActive ? "white" : "black",
    backgroundColor: isActive ? "#007bff" : "transparent",
    padding: "8px 12px",

    borderRadius: "5px",
    textDecoration: "none",
    marginRight: "10px"
  });

  return (
    <nav className="navbar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#ddd"
      }}
    >
      <h2 className="logo" >Bike Booking System</h2>

      <div className="nav-links">

        {role === "USER" && (
          <>
            <NavLink
              to="/dashboard"
               className={({ isActive }) =>
    isActive
      ? "nav-link active"
      : "nav-link"
  }
              
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/history"
              style={activeStyle}
            >
              History
            </NavLink>
          </>
        )}

        {role === "OWNER" && (
          <>
            <NavLink
              to="/owner"
              style={activeStyle}
            >
              Dashboard
            </NavLink>

            

            <NavLink
              to="/add-bike"
              style={activeStyle}
            >
              Add Bike
            </NavLink>

            <NavLink
              to="/my-bikes"
              style={activeStyle}
            >
              My Bikes
            </NavLink>

            <NavLink
              to="/requests"
              style={activeStyle}
            >
              Requests
            </NavLink>
          </>
        )}

        {role === "ADMIN" && (
          <>
            <NavLink
              to="/admin"
              style={activeStyle}
            >
              Admin Dashboard
            </NavLink>

            <NavLink
              to="/manage-bikes"
              style={activeStyle}
            >
              Manage Bikes
            </NavLink>
          </>
        )}

        <button  className="logout-btn"
          onClick={logout}
          style={{ marginLeft: "10px" }}
        >
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;