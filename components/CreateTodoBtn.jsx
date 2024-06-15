'use client';

import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

const CreateTodoBtn = () => {
  return (
    <div className="flex justify-center mt-8">
      <Link href="/create-todo">
        <button className="bg-green-500 text-white px-8 py-2 gap-2 rounded flex items-center">
          Create a Todo <FaPlus />
        </button>
      </Link>
    </div>
  );
};

export default CreateTodoBtn;
