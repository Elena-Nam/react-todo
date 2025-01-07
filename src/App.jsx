import * as React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App () {

  // Retrieve the saved todo list from localStorage or default to an empty array
  const savedTodoList = JSON.parse (localStorage.getItem ('savedTodoList')) || [];

   // Initialize state with the saved data from localStorage
  const [todoList, setTodoList] = React.useState ([]); // in the assignment "Update the default state for todoList to be an empty Array" ???
  const [isLoading, setIsLoading] = React.useState (true);


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
       console.log(data);

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
  console.log('RemovedID:', removedId);

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
    console.log ('The item deleted:', data);

     // Update the todo list by filtering out the removed todo
    const newTodoList = todoList.filter (
      (todo) => todo.id !== data.id);

    console.log(newTodoList);
    setTodoList (newTodoList);

  } catch (error) {
  console.error('Error removing todo:', error);
  }
}

return (
  <>
  <h1> Todo List </h1>
  {isLoading ? (
    <p> Loading... </p>
  ) : (
  <TodoList  todoList = {todoList} onRemoveTodo = {removeTodo} /> 
  )}
  
  <AddTodoForm onAddTodo = {AddTodo}/>
  </>
  );
  }

export default App;
