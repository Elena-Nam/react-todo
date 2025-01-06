import * as React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App () {

  // Retrieve the saved todo list from localStorage or default to an empty array
  const savedTodoList = JSON.parse (localStorage.getItem ('savedTodoList')) || [];

   // Initialize state with the saved data from localStorage
  const [todoList, setTodoList] = React.useState (savedTodoList); // in the assignment "Update the default state for todoList to be an empty Array" ???
  const [isLoading, setIsLoading] = React.useState (true);


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

/*
   // Simulate fetching data
  React.useEffect (() => {
  new Promise ((resolve , reject) => {
    setTimeout (() => {
      resolve ({ data: { todoList: [] }}); // Simulate an empty todo list for now
      }, 2000);
    })
    .then ((result) => {
      setTodoList (result.data.todoList);
      setIsLoading (false);
    })
    // optional not in the assignment of this week
    .catch((error) => {
      console.error('Error fetching data:', error); // Handle errors
      setIsLoading(false); // Make sure to set loading to false even on error
    });
  },[]);
*/
  // Save the todo list to localStorage whenever it changes and is loading is false
  React.useEffect (() => {
    if (!isLoading) {
      localStorage.setItem ('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);
    
function AddTodo (newTodo) {
  setTodoList ((prevTodoList) => [...prevTodoList, newTodo])
}

const removeTodo = (id) => {
  const newTodoList = todoList.filter (
    (todo) => todo.id !== id);
    setTodoList (newTodoList);
}

return (
  <>
  <h1> Todo List </h1>
  {isLoading ? (
    <p> Loading... </p>
  ) : (
  <TodoList  todoList = {todoList} onRemoveTodo = {removeTodo} /> 
  )}
  
  <AddTodoForm onAddTodo = {AddTodo} />
  </>
  );
  }

export default App;
