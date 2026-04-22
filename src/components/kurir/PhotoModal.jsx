// apps/courier-app/src/components/kurir/PhotoModal.jsx
import React, { useState } from 'react';

export default function PhotoModal({ isOpen, type, onClose, onSubmit }) {
  const [photoData, setPhotoData] = useState(null);
  const [preview, setPreview] = useState(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoData(event.target.result);
        setPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!photoData) {
      alert('Harap ambil foto!');
      return;
    }
    onSubmit(photoData);
  };

  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Upload Foto Bukti</h3>
          <button className="close-modal" onClick={onClose}>&times;</button>
        </div>
        
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          style={{ width: '100%', marginBottom: '16px' }}
        />
        
        {preview && (
          <div className="photo-preview">
            <img src={preview} alt="Preview" style={{ width: '100px', borderRadius: '8px' }} />
          </div>
        )}
        
        <button className="btn-success" onClick={handleSubmit} style={{ width: '100%', marginTop: '16px' }}>
          Kirim & Selesai
        </button>
      </div>
    </div>
  );
}