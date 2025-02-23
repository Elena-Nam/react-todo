import styles from './ListLayout.module.css'

export default function ListsLayout ({ setSelectedCategory }){
  
  // Function to handle category selection
const handleCategoryChange = (category) => {
  setSelectedCategory(category);
};

return(
  <div className = {styles.Layout}>
    <h2> My groups: </h2>
    <div className={styles.categoryButtons}>
      <button onClick={() => handleCategoryChange('study')} className={styles.linkButton}>Study</button>
      <button onClick={() => handleCategoryChange('work')} className={styles.linkButton}>Work</button>
      <button onClick={() => handleCategoryChange('grocery')} className={styles.linkButton}>Grocery</button>
      <button onClick={() => handleCategoryChange('other')} className={styles.linkButton}>Other</button>
    </div>
  </div>
    
)
}