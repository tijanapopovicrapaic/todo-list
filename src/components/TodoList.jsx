import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, deleteTask, onEdit }) { 
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={deleteTask} onEdit={onEdit} />
      ))}
    </div>
  );
}

export default TodoList;