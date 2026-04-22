// apps/courier-app/src/components/kurir/DeliveryList.jsx
import React from 'react';
import OrderCard from './OrderCard';

export default function DeliveryList({ orders, onStart, onComplete, onCancel }) {
  if (orders.length === 0) {
    return (
      <div className="card">
        <p>✨ Tidak ada order delivery ✨</p>
      </div>
    );
  }

  return (
    <div>
      {orders.map(order => (
        <OrderCard
          key={order.id}
          order={order}
          type="delivery"
          onStart={onStart}
          onComplete={onComplete}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
}