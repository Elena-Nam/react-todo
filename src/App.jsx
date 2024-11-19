import * as React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';


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

function App() {
  
const [newTodo, setNewTodo] = React.useState('');
  
return (
  <div>
  <h1> Todo List </h1>
  <TodoList  todoList = {todoList}/>
  <AddTodoForm onAddTodo = {setNewTodo} />
  <p> the value of {newTodo} </p>
  </div>
  );
  }
  
export default App;
