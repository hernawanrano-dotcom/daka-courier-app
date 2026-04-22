// apps/courier-app/src/components/kurir/PickupList.jsx
import React from 'react';
import OrderCard from './OrderCard';

export default function PickupList({ orders, onStart, onComplete, onCancel }) {
  if (orders.length === 0) {
    return (
      <div className="card">
        <p>✨ Tidak ada order pickup ✨</p>
      </div>
    );
  }

  return (
    <div>
      {orders.map(order => (
        <OrderCard
          key={order.id}
          order={order}
          type="pickup"
          onStart={onStart}
          onComplete={onComplete}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
}