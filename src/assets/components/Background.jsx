import { useLocation } from 'react-router-dom';

const Background = () => {
    const location = useLocation();
  
    let backgroundClass = 'app-background';
  
    if (location.pathname === '/') {
      backgroundClass = 'background-home';
    } else if (location.pathname === '/lists') {
      backgroundClass = 'background-my-lists';
    } else if (location.pathname === '*') {
      backgroundClass = 'background-not-found';
    }
    console.log('Current Background Class:', backgroundClass); 
    return <div className={backgroundClass}></div>;
  };
  
  export default Background;