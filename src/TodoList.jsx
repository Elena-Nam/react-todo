import TodoListItem from "./TodoListItem";


const todoList = [
    {
    title: 'Win a lottery',
    id: 1,
    },
    {
    title: 'Put the lottery win into a bank account',
    id: 2,
    },
    {
      title: 'Donate money to the charity (dog shelters)',
      id: 3,
    },
  ];
  /*
  function TodoList(props) {
    return (
      <ul>
        {props.todoList.map((todo) => (
          <TodoListItem key={todo.id} todo={todo}/>
        ))}
      </ul>
    );
  }
*/

  function TodoList() {
    return (
        <ul>
        {todoList.map((item) => (
           <TodoListItem key={item.id} todo={item} />
        ))}
        </ul>
    );
    }
export default TodoList;