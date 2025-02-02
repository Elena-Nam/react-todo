import styles from './TodoListItem.module.css';
import PropTypes from 'prop-types';

function TodoListItem ({todo, onRemoveTodo}) {
    return (
        <div>
    <li className ={styles.ListItem}> {todo.title} 
    <button type ="button" className="button" onClick ={() => onRemoveTodo(todo.id)}> Remove </button>
    </li>
    </div>
    );
}

TodoListItem.propTypes = {
    todo: PropTypes.object.isRequired,
    onRemoveTodo: PropTypes.func.isRequired
}

export default TodoListItem;