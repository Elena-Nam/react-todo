import * as React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

const useSemiPersistentState = () => {

  // Retrieve the saved todo list from localStorage or default to an empty array
  const savedTodoList = JSON.parse (localStorage.getItem ('savedTodoList')) || [];

  const [todoList, setTodoList] = React.useState(savedTodoList);

  // Save the todo list to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }, [todoList]);

  return [todoList, setTodoList]; 
}


function App () {

const [todoList, setTodoList] = useSemiPersistentState();

function AddTodo (newTodo) {
  setTodoList ((prevTodoList) => [...prevTodoList, newTodo])
}

return (
  <>
  <h1> Todo List </h1>
  <TodoList  todoList = {todoList} />
  <AddTodoForm onAddTodo = {AddTodo} />
  </>
  );
  }
  
export default App;
