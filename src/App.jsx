{/*
import * as React from 'react';
import { BrowserRouter, Routes, Route,Link, Outlet } from 'react-router-dom'
import { FaHome, FaTasks,FaSort } from 'react-icons/fa'; 

import './assets/components/App.css'
import AddTodoForm from './assets/components/AddTodoForm/AddTodoForm';
import Background from './assets/components/Background';
import Calendar from './assets/components/Calendar/Calendar';
import Clock from './assets/components/Clock';
import Footer from './assets/components/Footer/Footer'
import Home from './assets/pages/Home/Home'
import TodoList from './assets/components/TodoList';
import {ListsLayout}  from './assets/pages/ListLayout/ListsLayout';
import NotFound from './assets/pages/NotFoundPage/NotFound'; 


function App () {

  // Retrieve the saved todo list from localStorage or default to an empty array
  //const savedTodoList = JSON.parse (localStorage.getItem ('savedTodoList')) || [];

  const [todoList, setTodoList] = React.useState ([]); 
  const [isLoading, setIsLoading] = React.useState (true);
  const [date, setDate] = React.useState(new Date()); // Track the selected date
  const [sortDirection, setSortDirection] = React.useState('asc'); 
  const [sortField, setSortField] = React.useState('title'); 

   /* Handle fetching url of the airtable to retrieve data */
/*
  const fetchData = async() => {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        },
      };

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view&sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;

    try {
      const response = await fetch(url,options);

       if (!response.ok) {
         const message = `Error: ${response.status}`;
         throw new Error(message);
       }

       const data = await response.json(); 

       const todos = data.records
       .map((todo) => {
          const newTodo =  {
              id: todo.id,
              title: todo.fields.title
          }
          return newTodo;
      })
      /* sorting with JavaScript 
        .sort ((objectA, objectB) => {
          const titleA = objectA.title;
          const titleB = objectB.title;

          if (direction === "asc") {
            if (titleA < titleB) return -1;
            if (titleA > titleB) return 1;
          } else if (direction === "desc") {
            if (titleA < titleB) return 1;
            if (titleA > titleB) return -1;
          }
          return 0;
        }
          );*/
/*
         setTodoList(todos);
         setIsLoading (false);

      } catch (error) {
        console.error('Error fetching data:', error.message); 
      }
  }

React.useEffect (()=>{
  fetchData();
},[sortDirection, sortField]);

  // Save the todo list to localStorage whenever it changes and is loading is false
  React.useEffect (() => {
    if (!isLoading) {
      localStorage.setItem ('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);
    
function AddTodo (newTodo) {
  setTodoList ((prevTodoList) => [...prevTodoList, newTodo])
}


/* Handle fetching url of the airtable to delete the data */
/*
const removeTodo = async (id) => {

  const removedId = id;
  
  const removeUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${removedId}`;
  
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      }
    }

  try {
    const response = await fetch (removeUrl, options); 
   
    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    } 

    const data = await response.json();
    
     // Update the todo list by filtering out the removed todo
    const newTodoList = todoList.filter (
      (todo) => todo.id !== data.id);

    setTodoList (newTodoList);

  } catch (error) {
  console.error('Error removing todo:', error);
  }
}

/* Handle fetching url of the airtable to edit the data */
/*
const editTodo = async (id, newTitle) => {
  const editedUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`;

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
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
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();

    // Update the todo list by modifying the edited todo's title
    const newTodoList = todoList.map((todo) =>
      todo.id === data.id ? { ...todo, title: data.fields.title } : todo
    );

    setTodoList(newTodoList); // Update the state with the modified list
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

const Lists = () => {
  return (
    <>
      <div className = "layoutContainer">
        <div className ="column">
          <ListsLayout/>
        </div>

        <div className = "column-todo">
          <h1> Todo List </h1>

            <div className = "sorting">
            <span> Sort by: </span>
            <label>{/* Dropdown to select sorting field */}
            /*
              <select value={sortField} onChange={handleSortFieldChange}>
                <option value="title">Title</option>
                <option value="time">Time</option>
              </select>
            </label>
            <button className = 'button_toggle' onClick={toggleSortDirection}>
              <FaSort size={15} /> Sort 
            </button>
          </div>

          {isLoading ? (
            <p> Loading... </p>
            ) : (
            <TodoList  todoList = {todoList} onRemoveTodo = {removeTodo}  onEditTodo={editTodo}/> 
          )}
          <AddTodoForm onAddTodo = {AddTodo}/>
        </div>

        <div className ="column">
          <Calendar selectedDate={date}
             onDateChange={setDate}/>
          <p className='select-date'> Selected date: {date.toDateString()}</p>
        </div>
      </div>
    </>
  )
}


return (
<>
  <div className="app-background">
  
    <BrowserRouter>

    <Background />
    <nav>
      <div className = "nav-icons">
        <Link to="/" className="active">
          <FaHome size={20} />  
        </Link>
        <Link to="/lists" > 
          <FaTasks size={20} />  </Link>
      </div>
      <h3 className = "title"> DAY-TO-DAY </h3>
      <Clock /> 
      <p className='date'> Date: {new Date().toDateString()}</p>
    </nav>
   
  
    <Routes>
      <Route path = "/" element = { <Home/> }/>
      <Route path="/lists" element={<Lists />}/>
      <Route path = "*" element = {<NotFound/>} />
    </Routes>

    </BrowserRouter>

    <Footer />  
  </div>
  </>
);

}


    

export default App; */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { FaHome, FaTasks } from 'react-icons/fa';
import './assets/components/App.css';
import Background from './assets/components/Background';
import Calendar from './assets/components/Calendar/Calendar';
import Clock from './assets/components/Clock';
import Footer from './assets/components/Footer/Footer';
import Home from './assets/pages/Home/Home';
import NotFound from './assets/pages/NotFoundPage/NotFound';
import TodoContainer from './assets/components/TodoContainer/TodoContainer';  // Import TodoContainer component
import {ListsLayout}  from './assets/pages/ListLayout/ListsLayout';

function App() {
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortField, setSortField] = useState('title');
  const [date, setDate] = useState(new Date());

  return (
    <div className="app-background">
      <BrowserRouter>
        <Background />
        <nav>
          <div className="nav-icons">
            <Link to="/" className="active">
              <FaHome size={20} />
            </Link>
            <Link to="/lists">
              <FaTasks size={20} />
            </Link>
          </div>
          <h3 className="title">DAY-TO-DAY</h3>
          <Clock />
          <p className="date"> Date: {new Date().toDateString()}</p>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/lists"
            element={
              <div className="layoutContainer">
                <div className ="column">
                  <ListsLayout/>
                </div>
                <div className="column">
                  <TodoContainer
                    sortDirection={sortDirection}
                    sortField={sortField}
                    setSortDirection={setSortDirection}
                    setSortField={setSortField}
                  />
                </div>

                <div className="column">
                  <Calendar selectedDate={date} onDateChange={setDate} />
                  <p className="select-date">Selected date: {date.toDateString()}</p>
                </div>
              </div>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
