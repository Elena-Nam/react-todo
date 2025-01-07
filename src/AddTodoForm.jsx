import { useState } from 'react';
import InputWithLabel from './InputWithLabel';


function AddTodoForm ({onAddTodo}) {
  const [todoTitle, setTodoTitle] = useState ('');

    function handleTitleChange(e) {
	    const newTodoTitle = e.target.value;
	    setTodoTitle (newTodoTitle);
    }

    // Handle adding a new todo with fetching url of the airtable
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}` 
    
  async function handleAddTodo(event) {
	  event.preventDefault(); // Prevent the form from reloading the page
	  console.log(event);

	  const newTodo = {
      fields: {
      title: todoTitle, // Pass the title from the state
        },
	  };
	  try {
      const response = await fetch (url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        },
		  body: JSON.stringify(newTodo),
	    })
        if (!response.ok) {
          const message = `Error: ${response.status}`;
          throw new Error(message);
        }
      const data = await response.json();
          console.log ('New item added:', data);

      // Add the new todo to the parent component
      const addedNewTodo = {
        id: data.id,
        title: data.fields.title,
      };
  
      onAddTodo(addedNewTodo); // Pass the added todo to the parent

      setTodoTitle(''); // Clear the input field after adding the todo
	  
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }
	   
     
/*
    function handleAddTodo(event) {
	  event.preventDefault();// Prevent the form from reloading the page
	
	  const newTodo = {
		title: todoTitle, // Pass the title from the state
		id: Date.now(), // Generate a unique ID using Date.now()
	    };

	  onAddTodo(newTodo); // Call the onAddTodo function passed as a prop
	  setTodoTitle(''); // Clear the input field after adding the todo
	  */
    
	  
return (
    <form onSubmit = {handleAddTodo}>
	  <InputWithLabel 
		todoTitle={todoTitle} 
		handleTitleChange={handleTitleChange}> Title
	  </InputWithLabel>
    
    <button type = "submit"> Submit </button>
    </form>
)
}

export default AddTodoForm;