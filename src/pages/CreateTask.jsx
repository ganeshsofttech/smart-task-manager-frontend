import { useEffect, useState } from "react";
import "../css/TaskForm.css";
import axios from "axios";
import api from "../Services/api";
const CreateTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    Priority: "Medium",
    assignedTo: "",
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(task);

    // axios.post("/api/tasks", task)
    api
      .post("http://localhost:3000/api/tasks/createTask", task)
      .then((response) => {
        console.log("Task Created:", response.data);
        alert("✅ Created Successfully.");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });


  };

  return (
    <div className="task-container">
      <div className="task-card">
        <h2>Create Task</h2>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="input-group">
            <label>Title</label>

            <input
              type="text"
              name="title"
              placeholder="Enter task title"
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="input-group">
            <label>Description</label>

            <textarea
              name="description"
              placeholder="Enter task description"
              value={task.description}
              onChange={handleChange}
            />
          </div>

          {/* Status */}
          <div className="input-group">
            <label>Status</label>

            <select name="status" value={task.status} onChange={handleChange}>
              <option value="Pending">Pending</option>

              <option value="In Progress">In Progress</option>

              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Priority */}
          <div className="input-group">
            <label>Priority</label>

            <select
              name="Priority"
              value={task.Priority}
              onChange={handleChange}
            >
              <option value="High">High</option>

              <option value="Medium">Medium</option>

              <option value="Low">Low</option>
            </select>
          </div>

          {/* Assigned User */}
          <div className="input-group">
            <label>Assign To</label>

            <select
              name="assignedTo"
              value={task.assignedTo}
              onChange={handleChange}
            >
              <option value="">Select User</option>

              <option value="6a507cbe891cf770bfd4e68c">John Doe</option>

              <option value="6a507cbe891cf770bfd4e68c">Alex Smith</option>
            </select>
          </div>

          <button type="submit">Create Task</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
