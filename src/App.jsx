import * as React from 'react';

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
return (
<div>
<h1>Todo List</h1>

 <label htmlFor="search">Search: </label>
<input id="search" type="text" />
<ul>
  {todoList.map(function (item) {
  return (
  <li key={item.id}>
  <span>
  <a href={item.url}>{item.title}</a>
  </span>
  </li>
);
})}
</ul>
</div>
);
}
export default App;
