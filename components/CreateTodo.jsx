'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateTodo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setError(null);

    const response = await fetch('/api/todos', {
      method: 'POST',
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
      setTitle('');
      setDescription('');
      setDate('');
      setSubmitting(false);
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
      <h2 className="text-3xl font-bold mb-4 text-center">Create Todo</h2>
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
          {submitting === true ? 'Creating...' : 'Create'}
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default CreateTodo;
