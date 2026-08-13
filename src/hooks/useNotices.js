import { useState, useEffect, useCallback } from 'react';
import { noticesService } from '@/services/notices.service';

export function useNotices(userId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await noticesService.getNotices(userId);
      setData(res);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  const markAsRead = async (noticeId) => {
    await noticesService.markAsRead(noticeId, userId);
    await fetchNotices();
  };

  return { data, loading, error, reload: fetchNotices, markAsRead };
}
