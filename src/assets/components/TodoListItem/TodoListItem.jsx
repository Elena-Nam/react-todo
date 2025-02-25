import * as React from 'react';
import styles from './TodoListItem.module.css';
import PropTypes from 'prop-types';
import { FaTrash, FaEdit, FaCheck, FaSave, FaHourglassHalf } from 'react-icons/fa';  

function TodoListItem ({todo, onRemoveTodo, onEditTodo, onToggleStatus}) {
  const [isEditing, setIsEditing] = React.useState(false); // Track if the item is being edited
  const [newTitle, setNewTitle] = React.useState(todo.title); // Store the edited title
    
  // Handle save of the edited todo item
  const handleSaveEdit = () => {
    onEditTodo(todo.id, newTitle); // Call the onEditTodo function from the parent (App)
    setIsEditing(false); // Exit edit mode
  };
    
      // Handle canceling the edit and reverting to the original title
  const handleCancelEdit = () => {
    setIsEditing(false); // Exit edit mode
    setNewTitle(todo.title); // Revert to the original title
  };

  const handleToggleStatus = () => {
    onToggleStatus(todo.id, todo.status); // Trigger the status toggle for the current todo
  };
 
  // show dates from createdAt field 
  const formattedDate = new Date(todo.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }); 
  

  return (
  <div className ={styles.ListItem}>
    <li>
      {isEditing ? (
       <div className={styles.button_group}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)} // Update the title as the user types
        />
          <button type="button" className="button" onClick={handleSaveEdit}><FaSave size={15} /></button>
          <button type="button" className="button" onClick={handleCancelEdit}><FaTrash size={15} /></button>
        </div>
        ) : (
        <div className ={styles.todo_group}>
          <span> {todo.title} </span>
          <span> {formattedDate} </span>
        </div>
      )}
    </li>

  <div className={styles.button_group}>
    {!isEditing && (
      <>
        <button type="button" className="button" onClick={() => setIsEditing(true)}>
          <FaEdit size={15} />
        </button>
        <button type="button" className="button" onClick={() => onRemoveTodo(todo.id)}>
          <FaTrash size={15} />
        </button>
        <button type="button" className="button" onClick={handleToggleStatus}>
          {todo.status ? <FaCheck size={15} /> : <FaHourglassHalf size={15} />}
        </button>
      </>
    )}
  </div>
</div>
);
}

TodoListItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onEditTodo: PropTypes.func.isRequired,
  onToggleStatus: PropTypes.func.isRequired
}

export default TodoListItem;