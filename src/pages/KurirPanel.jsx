// apps/courier-app/src/pages/KurirPanel.jsx
import React, { useState, useEffect } from 'react';
import { useKurirAuth } from '../hooks/useKurirAuth';
import { useKurirOrders } from '../hooks/useKurirOrders';
import Sidebar from '../components/kurir/Sidebar';
import DashboardStats from '../components/kurir/DashboardStats';
import PickupList from '../components/kurir/PickupList';
import DeliveryList from '../components/kurir/DeliveryList';
import PhotoModal from '../components/kurir/PhotoModal';
import CancelModal from '../components/kurir/CancelModal';

export default function KurirPanel() {
  const { kurir, loading: authLoading, logout } = useKurirAuth();
  const {
    getPickupOrders,
    getDeliveryOrders,
    updateOrderStatus,
    fetchData,
  } = useKurirOrders(kurir?.id);

  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [photoModal, setPhotoModal] = useState({ isOpen: false, order: null, type: null });
  const [cancelModal, setCancelModal] = useState({ isOpen: false, order: null, type: null });
  const [refreshInterval, setRefreshInterval] = useState(null);

  useEffect(() => {
    if (kurir) {
      fetchData();
      const interval = setInterval(fetchData, 10000);
      setRefreshInterval(interval);
      return () => clearInterval(interval);
    }
  }, [kurir, fetchData]);

  const pickupOrders = getPickupOrders();
  const deliveryOrders = getDeliveryOrders();

  const handleStartPickup = async (order) => {
    await updateOrderStatus(order.id, {
      pickupStatus: 'progress',
      note: '🚚 Kurir menuju lokasi pickup',
    });
  };

  const handleStartDelivery = async (order) => {
    await updateOrderStatus(order.id, {
      deliveryStatus: 'progress',
      note: '🚛 Kurir menuju lokasi delivery',
    });
  };

  const handleCompleteWithPhoto = (order, type) => {
    setPhotoModal({ isOpen: true, order, type });
  };

  const handleSubmitPhoto = async (photoData) => {
    const { order, type } = photoModal;
    const isPickup = type === 'pickup';
    
    const updates = isPickup
      ? { pickupStatus: 'done', pickupPhoto: photoData, status: 'proses_delivery' }
      : { deliveryStatus: 'done', deliveryPhoto: photoData, status: 'selesai' };
    
    await updateOrderStatus(order.id, updates);
    setPhotoModal({ isOpen: false, order: null, type: null });
    alert(`${isPickup ? 'Pickup' : 'Delivery'} selesai!`);
  };

  const handleOpenCancelModal = (order, type) => {
    setCancelModal({ isOpen: true, order, type });
  };

  const handleSubmitCancel = async (reason) => {
    const { order } = cancelModal;
    await updateOrderStatus(order.id, {
      status: 'dibatalkan',
      cancelReason: reason,
      cancelBy: 'kurir',
    });
    setCancelModal({ isOpen: false, order: null, type: null });
    alert('Order dibatalkan!');
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('daka_darkmode', document.body.classList.contains('dark-mode'));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (localStorage.getItem('daka_darkmode') === 'true') {
      document.body.classList.add('dark-mode');
    }
  }, []);

  if (authLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  if (!kurir) {
    // Redirect ke halaman login utama
    window.location.href = '/';
    return null;
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <>
            <DashboardStats
              pickupCount={pickupOrders.length}
              deliveryCount={deliveryOrders.length}
              onPickupClick={() => setCurrentPage('pickup')}
              onDeliveryClick={() => setCurrentPage('delivery')}
            />
            <div className="card">
              <h3><i className="fas fa-box"></i> Pickup Hari Ini</h3>
              <PickupList
                orders={pickupOrders.slice(0, 3)}
                onStart={handleStartPickup}
                onComplete={(order) => handleCompleteWithPhoto(order, 'pickup')}
                onCancel={(order) => handleOpenCancelModal(order, 'pickup')}
              />
            </div>
            <div className="card">
              <h3><i className="fas fa-truck"></i> Delivery Hari Ini</h3>
              <DeliveryList
                orders={deliveryOrders.slice(0, 3)}
                onStart={handleStartDelivery}
                onComplete={(order) => handleCompleteWithPhoto(order, 'delivery')}
                onCancel={(order) => handleOpenCancelModal(order, 'delivery')}
              />
            </div>
          </>
        );
      case 'pickup':
        return (
          <div className="card">
            <h3><i className="fas fa-box"></i> Daftar Pickup</h3>
            <PickupList
              orders={pickupOrders}
              onStart={handleStartPickup}
              onComplete={(order) => handleCompleteWithPhoto(order, 'pickup')}
              onCancel={(order) => handleOpenCancelModal(order, 'pickup')}
            />
          </div>
        );
      case 'delivery':
        return (
          <div className="card">
            <h3><i className="fas fa-truck"></i> Daftar Delivery</h3>
            <DeliveryList
              orders={deliveryOrders}
              onStart={handleStartDelivery}
              onComplete={(order) => handleCompleteWithPhoto(order, 'delivery')}
              onCancel={(order) => handleOpenCancelModal(order, 'delivery')}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <button className="menu-toggle" id="menuToggle" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>

      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-content">
        <div className="top-bar">
          <div className="page-title">
            <h2><i className="fas fa-truck"></i> Kurir Panel</h2>
          </div>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div className="avatar" id="kurirAvatar">{kurir.name.charAt(0)}</div>
            <span>{kurir.name}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
            <button className="dark-toggle" onClick={toggleDarkMode}>
              <i className="fas fa-moon"></i>
            </button>
          </div>
        </div>

        <div className="main-container">
          {renderContent()}
        </div>
      </div>

      <PhotoModal
        isOpen={photoModal.isOpen}
        type={photoModal.type}
        onClose={() => setPhotoModal({ isOpen: false, order: null, type: null })}
        onSubmit={handleSubmitPhoto}
      />

      <CancelModal
        isOpen={cancelModal.isOpen}
        onClose={() => setCancelModal({ isOpen: false, order: null, type: null })}
        onSubmit={handleSubmitCancel}
      />
    </>
  );
}