import styles from './TodoListItem.module.css';

function TodoListItem ({todo, onRemoveTodo}) {
    return (
        <div>
    <li className ={styles.ListItem}> {todo.title} 
    <button type ="button" className="button" onClick ={() => onRemoveTodo(todo.id)}> Remove </button>
    </li>
    </div>
    );
}


export default TodoListItem;