import TodoListItem from "./TodoListItem/TodoListItem";
import PropTypes from 'prop-types';

  function TodoList ({ todoList, onRemoveTodo, onEditTodo, onToggleStatus }) {
    return (
      <ul>
        {todoList.map ((item) => (
           <TodoListItem key = {item.id} todo = {item} onRemoveTodo = {onRemoveTodo} onEditTodo={onEditTodo}  onToggleStatus={onToggleStatus}/>
        ))}
      </ul>
    );
  }

  TodoList.propTypes = {
    todoList: PropTypes.array.isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    onEditTodo: PropTypes.func.isRequired,
    onToggleStatus: PropTypes.func.isRequired
  }
export default TodoList;