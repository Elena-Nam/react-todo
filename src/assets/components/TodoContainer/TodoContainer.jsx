import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TodoList from '../TodoList'; 
import AddTodoForm from '../AddTodoForm/AddTodoForm';  
import styles from './TodoContainer.module.css';
import { FaSort } from 'react-icons/fa';

const TodoContainer = ({ sortDirection, sortField, setSortDirection, setSortField,selectedDate, selectedCategory }) => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [completedTodoList, setCompletedTodoList] = useState([]); 
 
  const [todosByCategory, setTodosByCategory] = useState({
    study: [],
    work: [],
    grocery: [],
    other: [],
  });

  // Function to fetch todos from Airtable API
  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=${sortDirection}&sort[1][field]=createdAt&sort[1][direction]=${sortDirection}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      const todos = data.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.title,
        createdAt: new Date(todo.fields.createdAt),
        status: todo.fields.status|| false,
        category: todo.fields.category || 'other',
      }));

      const categorizedTodos = {
        study: [],
        work: [],
        grocery: [],
        other: [],
      };
      todos.forEach((todo) => {
        categorizedTodos[todo.category].push(todo);
      });
  
     

       // Filter todos by status (Completed and In Progress)
       const completedTodos = todos.filter(todo => todo.status === true);
       const remainingTodos = todos.filter(todo => todo.status !== true);
 
       // Sort the "Remaining Todos"
       const sortedRemainingTodos = remainingTodos.sort((a, b) => {
         if (sortField === 'time') {
           return sortDirection === 'asc' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt;
         }
         return sortDirection === 'asc'
           ? a.title.localeCompare(b.title)
           : b.title.localeCompare(a.title);
       });
 
       // Sort the "Completed Todos"
       const sortedCompletedTodos = completedTodos.sort((a, b) => {
         if (sortField === 'time') {
           return sortDirection === 'asc' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt;
         }
         return sortDirection === 'asc'
           ? a.title.localeCompare(b.title)
           : b.title.localeCompare(a.title);
       });
 
       // Set the state for lists
       setTodoList(sortedRemainingTodos);
       setCompletedTodoList(sortedCompletedTodos);
       setTodosByCategory(categorizedTodos);
       setIsLoading(false);

    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortDirection, sortField, selectedCategory]);

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

    // update the todo list after removing a todo, re-fetch the data
      fetchData(); 

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

// Function to toggle status between Active and Completed
const toggleStatus = async (id, currentStatus) => {
  const newStatus = currentStatus ? false : true;  // Toggle checkbox value (true <=> false)
  const editedUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`;

  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
    },
    body: JSON.stringify({
      fields: {
        status: newStatus,
      },
    }),
  };

  try {
    const response = await fetch(editedUrl, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    // update the todo list after toggling the status, re-fetch the data
    fetchData(); 

    const data = await response.json();

    // Update the local state to reflect the status change
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === data.id ? { ...todo, status: newStatus } : todo
      )
    );

    setCompletedTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === data.id ? { ...todo, status: newStatus } : todo
      )
    );
  } catch (error) {
    console.error('Error toggling status:', error);
  }
};

//
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
        <p> Loading...</p>
      ) : (
        <>
          <h2>Active Todo List</h2>
          <TodoList
            todoList={todosByCategory[selectedCategory]}
            onRemoveTodo={removeTodo}
            onEditTodo={editTodo}
            onToggleStatus={toggleStatus} 
          />
          
          {completedTodoList.length > 0 && (
          <>
          <h2>Completed Todo List</h2>
          <TodoList
            todoList={completedTodoList}
            onRemoveTodo={removeTodo}
            onEditTodo={editTodo}
            onToggleStatus={toggleStatus} 
          />
          </>
          )}
        </>
      )}

      <AddTodoForm onAddTodo={addTodo} selectedDate={selectedDate} />
    </div>
  );
};

TodoContainer.propTypes = {
  sortDirection: PropTypes.oneOf(['asc', 'desc']).isRequired,
  sortField: PropTypes.oneOf(['title', 'time']).isRequired,
  setSortDirection: PropTypes.func.isRequired,
  setSortField: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

export default TodoContainer;


