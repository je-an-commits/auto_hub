import React from 'react';

function CarTable({ cars, onDelete }) {
  return (
    <div className="table-container">
      <div className="action-buttons">
        <button className="action-btn" onClick={() => alert('Export feature - will generate CSV file')}>📎 Export List</button>
        <button className="action-btn" onClick={() => alert('Print feature - will print inventory')}>🖨️ Print</button>
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
                <td><button className="delete-btn" onClick={() => onDelete(car.id)}>🗑️ Delete</button></td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>🚫 No cars found matching your search</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CarTable;