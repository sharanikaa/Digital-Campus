import { useState, useEffect, useCallback } from 'react';
import { eventsService } from '@/services/events.service';

export function useEvents(userId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await eventsService.getEvents(userId);
      setData(res);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const toggleRegister = async (eventId, isCurrentlyRegistered) => {
    if (isCurrentlyRegistered) {
      await eventsService.cancelRegistration(eventId, userId);
    } else {
      await eventsService.registerEvent(eventId, userId);
    }
    await fetchEvents();
  };

  return { data, loading, error, reload: fetchEvents, toggleRegister };
}
