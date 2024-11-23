import React, { Component } from "react";

class Todo extends Component {
  render() {
    const { each_todo, onDelete, onEdit, onComplete } = this.props;

    return (
      <div className="flex items-center justify-between p-4 bg-gray-800 text-white rounded-lg shadow-lg">
        <h1
          className={`text-lg font-semibold flex px-2 py-1 ${
            each_todo.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {each_todo.title}
        </h1>
        <div className="flex gap-3">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            onClick={onDelete} 
          >
            Delete
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            onClick={onEdit}
          >
            Edit
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
            onClick={onComplete}
          >
            {each_todo.completed ? "Undo" : "Completed"}
          </button>
        </div>
      </div>
    );
  }
}

export default Todo;
