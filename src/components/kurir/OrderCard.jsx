// apps/courier-app/src/components/kurir/OrderCard.jsx
import React from 'react';

export default function OrderCard({ order, type, onStart, onComplete, onCancel }) {
  const isPickup = type === 'pickup';
  const statusText = isPickup 
    ? (order.pickupStatus === 'progress' ? 'Dalam Perjalanan' : 'Menunggu')
    : (order.deliveryStatus === 'progress' ? 'Dalam Perjalanan' : 'Menunggu');
  
  const statusClass = order.pickupStatus === 'progress' || order.deliveryStatus === 'progress' 
    ? 'status-progress' 
    : 'status-pending';

  return (
    <div className={`order-card ${isPickup ? 'pickup' : 'delivery'}`}>
      <div className="order-header">
        <span className="order-resi">
          <i className={`fas ${isPickup ? 'fa-box' : 'fa-truck'}`}></i> {order.noResi}
        </span>
        <span className={`order-status ${statusClass}`}>{statusText}</span>
      </div>
      
      <div className="order-detail">
        <i className="fas fa-user"></i> {isPickup ? 'Pengirim' : 'Penerima'}: {isPickup ? order.pengirim : order.penerima}
        {isPickup && order.pengirimTelp && <span> ({order.pengirimTelp})</span>}
        {!isPickup && order.penerimaTelp && <span> ({order.penerimaTelp})</span>}
      </div>
      
      <div className="order-detail">
        <i className="fas fa-map-marker-alt"></i> Alamat: {isPickup ? order.pengirimAlamat?.full || '-' : order.penerimaAlamat?.full || '-'}
      </div>
      
      <div className="order-actions">
        {(order.pickupStatus === 'progress' && isPickup) || (order.deliveryStatus === 'progress' && !isPickup) ? (
          <button className="btn-sm btn-success" onClick={() => onComplete(order)}>
            <i className="fas fa-camera"></i> Foto & Selesai
          </button>
        ) : (
          <button className="btn-sm btn-primary" onClick={() => onStart(order)}>
            <i className="fas fa-play"></i> Mulai {isPickup ? 'Pickup' : 'Delivery'}
          </button>
        )}
        <button className="btn-sm btn-danger" onClick={() => onCancel(order)}>
          <i className="fas fa-times"></i> Batal
        </button>
      </div>
    </div>
  );
}