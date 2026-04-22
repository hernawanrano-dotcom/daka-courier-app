// apps/courier-app/src/hooks/useKurirOrders.js
import { useState, useEffect, useCallback } from 'react';
import { orderAPI } from '../services/api';

export function useKurirOrders(kurirId) {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await orderAPI.getAll();
      if (res?.success) {
        setAllOrders(res.orders || []);
      }
    } catch (error) {
      console.error('Fetch orders error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateOrderStatus = async (orderId, updates) => {
    const res = await orderAPI.updateStatus({ orderId, ...updates });
    if (res?.success) {
      await fetchData();
    }
    return res;
  };

  const isToday = (dateStr) => {
    return dateStr === new Date().toISOString().split('T')[0];
  };

  const getPickupOrders = () => {
    return allOrders.filter(o => 
      isToday(o.scheduleDate) && 
      o.assignedPickupKurirId === kurirId && 
      o.pickupStatus !== 'done' && 
      o.status !== 'dibatalkan'
    );
  };

  const getDeliveryOrders = () => {
    return allOrders.filter(o => 
      isToday(o.scheduleDate) && 
      o.assignedDeliveryKurirId === kurirId && 
      o.deliveryStatus !== 'done' && 
      o.status !== 'dibatalkan'
    );
  };

  return {
    allOrders,
    loading,
    fetchData,
    updateOrderStatus,
    getPickupOrders,
    getDeliveryOrders,
  };
}