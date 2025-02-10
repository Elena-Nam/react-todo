import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';

function InputWithLabel ({todoTitle, children, handleTitleChange}) {
    const inputRef = useRef(); //the input field is being focused on when the component mounts.
    useEffect (() => {
        inputRef.current.focus();
    })

    return (
     <>
        <label htmlFor = "todoTitle"> {children} </label>
        <input 
        ref = {inputRef}
        id = "todoTitle" 
        name = "title" 
        value = {todoTitle} 
        type = "text" required 
        onChange={handleTitleChange} 
       /> 
     </>
    );
  }

  InputWithLabel.propTypes = {
    todoTitle: PropTypes.string.isRequired,
    handleTitleChange: PropTypes.func.isRequired
  }

  export default InputWithLabel;