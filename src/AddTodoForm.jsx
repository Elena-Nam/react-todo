function AddTodoForm () {
return(
    <form>
    <label htmlFor = "todoTitle"> Title </label>
    <input id = "todoTitle" type = "text"/>
    <button type = "submit"> Submit </button>
    </form>
)
}
export default AddTodoForm;