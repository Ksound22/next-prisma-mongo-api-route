'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaTrash, FaPen } from 'react-icons/fa';

const fetchTodos = async () => {
  const res = await fetch('/api/todos', {
    cache: 'no-cache',
  });

  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
};

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await fetchTodos();
        setTodos(todos);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };
    getTodos();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm('Are you sure you want to delete the todo?');
    if (!confirmDelete) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodos(todos.filter((todo) => todo.id !== id));
        setDeleteError(null);
      } else {
        throw new Error('Failed to delete todo');
      }
    } catch (error) {
      setDeleteError(error.message);
      setTimeout(() => {
        setDeleteError(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mt-6 mb-4 text-center">Todos</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="bg-gray-800 text-white p-4 rounded shadow-lg"
          >
            <h3 className="text-xl font-semibold">{todo.title}</h3>
            <p className="text-gray-400">{todo.description}</p>
            <p className="text-sm text-gray-500">
              {new Date(todo.createdAt).toLocaleDateString()}
            </p>
            <div className="flex justify-between space-x-2 mt-4">
              <div className="completion">
                {todo.isCompleted ? (
                  <span className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer">
                    Completed
                  </span>
                ) : (
                  <span className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer">
                    Not Completed
                  </span>
                )}
              </div>
              <div className="buttons flex gap-4">
                <Link href={`/update-todo/${todo.id}`}>
                  <button className="text-green-400 hover:text-green-300">
                    <FaPen />
                  </button>
                </Link>
                <button
                  className="text-red-400 hover:text-red-300"
                  onClick={() => handleDelete(todo.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {deleteError && (
        <h3 className="text-red-500 mt-4 text-center text-2xl">
          {deleteError}
        </h3>
      )}

      {loading && (
        <h3 className="text-green-500 mt-4 text-center text-2xl">
          Please wait...
        </h3>
      )}
    </div>
  );
};

export default TodoList;
