import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./login.css";
import api from "../services/api";
function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response =
        await api.post(
          "/auth/login",
          {
            email,
            password
          }
        );

      if (response.data.message === "Login Success") {



        localStorage.setItem(
          "userId",
          response.data.id
        );

        localStorage.setItem(
          "userName",
          response.data.name
        );

        localStorage.setItem(
          "role",
          response.data.role
        );

        if (response.data.role === "OWNER") {



          navigate("/owner");

        } else if (response.data.role === "ADMIN") {



          navigate("/admin");

        } else {
          navigate("/dashboard");
        }
      }


    }
    catch (error) {

      alert("Invalid Credentials");
      console.log(error);
    };
  }
  return (
    <div className="auth-container">

      <h2 className="auth-title">Login</h2>
      <br/>

      <form onSubmit={handleLogin}>

        <input className="auth-input"
          type="email"
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

        <button type="submit" className="auth-btn">
          Login
        </button>
        <p className="auth-link">
          Don't have an account?
          <Link to="/register"> Register Here</Link>
        </p>

      </form>

    </div>
  );

}
export default Login;