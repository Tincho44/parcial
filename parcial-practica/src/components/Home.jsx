import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { getAllDishes, createDish, deleteDish } from '../services/RecetaService';

function Home() {
  const [dishes, setDishes] = useState([]);
  const [open, setOpen] = useState(false);
  const [newDish, setNewDish] = useState({ name: '', description: '', type: '', preparation: '' });
  const [filterType, setFilterType] = useState(''); 

  useEffect(() => {
    const allDishes = getAllDishes();
    allDishes.then((data) => setDishes(data));
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    setNewDish({ ...newDish, [e.target.name]: e.target.value });
  };

  const handleAddDish = async () => {
    try {
      const updatedDishes = await createDish(newDish);
      setDishes(updatedDishes);
      handleClose();
    } catch (error) {
      console.error('Error al agregar una receta:', error);
    }
  };

  const handleDeleteDish = async (id) => {
    try {
      await deleteDish(id);
      const updatedDishes = await getAllDishes();
      setDishes(updatedDishes);
    } catch (error) {
      console.error('Error al eliminar una receta:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const filteredDishes = filterType
    ? dishes.filter((dish) => dish.type === filterType)
    : dishes;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recetas</h1>
      <button className={styles.addButton} onClick={handleOpen}>Nueva Receta</button>
      <div>
        <label className={styles.filterLabel} htmlFor="filter">Filtrar por: </label>
        <input
          className={styles.filterInput}
          id="filter"
          type="text"
          placeholder="Tipo de comida"
          value={filterType}
          onChange={handleFilterChange}
        />
      </div>
      <div className={styles.dishGrid}>
        {filteredDishes.map((dish) => (
          <div key={dish.id} className={styles.dishCard}>
            <h2>{dish.name}</h2>
            <p>Receta: {dish.description}</p>
            <p>Comida: {dish.type}</p>
            <Link to={`/dish/${dish.id}`} className={styles.detailsButton}>Ver detalles</Link>
            <button className={styles.deleteButton} onClick={() => handleDeleteDish(dish.id)}>Borrar</button>
          </div>
        ))}
      </div>
      {open && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Agregar nueva receta</h2>
            <form onSubmit={handleAddDish}>
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={newDish.name || ""}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Descripción"
                value={newDish.description}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="type"
                placeholder="Tipo de comida"
                value={newDish.type}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="preparation"
                placeholder="Preparación"
                value={newDish.preparation}
                onChange={handleInputChange}
                required
              />
              <button type="submit" className={styles.saveButton}>Agregar</button>
              <button type="button" className={styles.cancelButton} onClick={handleClose}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;