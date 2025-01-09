import { useState, useEffect } from "react";
import "./render_task.css";

function RenderTask() {
  const [task, setTask] = useState("");
  const d = new Date(Date.now()).toISOString().split("T")[0];
  const [deadline, setDeadline] = useState(d);
  console.log(deadline);

  onkeydown = (e) => {
    e.key === "Enter" && addTask();
  };

  const addTask = () => {
    if (task.trim() === "") {
      alert("Task cannot be empty");
      return;
    }
    if (deadline.trim() === "") {
      alert("Deadline cannot be empty");
      return;
    }
    setTasks([
      ...tasks,
      { id: Math.random(), task, completed: false, deadline: deadline },
    ]);
    setTask("");
    setDeadline(d);
  };

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const taskFromStorage = localStorage.getItem("tasks");
    if (taskFromStorage !== null) {
      setTasks(JSON.parse(taskFromStorage));
    }
  }, []);

  const updateTask = (index) => {
    const newTasks = [...tasks];
    const updatedTask = prompt("Update task", newTasks[index].task);
    if (updatedTask !== "") {
      newTasks[index].task = updatedTask;
      setTasks(newTasks);
    } else {
      alert("Task cannot be empty");
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const saveList = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <div className="add-task">
        <input
          className="task-input"
          type="text"
          placeholder="Add a task"
          onChange={(e) => {
            setTask(e.target.value);
          }}
          value={task}
        />
        <input
          className="date-input"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button onClick={addTask} className="add-button">
          +
        </button>
      </div>
      <table className="task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Deadline</th>
            <th>Update</th>
            <th>Completed</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <td
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.task}
              </td>
              <td>{task.deadline}</td>
              <td>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(index)}
                  className="checkbox"
                />
              </td>
              <td>
                <button onClick={() => updateTask(index)}>Update</button>
              </td>
              <td>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="save" onClick={saveList}>Save List</button>
    </div>
  );
}

export default RenderTask;
