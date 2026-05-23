import React from 'react';

function Dashboard({ cars }) {
  const availableCars = cars.filter(car => car.status === 'Available').length;
  const totalValue = cars.reduce((acc, car) => {
    const priceNum = parseInt(car.price.replace(/[^0-9]/g, '')) || 0;
    return acc + priceNum;
  }, 0);

  const stats = [
    { title: 'Total Cars', value: cars.length, icon: '🚙', color: '#ff6b6b' },
    { title: 'Available', value: availableCars, icon: '✅', color: '#4caf50' },
    { title: 'Sold', value: cars.length - availableCars, icon: '💰', color: '#ff9800' },
    { title: 'Inventory Value', value: `$${totalValue.toLocaleString()}`, icon: '💵', color: '#2196f3' },
  ];

  const recentCars = [...cars].slice(-3);

  return (
    <div>
      <div className="dashboard-stats">
        {stats.map((stat, idx) => (
          <div className="stat-card" key={idx}>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <div className="stat-number">{stat.value}</div>
            </div>
            <div className="stat-icon">{stat.icon}</div>
          </div>
        ))}
      </div>

      <div className="recent-section">
        <h3>📋 Recently Added Vehicles</h3>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr><th>Model</th><th>Brand</th><th>Price</th><th>Status</th></tr>
            </thead>
            <tbody>
              {recentCars.length > 0 ? (
                recentCars.map(car => (
                  <tr key={car.id}>
                    <td>{car.name}</td><td>{car.brand}</td><td>{car.price}</td>
                    <td><span className={`status-badge status-${car.status === 'Available' ? 'available' : 'sold'}`}>{car.status}</span></td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" style={{ textAlign: 'center' }}>No cars in inventory</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;