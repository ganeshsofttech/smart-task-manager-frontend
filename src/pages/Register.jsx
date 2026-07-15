import { useState } from "react";
import "../css/Register.css";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Employee",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // const response = await axios.post(
    //     "/api/auth/register",formData,
    //   );
    const response = api
      .post("/api/auth/register", formData)
      .then((response) => {
        console.log("User Created:", response.data);
        alert("✅ User Created Successfully.");

        setFormData({
          name: "",
          email: "",
          password: "",
          role: "Employee",
        });
         navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        // alert(error);
        alert(error.response?.data?.message || "Something went wrong");
      });
    // axios.post("/api/auth/register", formData)
  };
  console.log(response);
  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>

        <p className="subtitle">Register for Task Management System</p>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="input-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role */}
          <div className="input-group">
            <label>Role</label>

            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="Employee">Employee</option>

              <option value="Manager">Manager</option>

              <option value="Admin">Admin</option>
            </select>
          </div>

          <button type="submit">Register</button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <span
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
