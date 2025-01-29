import * as React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom'

import './assets/components/App.css'
import Calendar from './assets/components/Calendar';
import Clock from './assets/components/Clock';
import Footer from './assets/components/Footer'
import Background from './assets/components/Background';
import TodoList from './assets/components/TodoList';
import AddTodoForm from './assets/components/AddTodoForm';
import NotFound from './assets/pages/NotFound'; 
import Home from './assets/pages/Home'
import {ListsLayout}  from './assets/pages/ListsLayout';


function App () {

  // Retrieve the saved todo list from localStorage or default to an empty array
  const savedTodoList = JSON.parse (localStorage.getItem ('savedTodoList')) || [];

   // Initialize state with the saved data from localStorage
  const [todoList, setTodoList] = React.useState ([]); // in the assignment "Update the default state for todoList to be an empty Array" ???
  const [isLoading, setIsLoading] = React.useState (true);
  const [date, setDate] = React.useState(new Date()); // Track the selected date

   /* Handle fetching url of the airtable to retrieve data */

  const fetchData = async() => {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        },
      };

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url,options);

       if (!response.ok) {
         const message = `Error: ${response.status}`;
         throw new Error(message);
       }

       const data = await response.json();
       
       const todos = data.records.map((todo) => {
          const newTodo =  {
              id: todo.id,
              title: todo.fields.title
          }
          return newTodo;
      });

         setTodoList(todos);
         setIsLoading (false);

      } catch (error) {
        console.error('Error fetching data:', error.message); 
      }
  }

React.useEffect (()=>{
  fetchData();
},[]);

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


const Lists = () => {
  return (
    <>
      <div className = "layoutContainer">
        <div className ="column">
          <ListsLayout/>
        </div>
        <div className = "column">
          <h1> Todo List </h1>
          {isLoading ? (
            <p> Loading... </p>
            ) : (
            <TodoList  todoList = {todoList} onRemoveTodo = {removeTodo} /> 
          )}
          <AddTodoForm onAddTodo = {AddTodo}/>
        </div>
        <div className ="column">
          <Calendar selectedDate={date}
             onDateChange={setDate}/>
          <p className='date'> Selected date: {date.toDateString()}</p>
          <p className='date'> Today's date: {new Date().toDateString()}</p>
        </div>
      </div>
    </>
  )
}


return (
<>
  <div className="app-background">
  
    <BrowserRouter>

    <Background/>
    <nav> 
      <Link to="/"> Home </Link>
      <Link to="/lists"> My lists </Link>
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


    

export default App;