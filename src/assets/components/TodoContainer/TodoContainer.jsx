import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TodoList from '../TodoList'; 
import AddTodoForm from '../AddTodoForm/AddTodoForm';  
import styles from './TodoContainer.module.css';
import { FaSort } from 'react-icons/fa';

const TodoContainer = ({ sortDirection, sortField, setSortDirection, setSortField }) => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch todos from Airtable API
  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view&sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const todos = data.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.title,
      }));

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortDirection, sortField]);

  const addTodo = (newTodo) => {
    setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
  };

  const removeTodo = async (id) => {
    const removeUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`;

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    try {
      const response = await fetch(removeUrl, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const newTodoList = todoList.filter((todo) => todo.id !== data.id);
      setTodoList(newTodoList);
    } catch (error) {
      console.error('Error removing todo:', error);
    }
  };

  const editTodo = async (id, newTitle) => {
    const editedUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`;

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
      body: JSON.stringify({
        fields: {
          title: newTitle,
        },
      }),
    };

    try {
      const response = await fetch(editedUrl, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const newTodoList = todoList.map((todo) =>
        todo.id === data.id ? { ...todo, title: data.fields.title } : todo
      );
      setTodoList(newTodoList);
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };

  // Function to toggle sorting direction
  const toggleSortDirection = () => {
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
  };

  // Function to change sorting field
  const handleSortFieldChange = (event) => {
    setSortField(event.target.value);
  };

  return (
    <div className={styles.column}>
      <h1>Todo List</h1>
      <div className={styles.sorting}>
        <span>Sort by:</span>
        <label>
          <select value={sortField} onChange={handleSortFieldChange}>
            <option value="title">Title</option>
            <option value="time">Time</option>
          </select>
        </label>
        <button className="button_toggle" onClick={toggleSortDirection}>
          <FaSort size={15} /> Sort
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} onEditTodo={editTodo} />
      )}

      <AddTodoForm onAddTodo={addTodo} />
    </div>
  );
};

TodoContainer.propTypes = {
  sortDirection: PropTypes.oneOf(['asc', 'desc']).isRequired,
  sortField: PropTypes.oneOf(['title', 'time']).isRequired,
  setSortDirection: PropTypes.func.isRequired,
  setSortField: PropTypes.func.isRequired,
};

export default TodoContainer;
