import { useState, useEffect } from "react";
import "./render_task.css";

function RenderTask() {
  const [task, setTask] = useState("");
  const d = new Date(Date.now()).toISOString().split("T")[0];
  const [deadline, setDeadline] = useState(d);
  const [darkMode, setDarkMode] = useState(false);

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
    const darkModeFromStorage = localStorage.getItem("darkMode");
    if (darkModeFromStorage !== null) {
      setDarkMode(JSON.parse(darkModeFromStorage));
      toggleDarkMode(JSON.parse(darkModeFromStorage));
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

  const toggleDarkMode = (v) => {
    v
      ? ((document.body.style.backgroundColor = "black"),
        (document.body.style.transition = "all 1s ease"))
      : ((document.body.style.backgroundColor = "white"),
        (document.body.style.transition = "all 1s ease"));
    localStorage.setItem("darkMode", v);
  };

  return (
    <>
      <form className="mode-form">
        <label
          style={{
            color: darkMode ? "white" : "black",
            transition: "all 1s ease",
          }}
        >
          Mode{" "}
        </label>
        <select
          onChange={(e) => {
            console.log(e.target.value);
            setDarkMode(e.target.value === "dark");
            toggleDarkMode(e.target.value === "dark");
          }}
          value={darkMode ? "dark" : "light"}
          style={{
            backgroundColor: darkMode ? "black" : "white",
            color: darkMode ? "white" : "black",
          }}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </form>
      <div className="App">
        <h1
          style={{
            color: darkMode ? "white" : "black",
            transition: "all 1s ease",
          }}
        >
          TODO LIST
        </h1>
        <div className="add-task">
          <input
            className="task-input"
            type="text"
            placeholder="Add a task"
            onChange={(e) => {
              setTask(e.target.value);
            }}
            value={task}
            style={{
              color: darkMode ? "white" : "black",
              borderColor: darkMode ? "white" : "black",
              backgroundColor: darkMode ? "#333" : "white",
              transition: "all 1s ease",
              // placeholderColor: darkMode ? "white" : "black", //change place hlder color not working
            }}
          />
          <input
            className="date-input"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            style={{
              color: darkMode ? "white" : "black",
              borderColor: darkMode ? "white" : "black",
              backgroundColor: darkMode ? "#333" : "white",
              transition: "all 1s ease",
            }}
          />
          <button
            onClick={addTask}
            className="add-button"
            style={{
              transition: "all 1s ease",
            }}
          >
            +
          </button>
        </div>
        <table className="task-table">
          <thead
            style={{
              backgroundColor: darkMode ? "#333" : "black",
              transition: "all 1s ease",
            }}
          >
            <tr style={{}}>
              <th>Task</th>
              <th>Deadline</th>
              <th>Completed</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id}>
                <td
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    color: darkMode ? "white" : "black",
                    transition: "all 1s ease",
                  }}
                >
                  {task.task}
                </td>
                <td
                  style={{
                    color: darkMode ? "white" : "black",
                    transition: "all 1s ease",
                  }}
                >
                  {task.deadline}
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(index)}
                    className="checkbox"
                  />
                </td>
                <td>
                  <button
                    onClick={() => updateTask(index)}
                    style={{
                      transition: "all 1s ease",
                    }}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => deleteTask(task.id)}
                    style={{
                      transition: "all 1s ease",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="save" onClick={saveList}>
          Save List
        </button>
      </div>
    </>
  );
}

export default RenderTask;
