import React from 'react';
import { NavLink } from 'react-router-dom'; 


const Menu = () => {
  return (
    <>
      <nav>
        <div>
        <NavLink to="/"className={({ isActive }) => (isActive ? 'active' : '')}>
         <span className="fa fa-home"></span> Home </NavLink>   
        <NavLink to="/lists" className={({ isActive }) => (isActive ? 'active' : '')}> 
        <span className="fa fa-file-text-o"></span> Lists </NavLink>
        </div>
        <Clock /> 
        <p className='date'> Date: {new Date().toDateString()}</p>
      </nav>
    </>
  );
};

export default Menu;
