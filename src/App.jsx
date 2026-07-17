import { useState } from "react";
// import Header from "./component/Header";
import Home from "./pages/Home";
// import About from "./pages/About";
import Login from "./pages/Login";
// import Contact from "./pages/Contact.jsx";
import TaskDetails from "./pages/TaskDetails.jsx";
import CreateTask from "./pages/CreateTask.jsx";
import "./index.css";
import Footer from "./component/Footer.jsx";
import Navbar from "./component/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound.jsx";
import Register from "./pages/Register.jsx";

function App() {
  
  const [theme, setTheme] = useState("light");

  return (
    <div className={`app ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      {/* <Navbar /> */}
      
      <main className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/createtask" element={<CreateTask />} />
          <Route path="/taskdetails" element={<TaskDetails />} />

          {/* <Route path="/contact" element={<Contact />} />

        <Route path="/about" element={<About />} /> */}

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
