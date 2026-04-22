// apps/courier-app/src/hooks/useKurirAuth.js
import { useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export function useKurirAuth() {
  const [kurir, setKurir] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = authAPI.getCurrentKurir();
    if (saved) {
      setKurir(saved);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    // Simulasi login - di real implementation panggil API
    if (userData.role === 'kurir') {
      const kurirData = { id: userData.id, name: userData.name, email: userData.email };
      setKurir(kurirData);
      authAPI.setCurrentKurir(kurirData);
      return true;
    }
    return false;
  };

  const logout = () => {
    setKurir(null);
    authAPI.logout();
  };

  return { kurir, loading, login, logout };
}