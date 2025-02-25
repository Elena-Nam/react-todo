import { useState } from 'react';
import styles from './ListsLayout.module.css';

export default function ListsLayout({ setSelectedCategory }) {
  const [activeCategory, setActiveCategory] = useState(null);

  // Function to handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setActiveCategory(category); // Set the active category
  };

  return (
    <div className={styles.Layout}>
      <h2>My groups:</h2>
      <div className={styles.categoryButtons}>
        <button
          onClick={() => handleCategoryChange('study')}
          className={`${styles.linkButton} ${activeCategory === 'study' ? styles.active : ''}`}
        >
          Study
        </button>
        <button
          onClick={() => handleCategoryChange('work')}
          className={`${styles.linkButton} ${activeCategory === 'work' ? styles.active : ''}`}
        >
          Work
        </button>
        <button
          onClick={() => handleCategoryChange('grocery')}
          className={`${styles.linkButton} ${activeCategory === 'grocery' ? styles.active : ''}`}
        >
          Grocery
        </button>
        <button
          onClick={() => handleCategoryChange('other')}
          className={`${styles.linkButton} ${activeCategory === 'other' ? styles.active : ''}`}
        >
          Other
        </button>
      </div>
    </div>
  );
}
