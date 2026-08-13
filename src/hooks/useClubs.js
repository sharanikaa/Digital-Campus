import { useState, useEffect, useCallback } from 'react';
import { clubsService } from '@/services/clubs.service';

export function useClubs(userId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClubs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await clubsService.getClubs(userId);
      setData(res);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  const toggleMembership = async (clubId, isCurrentlyJoined) => {
    if (isCurrentlyJoined) {
      await clubsService.leaveClub(clubId, userId);
    } else {
      await clubsService.joinClub(clubId, userId);
    }
    await fetchClubs();
  };

  return { data, loading, error, reload: fetchClubs, toggleMembership };
}
