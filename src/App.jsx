import * as React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

/*
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
*/

function App() {

const [todoList, setTodoList] = React.useState([]);
function AddTodo (newTodo) {
  setTodoList ((prevTodoList) => [...prevTodoList, newTodo])
}

return (
  <div>
  <h1> Todo List </h1>
  <TodoList  todoList = {todoList} />
  <AddTodoForm onAddTodo = {AddTodo} />
  </div>
  );
  }
  
export default App;
