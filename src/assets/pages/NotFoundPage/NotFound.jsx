import React from 'react';
import styles from '../NotFoundPage/NotFound.module.css'; 

function NotFound() {
  return (
    <div className={styles.NotFoundContainer}>
      <h1 className={styles.notFoundHeader}>404 - Not Found</h1>
      <p className={styles.notFoundText}>Oops! The page you're looking for doesn't exist.</p>
    </div>
  );
}

export default NotFound;