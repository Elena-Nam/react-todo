
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { FaHome, FaTasks } from 'react-icons/fa';
import './assets/components/App.css';
import Calendar from './assets/components/Calendar/Calendar';
import Clock from './assets/components/Clock';
import Footer from './assets/components/Footer/Footer';
import Home from './assets/pages/Home/Home';
import NotFound from './assets/pages/NotFoundPage/NotFound';
import TodoContainer from './assets/components/TodoContainer/TodoContainer';  
import {ListsLayout}  from './assets/pages/ListLayout/ListsLayout';

function App() {
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortField, setSortField] = useState('time');
  const [date, setDate] = useState(new Date());

  return (
    <div className="app-background">
      <BrowserRouter>
        <nav>
          <div className="nav-icons">
            <Link to="/" className="active">
              <FaHome size={20} />
            </Link>
            <Link to="/lists">
              <FaTasks size={20} />
            </Link>
          </div>
          <h3 className="title">DAY-TO-DAY</h3>
          <Clock />
          <p className="date"> Date: {new Date().toDateString()}</p>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/lists"
            element={
              <div className="layoutContainer">
                <div className ="column">
                  <ListsLayout/>
                </div>
                <div className="column">
                  <TodoContainer
                    sortDirection={sortDirection}
                    sortField={sortField}
                    setSortDirection={setSortDirection}
                    setSortField={setSortField}
                    selectedDate={date}
                  />
                </div>

                <div className="column">
                  <Calendar selectedDate={date} onDateChange={setDate} />
                  <p className="select-date">Selected date: {date.toDateString()}</p>
                </div>
              </div>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
