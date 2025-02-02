import TodoListItem from "./TodoListItem";
import PropTypes from 'prop-types';

  function TodoList ({ todoList, onRemoveTodo }) {
    return (
      <ul>
        {todoList.map ((item) => (
           <TodoListItem key = {item.id} todo = {item} onRemoveTodo = {onRemoveTodo} />
        ))}
      </ul>
    );
  }

  TodoList.propTypes = {
    todoList: PropTypes.array.isRequired,
    onRemoveTodo: PropTypes.func.isRequired
  }
export default TodoList;