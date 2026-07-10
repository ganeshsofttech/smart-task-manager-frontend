import React, { useState } from "react";
import Header from "./component/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Contact from "./pages/Contact.jsx";
import TaskDetails from "./pages/TaskDetails.jsx";
import CreateTask from "./pages/CreateTask.jsx";
import "./index.css";
import Footer from "./component/Footer.jsx";
import Navbar from "./component/Navbar.jsx";
import { Routes, Route, NavLink } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound.jsx";
import Register from "./pages/Register.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [theme, setTheme] = useState("light");

  const renderPage = () => {
    switch (currentPage) {
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      case "registeremployee":
        return <CreateTask />;
      case "employees":
        return <TaskDetails />;
      default:
        return <Home />;
    }
  };

  return (
    <div className={`app ${theme}`}>
      {/* <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        theme={theme}
        setTheme={setTheme}
      />
      <main style={{ padding: "20px" }}>{renderPage()}</main> */}


      <Navbar  
        theme={theme}
        setTheme={setTheme}
        
      />
{/* <Navbar /> */}
      <hr />
      <main className="content">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/home" element={<Home />} />
        <Route
          path="/createtask"
          element={<CreateTask />}
        />
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