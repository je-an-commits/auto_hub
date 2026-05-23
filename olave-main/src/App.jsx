import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CarTable from './components/CarTable';
import CarForm from './components/CarForm';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [cars, setCars] = useState([
    { id: 1, name: 'Tesla Model 3', brand: 'Tesla', price: '$44,990', year: 2024, status: 'Available' },
    { id: 2, name: 'BMW M4', brand: 'BMW', price: '$74,900', year: 2024, status: 'Available' },
    { id: 3, name: 'Mercedes C-Class', brand: 'Mercedes', price: '$48,550', year: 2023, status: 'Sold' },
    { id: 4, name: 'Audi RS7', brand: 'Audi', price: '$125,000', year: 2024, status: 'Available' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const addCar = (newCar) => {
    setCars([...cars, { ...newCar, id: Date.now() }]);
    alert('Car added successfully!');
  };

  const deleteCar = (id) => {
    setCars(cars.filter(car => car.id !== id));
    alert('Car removed from inventory');
  };

  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="main-content">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {activeSection === 'dashboard' && <Dashboard cars={cars} />}
        {activeSection === 'inventory' && (
          <CarTable cars={filteredCars} onDelete={deleteCar} />
        )}
        {activeSection === 'add-car' && <CarForm onAddCar={addCar} />}
      </div>
    </div>
  );
}

export default App;