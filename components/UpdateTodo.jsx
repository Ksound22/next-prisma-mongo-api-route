'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

const fetchTodo = async (id) => {
  const res = await fetch(`/api/todos/${id}`);
  if (!res.ok) throw new Error('Failed to fetch todo');
  return res.json();
};

const UpdateTodo = () => {
  const router = useRouter();
  const params = useParams();

  const { id } = params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const getTodo = async () => {
        try {
          const todo = await fetchTodo(id);
          setTitle(todo.title);
          setDescription(todo.description);
          setDate(new Date(todo.createdAt).toISOString().split('T')[0]);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };
      getTodo();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const response = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        date,
      }),
    });

    if (response.ok) {
      router.push('/');
    } else {
      const error = await response
        .json()
        .catch(() => ({ error: 'Invalid JSON response' }));
      setError(error.message || 'Something went wrong');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Update Todo: {title}
      </h2>
      {loading ? (
        <h3 className="text-green-500 mt-4 text-center text-2xl">Loading...</h3>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-gray-800 p-8 rounded shadow-lg"
        >
          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded bg-gray-900 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded bg-gray-900 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 rounded bg-gray-900 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 rounded text-white font-semibold hover:bg-blue-600"
          >
            Update
          </button>
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </form>
      )}

      <div className="text-center mt-6 underline text-green-400">
        <Link href="/">Back to todos</Link>
      </div>
    </div>
  );
};

export default UpdateTodo;
