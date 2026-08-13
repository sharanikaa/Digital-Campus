import { useState, useEffect, useCallback } from 'react';
import { notificationsService } from '@/services/notifications.service';

export function useNotifications(userId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await notificationsService.getNotifications(userId);
      setData(res);
    } catch {
      // fallback handled in service
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchNotifications();

    const unsubscribe = notificationsService.subscribeToNotifications(userId, newNotif => {
      setData(prev => [newNotif, ...prev]);
    });

    return () => unsubscribe();
  }, [userId, fetchNotifications]);

  const markAllRead = async () => {
    setData(prev => prev.map(n => ({ ...n, unread: false })));
    await notificationsService.markAllRead(userId);
  };

  return { data, loading, markAllRead, reload: fetchNotifications };
}
