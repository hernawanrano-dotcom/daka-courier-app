// apps/courier-app/src/components/kurir/Sidebar.jsx
import React from 'react';

export default function Sidebar({ currentPage, onPageChange, isOpen, onClose }) {
  const menuItems = [
    { id: 'dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
    { id: 'pickup', icon: 'fas fa-box', label: 'Pickup' },
    { id: 'delivery', icon: 'fas fa-truck', label: 'Delivery' },
  ];

  const handleClick = (pageId) => {
    onPageChange(pageId);
    if (window.innerWidth <= 768) onClose();
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
      <div className="logo">
        <div className="logo-icon"><span>D</span></div>
        <h2>DAKA <span>Express</span></h2>
        <p>Kurir Panel</p>
      </div>
      <ul className="menu">
        {menuItems.map(item => (
          <li key={item.id} className={currentPage === item.id ? 'active' : ''}>
            <a onClick={() => handleClick(item.id)}>
              <i className={item.icon}></i> {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}