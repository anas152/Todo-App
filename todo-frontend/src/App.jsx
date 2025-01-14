// import axios from "axios";
// import { useEffect, useState } from "react";

// export default function App() {
//   const BASE_URL = "http://localhost:5001";

//   const [todos, setTodos] = useState([]);

//   const getTodo = async () => {
//     const res = await axios(`{BASE_URL}/all-todos`);
//     const todosFromServer = res?.data?.data;
//     console.log("todosFromServer ", todosFromServer);
//     setTodos(todosFromServer);
//   };
//   useEffect(() => {
//     getTodo();
//   }, []);

//   const addTodo = async (event) => {
//     try {
//       event.preventDefault()
//       const todoValue = event.target.chlidren[0].value
//       await axios.post(`{BASE_URL}/add-todo`),
//       {
//         "todo" : todoValue
//       }
//       getTodo();
//     } catch (error) {
 
//     }
//   }

//   return (
//     <div className="min-h-screen  bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//         <h1 className="text-4xl font-bold  text-gray-800 mb-4">Todo App</h1>

//         {/* Input Field */}
//         <form onSubmit={addTodo} className="flex mb-4">
//           <input
//             type="text"
//             placeholder="Add a new task"
//             className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">
//             Add
//           </button>
//         </form>

//         {/* Todo List */}
//         <ul className="space-y-3">
//           {todos?.map((todo, index) => (
//             <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md shadow-sm">
//               <span className="text-gray-700">{todo.textContent}</span>
//               <div className="flex space-x-2">
//                 <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
//                   Edit
//                 </button>
//                 <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }


import axios from "axios";
import { useEffect, useState } from "react";

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

  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`${BASE_URL}/delete-todo/${todoId}`);
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
          {todos.map((todo, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{todo.todoContent}</span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

