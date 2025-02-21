import { useState } from 'react';
import InputWithLabel from '../InputWithLabel';
import PropTypes from 'prop-types';
import styles from './AddTodoForm.module.css'; 

function AddTodoForm ({onAddTodo, selectedDate}) {
  const [todoTitle, setTodoTitle] = useState ('');
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for handling the button disable/enable
    
  function handleTitleChange(e) {
	    const newTodoTitle = e.target.value;
	    setTodoTitle (newTodoTitle);
    }

    /* Handle fetching url of the airtable to add a new todo */
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}` 
    
  async function handleAddTodo(event) {
	  event.preventDefault(); // Prevent the form from reloading the page
    setIsSubmitting(true); // Disable the submit button

	  const newTodo = {
      fields: {
      title: todoTitle, // Pass the title from the state
      createdAt: selectedDate.toISOString() 
      },
	  };
    console.log(newTodo);
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

      // Add the new todo to the parent component
      const addedNewTodo = {
        id: data.id,
        title: data.fields.title,
        createdAt: data.fields.createdAt,
      };
  
      onAddTodo(addedNewTodo); // Pass the added todo to the parent

      setTodoTitle(''); // Clear the input field after adding the todo
	  
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setIsSubmitting(false); // Re-enable the submit button after the request completes
    }
    
  }
	 
return (
    <form className={styles.inputForm} onSubmit = {handleAddTodo}>
	  <InputWithLabel 
		todoTitle={todoTitle} 
		handleTitleChange={handleTitleChange}> Title
	  </InputWithLabel>
    
    <button type="submit" disabled={isSubmitting} className = "button"> 
        {isSubmitting ? 'Adding...' : 'Submit'} {/* Change the button text when submitting */}
      </button>
    </form>
)
}


AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
}

export default AddTodoForm;