import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDishById } from '../services/RecetaService';
import styles from './DishDetails.module.css';

function DishDetails() {
  const [dish, setDish] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDish= async () => {
      try {
        const fetchedDish = await getDishById(id);  
        setDish(fetchedDish);  
      } catch (error) {
        console.error('Error fetching dish details:', error);
      }
    };

    fetchDish();
  }, [id]);

  if (!dish) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.dishDetails}>
        <h1>{dish.name}</h1>
        <p><strong>Descripción:</strong> {dish.description}</p>
        <p><strong>Preparación:</strong> {dish.preparation}</p>
        <p><strong>Categoria:</strong> {dish.type}</p>
        <Link to="/" className={styles.backButton}>Volver al inicio</Link>
      </div>
    </div>
  );
}

export default DishDetails;