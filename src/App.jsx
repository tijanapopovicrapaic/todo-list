import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

  const [todos, setTodos] = useState(savedTodos);
  const [taskText, setTaskText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = () => {
    if (taskText.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };
      setTodos([...todos, newTask]);
      setTaskText("");
    }
  };

  const deleteTask = (taskId) => {
    const updatedTodos = todos.filter((task) => task.id !== taskId);
    setTodos(updatedTodos);
  };

  const editTask = (taskId, newText) => {
    const updatedTodos = todos.map((task) => {
      if (task.id === taskId) {
        return { ...task, text: newText };
      }
      return task;
    });
    setTodos(updatedTodos);
  };

  const searchedTodos = todos.filter((task) =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const isAddButtonDisabled = taskText.trim() === "";

  return (
    <div>
      <h1>TO DO LIST</h1>
      <input
        type="text"
        placeholder="Add a new task"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button onClick={addTask} disabled={isAddButtonDisabled}>
        +
      </button>
      <div>
        <input
          className="input-search"
          type="text"
          placeholder="Search tasks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <TodoList todos={searchedTodos} deleteTask={deleteTask} onEdit={editTask} />
    </div>
  );
}

export default App;