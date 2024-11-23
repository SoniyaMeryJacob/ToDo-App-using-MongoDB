import { useState, useEffect } from "react";
import Todo from "@/components/Todo";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch todos from the backend
  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
  
  useEffect(() => {
    fetchTodos();
  }, []);

  // Add a new todo
  const handleAddTodo = async () => {
    if (newTodo.trim() === "") return;
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodo, completed: false }),
    });
  
    if (!response.ok) {
      console.error("Failed to add todo");
    } else {
      const data = await response.json();
      setTodos([...todos, data]);
      setNewTodo("");
    }
  };

  // Delete a todo
  const handleDeleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
  };

  // Edit a todo
  const handleEditTodo = async (id) => {
    const todo = todos.find((todo) => todo._id === id);
    const newTitle = prompt("Edit your todo:", todo?.title);
    if (newTitle) {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });
      const updatedTodo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
    }
  };

  // Mark a todo as completed
  const handleCompleteTodo = async (id) => {
    const todo = todos.find((todo) => todo._id === id);
    const response = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    const updatedTodo = await response.json();
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo._id === id ? updatedTodo : todo))
    );
  };

  return (
    <div>
      <h1 className="text-5xl text-center mt-12">Todo App</h1>
      {/* Add Todo Input */}
      <div className="flex justify-center gap-6 mt-12">
        <input
          className="rounded-lg px-10 py-1 border border-gray-300 text-black"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a todo"
        />
        <button
          className="border-2 border-white px-2 py-1 rounded-lg hover:bg-white hover:text-black"
          onClick={handleAddTodo}
        >
          Add Todo
        </button>
      </div>
      {/* Todo List */}
      <div className="mt-6 justify-center">
        {todos.map((todo) => (
          <Todo
            each_todo={todo}
            key={todo._id} // Use unique MongoDB _id
            onDelete={() => handleDeleteTodo(todo._id)}
            onEdit={() => handleEditTodo(todo._id)}
            onComplete={() => handleCompleteTodo(todo._id)}
          />
        ))}
      </div>
    </div>
  );
}
