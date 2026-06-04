import React, { useState } from 'react';
import EditCarModal from './EditCarModal';

function CarTable({ cars, onDelete, onEdit }) {
  const [editingCar, setEditingCar] = useState(null);
  const exportCSV = () => {
    const headers = ['ID', 'Car Model', 'Brand', 'Price', 'Year', 'Status'];
    const rows = cars.map(car => [
      car.id,
      car.name,
      car.brand,
      car.price,
      car.year,
      car.status
    ]);
    const toCsvField = val => `"${String(val).replace(/"/g, '""')}"`;
    const csvContent = [
      headers.map(toCsvField).join(','),
      ...rows.map(row => row.map(toCsvField).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'inventory.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="table-container">
      <div className="action-buttons">
        <button className="action-btn" onClick={exportCSV}>📎 Export List</button>
        <button className="action-btn" onClick={handlePrint}>🖨️ Print</button>
      </div>
      <table className="data-table">
        <thead>
          <tr><th>ID</th><th>Car Model</th><th>Brand</th><th>Price</th><th>Year</th><th>Status</th><th>Action</th></tr>
        </thead>
        <tbody>
          {cars.length > 0 ? (
            cars.map(car => (
              <tr key={car.id}>
                <td>{car.id}</td><td>{car.name}</td><td>{car.brand}</td><td>{car.price}</td><td>{car.year}</td>
                <td><span className={`status-badge status-${car.status === 'Available' ? 'available' : 'sold'}`}>{car.status}</span></td>
                <td>
                  <button className="edit-btn" onClick={() => setEditingCar(car)}>✏️ Edit</button>
                  <button className="delete-btn" onClick={() => onDelete(car.id)}>🗑️ Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>🚫 No cars found matching your search</td></tr>
          )}
        </tbody>
      </table>

      {editingCar && (
        <EditCarModal
          car={editingCar}
          onSave={(updated) => { onEdit(updated); setEditingCar(null); }}
          onClose={() => setEditingCar(null)}
        />
      )}
    </div>
  );
}

export default CarTable;