import { useEffect, useState } from "react";
import "../css/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //   const handleSubmit = (e) => {
  //     e.preventDefault();

  //     console.log({
  //       email,
  //       password,
  //     });
  //   useEffect(() => {
  //     axios
  //       .post("http://localhost:3000/api/auth/login", {
  //           email: email,
  //           password: password
  //         })
  //       .then((response) => {
  //         alert(response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         alert(error);
  //       });
  //   }, []);

  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        },
      );
      // const response = await axios
      //   .post("http://localhost:3000/api/auth/login", {
      //     email,
      //     password,
      //   })
      //   .then((response) => {
      //     console.log("Login:", response.data);
      //     alert("✅ Login successful.");
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     // alert(error);
      //     alert(error.response?.data?.message || "Something went wrong");
      //   });
      console.log(response.data);
      // Get token from API response
      const token = response.data.token;

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Store user details (optional)
      // localStorage.setItem(
      //   "user",
      //   JSON.stringify(response.data.user)
      // );
      alert("✅ Login successful.");
       navigate("/home");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Invalid credentials");
    }
  };
  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "/login";
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="register-text">
          Don't have an account?{" "}
          <span
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
