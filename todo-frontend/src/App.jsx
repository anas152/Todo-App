import axios from "axios";
import { useEffect, useState } from "react";  
import toast from "react-hot-toast";



export default function App() {
  const BASE_URL = "http://localhost:5001";

  const [todos, setTodos] = useState([]);

  const getTodo = async () => {
    try {
      const res = await axios(`${BASE_URL}/all-todos`);
      setTodos(res?.data?.data);
    } catch (err) {
      console.error(err?.response?.data?.message || "Error fetching todos");
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  const addTodo = async (event) => {
    try {
      event.preventDefault();
      const todoValue = event.target.children[0].value;
      await axios.post(`${BASE_URL}/add-todo`, { todo: todoValue });
      getTodo();
      event.target.reset();
    } catch (err) {
      console.error(err?.response?.data?.message || "Error adding todo");
    }
  };
  const editTodo = async (event, todoId) => {
    try {
      event.preventDefault();

      const todoValue = event.target.children[0].value;

      await axios.patch(`${BASE_URL}/api/v1/todo/${todoId}`, {
        todoContent: todoValue,
      });
      getTodo();

      event.target.reset();
    } catch (err) {
      toast.dismiss();
      toast.error(err?.response?.data?.message || "unknown errorrr");
    }
  };

  const deleteTodo = async (todoId) => {
    console.log(todoId);
    
    try {
      await axios.delete(`${BASE_URL}/delete-solo-todo/${todoId}`);
      getTodo();
    } catch (err) {
      console.error(err?.response?.data?.message || "Error deleting todo");
    }
  };  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">Todo App</h1>
        <form onSubmit={addTodo} className="flex mb-4">
          <input
            type="text"
            placeholder="Add a new task"
            className="flex-grow p-2 border rounded-l-md"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md">
            Add
          </button>
        </form>
        {!todos.length && <p>No todos available</p>}
        <ul>
        <ul className="mt-6 space-y-4">
          {todos?.map((todo, index) => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm hover:bg-gray-100 transition-all duration-200"
            >
              {!todo.isEditing ? (
                <span className="text-gray-700">{todo.todoContent}</span>
              ) : (
                <form
                  onSubmit={(e) => editTodo(e, todo.id)}
                >
                  <input
                    type="text"
                    defaultValue={todo.todoContent}
                    className="border border-gray-400"
                  />
                  <button
                    onClick={() => {
                      const newTodos = todos.map((todo, i) => {
                        todo.isEditing = false;
                        return todo;
                      });
                      setTodos([...newTodos]);
                    }}
                    type="button"
                  >
                    cancel
                  </button>
                  <button type="submit">Save</button>
                </form>
              )}

              <div className="space-x-3">
                {!todo.isEditing ? (
                  <button
                    onClick={() => {
                      const newTodos = todos.map((todo, i) => {
                        if (i === index) {
                          todo.isEditing = true;
                        } else {
                          todo.isEditing = false;
                        }
                        return todo;
                      });

                      // todos[index].isEditing = true
                      setTodos([...newTodos]);
                    }}
                    className="text-indigo-600 hover:text-indigo-700 focus:outline-none"
                  >
                    Edit
                  </button>
                ) : null}

                {!todo.isEditing ? (
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-600 hover:text-red-700 focus:outline-none"
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
        </ul>
      </div>
    </div>
  );
}