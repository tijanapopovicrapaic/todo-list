import React, { useState } from "react";

function TodoItem({ todo, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedText.trim() !== "") {
      onEdit(todo.id, editedText);
      setIsEditing(false);
    } else {
      alert("You must write something!");
    }
  };

  const handleToggle = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      ) : (
        <div
          onClick={handleToggle}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <span
            style={{
              textDecoration: isCompleted ? "line-through" : "none",
              color: isCompleted ? "gray" : "chocolate",
              flex: 1
            }}
          >
            {isCompleted ? <s>{todo.text}</s> : todo.text}
          </span>
          <span style={{ marginLeft: "40px" }}>{isCompleted ? "✓" : ""}</span>
        </div>
      )}
      {!isEditing && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="edit-button" onClick={handleEdit}>
            Edit
          </button>
          <button onClick={handleDelete}>X</button>
        </div>
      )}
    </div>
  );
}

export default TodoItem;