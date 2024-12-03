import { useState } from 'react';

function AddTodoForm ({onAddTodo}) {

    const [todoTitle, setTodoTitle] = useState ('');

    function handleTitleChange(e) {
        const newTodoTitle = e.target.value;
        setTodoTitle (newTodoTitle);
    }

    function handleAddTodo(event) {
        event.preventDefault();// Prevent the form from reloading the page
      
        const newTodo = {
            title: todoTitle, // Pass the title from the state
            id: Date.now(), // Generate a unique ID using Date.now()
          };

        onAddTodo(newTodo); // Call the onAddTodo function passed as a prop
        setTodoTitle(''); // Clear the input field after adding the todo
    }
return (
    <form onSubmit = {handleAddTodo}>
    <label htmlFor = "todoTitle"> Title </label>
    <input id = "todoTitle" 
    name = "title" 
    value = {todoTitle} 
    type = "text" required 
    onChange={handleTitleChange} /> 
    <button type = "submit"> Submit </button>
    </form>
)
}

export default AddTodoForm;