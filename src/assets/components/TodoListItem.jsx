import styles from './TodoListItem.module.css';
import PropTypes from 'prop-types';
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';  

function TodoListItem ({todo, onRemoveTodo}) {
    return (
        <div className ={styles.ListItem}>
            <li> {todo.title} </li>
                <div className={styles.button_group}>
                    <button type ="button" className="button" onClick ={() => onRemoveTodo(todo.id)}> <FaTrash size={15} /></button>
                    <button type ="button" className="button" onClick ={() => onRemoveTodo(todo.id)}> <FaEdit size={15} /> </button>
                    <button type ="button" className="button" onClick ={() => onRemoveTodo(todo.id)}> <FaCheck size={15} /></button>
                </div>
            
        </div>
    );
}

TodoListItem.propTypes = {
    todo: PropTypes.object.isRequired,
    onRemoveTodo: PropTypes.func.isRequired
}

export default TodoListItem;