// apps/courier-app/src/services/api.js
const API_BASE = 'https://zippy-commitment-production-dfeb.up.railway.app/api';

export async function fetchAPI(url, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${url}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    return await res.json();
  } catch (e) {
    console.error('API Error:', e);
    return { success: false, message: e.message };
  }
}

export const orderAPI = {
  getAll: () => fetchAPI('/customer/orders/all'),
  updateStatus: (data) => fetchAPI('/order/status', { method: 'PUT', body: JSON.stringify(data) }),
};

export const authAPI = {
  getCurrentKurir: () => {
    const saved = localStorage.getItem('daka_kurir_logged');
    return saved ? JSON.parse(saved) : null;
  },
  setCurrentKurir: (kurir) => localStorage.setItem('daka_kurir_logged', JSON.stringify(kurir)),
  logout: () => localStorage.removeItem('daka_kurir_logged'),
};