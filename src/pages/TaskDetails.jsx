import { useEffect, useState } from "react";
import "../css/TaskDashboard.css";
import api from "../Services/api";
import { useNavigate } from "react-router-dom";
const TaskDashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    api
      .get("http://localhost:3000/api/tasks/getTask")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, []);

  const deleteTask = (id) => {
    api
      .delete(`http://localhost:3000/api/tasks/deleteTask/${id}`)
      .then((response) => {
        console.log("Task deleted:", response.data);
        alert(response.data.message);

        // Remove deleted employee from UI
        setTasks((tasks) => tasks.filter((task) => task._id !== id));
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Task Dashboard</h2>

        <button
          className="create-btn"
          onClick={() => {
            navigate("/createtask");
          }}
        >
          + Create Task
        </button>
      </div>

      <div className="task-grid">
        {tasks.map((task) => (
          <div className="task-card" key={task._id}>
            <div className="task-header">
              <h3>{task.title}</h3>

              <span
                className={`status ${task.status
                  .replace(" ", "")
                  .toLowerCase()}`}
              >
                {task.status}
              </span>
            </div>

            <p className="description">{task.description}</p>

            <div className="task-info">
              <p>
                <b>Priority:</b>
                <span className="priority">{task.Priority}</span>
              </p>

              <p>
                <b>Assigned To:</b>
                {task.assignedTo.name}
              </p>
            </div>

            <div className="actions">
              <button className="edit">Edit</button>

              <button className="delete" onClick={() => deleteTask(task._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskDashboard;
