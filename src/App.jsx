import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CarTable from './components/CarTable';
import CarForm from './components/CarForm';
import './App.css';
import { useEffect } from 'react';
import api from "./api/axios"

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await api.get(`/cars/`)
        setCars(res.data.allCars || [])
      } catch(err) {
        console.error("Failed to fetch cars:", err)
      }
    };
    fetchCars();
  }, []);
  const [searchTerm, setSearchTerm] = useState('');

  const addCar = async (newCar) => {
    try {
      const res = await api.post("/cars/create", newCar);
      setCars(prevCars => [...prevCars, res.data]); 
      alert('Car added successfully!');
    } catch (err) {
      console.error("Failed to add car:", err);
    }
  };

  const editCar = async (updatedCar) => {
    try {
      const { id, name, brand, price, year, status } = updatedCar;
      await api.put(`/cars/update/${id}`, { name, brand, price, year, status });
      setCars(prevCars => prevCars.map(car => car.id === id ? updatedCar : car));
      alert('Car updated successfully!');
    } catch (err) {
      console.error("Failed to update car:", err);
      alert('Could not update car. Please try again.');
    }
  };

  const deleteCar = async (id) => {
    try {
      await api.delete(`/cars/delete/${id}`); 
      setCars(prevCars => prevCars.filter(car => car.id !== id));
      alert('Car removed from inventory successfully!');
    } catch (err) {
      console.error("Failed to delete car from database:", err);
      alert('Could not delete car. Please try again.');
    }
  };

  const carList = Array.isArray(cars) ? cars : [];

  const filteredCars = carList.filter(car =>
    car.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <div className="app">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="main-content">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {activeSection === 'dashboard' && <Dashboard cars={cars} />}
        {activeSection === 'inventory' && (
          <CarTable cars={filteredCars} onDelete={deleteCar} onEdit={editCar} />
        )}
        {activeSection === 'add-car' && <CarForm onAddCar={addCar} />}
      </div>
    </div>
  );
}

export default App;