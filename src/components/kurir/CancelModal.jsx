// apps/courier-app/src/components/kurir/CancelModal.jsx
import React, { useState } from 'react';

export default function CancelModal({ isOpen, onClose, onSubmit }) {
  const [reason, setReason] = useState('');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!reason) {
      alert('Pilih alasan!');
      return;
    }
    const fullReason = note ? `${reason} - ${note}` : reason;
    onSubmit(fullReason);
  };

  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Batalkan Order</h3>
          <button className="close-modal" onClick={onClose}>&times;</button>
        </div>
        
        <div className="form-group">
          <label>Alasan Pembatalan</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '12px' }}
          >
            <option value="">Pilih alasan...</option>
            <option value="Alamat tidak ditemukan">Alamat tidak ditemukan</option>
            <option value="Penerima tidak ada">Penerima tidak ada</option>
            <option value="Kendala teknis">Kendala teknis</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Catatan</label>
          <textarea
            rows="2"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{ width: '100%', padding: '12px' }}
            placeholder="Catatan tambahan..."
          />
        </div>
        
        <button className="btn-danger" onClick={handleSubmit} style={{ width: '100%', padding: '12px' }}>
          Batalkan Order
        </button>
      </div>
    </div>
  );
}