import { useEffect, useState } from "react";
import "../css/TaskForm.css";

import api from "../Services/api";
import { useLocation } from "react-router-dom";

const CreateTask = () => {
  const [users, setUsers] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
    Priority: "",
    assignedTo: "",
  });
  const [editId, setEditId] = useState(null);
  const location = useLocation();

  const edittask = location.state?.task;
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (edittask) {
      setTask({
        title: edittask.title,
        description: edittask.description,
        status: edittask.status,
        Priority: edittask.Priority,
        assignedTo: edittask.assignedTo,
      });

      setEditId(edittask._id);
    }
  }, [edittask]);
/* eslint-enable react-hooks/set-state-in-effect */
  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(task);
    if (editId) {
      // Update

      api
        .put(`/api/tasks/updateTask/${editId}`, task)
        .then((response) => {
          console.log(response.data);
          alert("✅ Updated Successfully.");

          setTask({
            title: "",
            description: "",
            status: "",
            Priority: "",
            assignedTo: "",
          });
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
      // setEditEmployee(null);
      setEditId(null);
    } else {
      // axios.post("/api/tasks", task)
      api
        .post("/api/tasks/createTask", task)
        .then((response) => {
          console.log("Task Created:", response.data);
          alert("✅ Created Successfully.");
          setTask({
            title: "",
            description: "",
            status: "Pending",
            Priority: "Medium",
            assignedTo: "",
          });
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/api/auth/getUser");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div className="task-container">
      <div className="task-card">
        {/* <h2>Create Task</h2> */}
        <h2 className="form-title">{editId ? "Update" : "Create"} Task</h2>

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
              <option value="">--Select Status--</option>
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
              <option value="">--Select Priority--</option>
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
              <option value="">--Select User--</option>

              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>

          </div>
          <button type="submit" className="submit-btn btn btn-success">
            {editId ? "Update Task" : "Create Task"}
          </button>
          {/* <button type="submit">Create Task</button> */}
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
