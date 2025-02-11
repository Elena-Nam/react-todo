import { Link, Outlet } from 'react-router-dom';
import styles from './ListLayout.module.css'

export function ListsLayout (){
  
return(
  <div className = {styles.Layout}>
    <h2> My groups: </h2>
    <Link to = "/work"> work </Link>
    <Link to = "/study"> study </Link>
    <Link to = "/grocery"> grocery </Link>
    <Link to = "/others"> other </Link>
    <Outlet/>
  </div>
    
)
}