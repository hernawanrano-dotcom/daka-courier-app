// apps/courier-app/src/components/kurir/DashboardStats.jsx
import React from 'react';

export default function DashboardStats({ pickupCount, deliveryCount, onPickupClick, onDeliveryClick }) {
  return (
    <div className="stats-grid">
      <div className="stat-card" onClick={onPickupClick} style={{ cursor: 'pointer' }}>
        <h3>{pickupCount}</h3>
        <p>Pickup</p>
      </div>
      <div className="stat-card" onClick={onDeliveryClick} style={{ cursor: 'pointer' }}>
        <h3>{deliveryCount}</h3>
        <p>Delivery</p>
      </div>
    </div>
  );
}