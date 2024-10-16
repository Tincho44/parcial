import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import DishDetails from './components/DishDetails';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/dish/:id" element={<DishDetails />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;