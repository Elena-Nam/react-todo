import { useState } from 'react';

function AddTodoForm (props) {
    const [title, setTitle] = useState('');

    function handleAddTodo(event){
        event.preventDefault();// Prevent the form from reloading the page
        const todoTitle = event.target.title.value;
        console.log(todoTitle); // Log the current title value
        props.onAddTodo(todoTitle);// Call the onAddTodo function passed as a prop
        setTitle(''); // Clear the input field after adding the todo
    }
return (
    <form onSubmit={handleAddTodo}>
    <label htmlFor = "todoTitle"> Title </label>
    <input id = "todoTitle" name = "title" value = {title} type = "text" required onChange={(event) => setTitle(event.target.value)} /> 
    <button type = "submit"> Submit </button>
    </form>
)
}

export default AddTodoForm;