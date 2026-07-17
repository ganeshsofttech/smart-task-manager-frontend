import { useEffect, useState } from "react";
import "../css/TaskDashboard.css";
import api from "../Services/api";
import { useNavigate } from "react-router-dom";

const TaskDashboard = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    api
      .get("/api/tasks/getTask")
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
      .delete(`/api/tasks/deleteTask/${id}`)
      .then((response) => {
        console.log("Task deleted:", response.data);
        alert(response.data.message);

        setTasks((tasks) =>
          tasks.filter((task) => task._id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  // Summary Metrics
  const totalTasks = tasks.length;

  const inProgressCount = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const highPriorityCount = tasks.filter(
    (task) =>
      task.Priority &&
      task.Priority.toLowerCase() === "high"
  ).length;

  // Filtering
  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  return (
    <div className="container py-4">

      {/* Header */}
      <div className="dashboard-header d-flex justify-content-between align-items-center mb-4">
        <h2>Task Dashboard</h2>

        <button
          className="create-btn"
          onClick={() => navigate("/createtask")}
        >
          + Create Task
        </button>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">

        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm rounded-3 bg-light">
            <div className="card-body">
              <h6 className="text-muted">Total Tasks</h6>
              <h3>{totalTasks}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm rounded-3 bg-primary-subtle">
            <div className="card-body">
              <h6 className="text-muted">In Progress</h6>
              <h3>{inProgressCount}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-12 col-lg-4">
          <div className="card shadow-sm rounded-3 bg-danger-subtle">
            <div className="card-body">
              <h6 className="text-muted">High Priority</h6>
              <h3>{highPriorityCount}</h3>
            </div>
          </div>
        </div>

      </div>

      {/* Filter Row */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4 bg-light">

        <h5 className="mb-0">
          Showing {filteredTasks.length} Tasks
        </h5>

        <div className="btn-group">

          <button
            className={`btn ${
              filter === "All"
                ? "btn-primary"
                : "btn-outline-secondary"
            }`}
            onClick={() => setFilter("All")}
          >
            All
          </button>

          <button
            className={`btn ${
              filter === "Pending"
                ? "btn-primary"
                : "btn-outline-secondary"
            }`}
            onClick={() => setFilter("Pending")}
          >
            Pending
          </button>

          <button
            className={`btn text-nowrap ${
              filter === "In Progress"
                ? "btn-primary"
                : "btn-outline-secondary"
            }`}
            onClick={() => setFilter("In Progress")}
          >
            In Progress
          </button>

          <button
            className={`btn ${
              filter === "Completed"
                ? "btn-primary"
                : "btn-outline-secondary"
            }`}
            onClick={() => setFilter("Completed")}
          >
            Completed
          </button>

        </div>
      </div>

      {/* Task List */}
      <div className="task-grid pt-3">

        {filteredTasks.length === 0 ? (
          <h4 className="text-center text-muted">
            No Tasks Found
          </h4>
        ) : (
          filteredTasks.map((task) => (
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

              <p className="description">
                {task.description}
              </p>

              <div className="task-info">
                <p>
                  <b>Priority:</b>{" "}
                  <span className="priority">
                    {task.Priority}
                  </span>
                </p>

                <p>
                  <b>Assigned To:</b>{" "}
                  {task.assignedTo?.name}
                </p>
              </div>

              <div className="actions">

                <button
                  className="edit"
                  onClick={() =>
                    navigate("/createtask", {
                      state: {
                        task: task,
                      },
                    })
                  }
                >
                  Edit
                </button>

                <button
                  className="delete"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default TaskDashboard;