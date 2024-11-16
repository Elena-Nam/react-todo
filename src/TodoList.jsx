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
  
function TodoList() {
return (
    <ul>
    {todoList.map((item) => (
        <li key={item.id}>
        <span>
        <a href={item.url}>{item.title}</a>
        </span>
        </li>
    ))}
    </ul>
);
}
export default TodoList;