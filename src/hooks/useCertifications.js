import { useState, useEffect, useCallback } from 'react';
import { certificationsService } from '@/services/certifications.service';

export function useCertifications(userId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCertifications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await certificationsService.getUserCertifications(userId);
      setData(res);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchCertifications();
  }, [fetchCertifications]);

  const addCertification = async (payload) => {
    const newCert = await certificationsService.addCertification(userId, payload);
    await fetchCertifications();
    return newCert;
  };

  return { data, loading, error, reload: fetchCertifications, addCertification };
}
