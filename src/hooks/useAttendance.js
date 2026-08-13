import { useState, useEffect, useCallback } from 'react';
import { attendanceService } from '@/services/attendance.service';

export function useAttendance(userId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAttendance = useCallback(async () => {
    setLoading(true);
    try {
      const records = await attendanceService.getAttendanceRecords(userId);
      setData(records);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  const markAttendance = async (payload) => {
    const res = await attendanceService.markAttendance(payload);
    await fetchAttendance();
    return res;
  };

  return { data, loading, error, reload: fetchAttendance, markAttendance };
}
