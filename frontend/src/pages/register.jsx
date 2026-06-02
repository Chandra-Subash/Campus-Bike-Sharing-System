import { useState } from "react";
import api from "../services/api";
import "./login.css";
import { Link } from "react-router-dom";
function Register() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

    const [role,setRole] =useState("USER");

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const response = await api.post(
      "/auth/register",
      {
        name,
        email,
        password,
        role
      }
    );

    alert(response.data);

  } catch(error) {

    alert("Registration Failed");
  }
};

  return (
    <div className="auth-container">

      <h2 className="auth-title">Register</h2>

      <form onSubmit={handleSubmit}>

        <input className="auth-input"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <br />

        <input className="auth-input"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br />

        <input className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br />
        <select className="auth-select"
  value={role}
  onChange={(e)=>setRole(e.target.value)}
>

  <option value="USER">
    User
  </option>

  <option value="OWNER">
    Bike Owner
  </option>

</select>

        <button type="submit" className="auth-btn" >
          Register
        </button>

         <p className="auth-link">
          Already have an account?
          <Link to="/">
            {" "}Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Register;