import { useNavigate } from "react-router-dom";
import styles from '../Home/Home.module.css'

const Home = () => {
    const navigate = useNavigate();

    const onChangePage = () => {
      navigate('/lists'); 
    };
  
    return (
      <div className = {styles.Home}>
         <div className= {styles.image}>
          {/*<img src="/images/spring-846051_640.jpg" alt="home page" />*/}
        </div>
        <button type = "submit" className={styles.button} onClick={onChangePage}> Start </button>
      </div>
    )
  }

export default Home;