import React from 'react';

const TodoApp = () => {
  return (
    <div className="min-h-screen  bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold  text-gray-800 mb-4">Todo App</h1>

        {/* Input Field */}
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Add a new task"
            className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-3">
          {["Task 1", "Task 2", "Task 3"].map((task, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md shadow-sm"
            >
              <span className="text-gray-700">{task}</span>
              <div className="flex space-x-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
