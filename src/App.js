import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoDescription, setTodoDescription] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/');
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async () => {
    try {
      if (todoDescription.trim() === '') return;

      const newTodo = {
        description: todoDescription,
        completed: false
      };

      await axios.post('http://localhost:5000/create', newTodo);
      setTodoDescription('');
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const updatedTodo = {
        completed: !completed
      };

      await axios.put(`http://localhost:5000/edit/${id}`, updatedTodo);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>ToDo App</h1>
      <div class="todobody">
      <input
        type="text" 
        value={todoDescription}
        onChange={(e) => setTodoDescription(e.target.value)}
      />
      <button onClick={addTodo} id="box">Add</button><br></br><br></br>
      <ul>

        {todos.map((todo) => (
          <li key={todo._id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo._id, todo.completed)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.description}
            </span>
            <button onClick={() => deleteTodo(todo._id)} id="del">Delete</button>
          </li>
        ))}
      </ul>
      <div>
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('completed')}>Completed</button>
      <button onClick={() => setFilter('incomplete')}>Incomplete</button>

     
    </div>


    </div></div>
    
  );
};

export default App;

