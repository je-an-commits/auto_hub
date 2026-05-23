import React from 'react';

function Sidebar({ activeSection, setActiveSection }) {
  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'inventory', icon: '🚗', label: 'Car Inventory' },
    { id: 'add-car', icon: '➕', label: 'Add New Car' },
  ];

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>Auto<span>Hub</span></h2>
        <small>Premium Motors</small>
      </div>
      {navItems.map(item => (
        <div
          key={item.id}
          className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
          onClick={() => setActiveSection(item.id)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;