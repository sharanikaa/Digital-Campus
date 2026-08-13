import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export function useEntity(name, { sort, limit, filter } = {}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reloadKey, setReloadKey] = useState(0);
    const reload = () => setReloadKey(k => k + 1);

    const filterKey = JSON.stringify(filter || {});

    useEffect(() => {
        let live = true;
        setLoading(true);
        (async () => {
            try {
                if (!isSupabaseConfigured()) {
                    if (live) { setData([]); setError(null); setLoading(false); }
                    return;
                }

                let query = supabase.from(name).select('*');
                if (filter && Object.keys(filter).length) {
                    Object.entries(filter).forEach(([key, val]) => {
                        query = query.eq(key, val);
                    });
                }
                if (limit) query = query.limit(limit);

                const { data: res, error: err } = await query;
                if (err) throw err;

                if (live) { setData(res || []); setError(null); }
            } catch (e) {
                if (live) setError(e);
            } finally {
                if (live) setLoading(false);
            }
        })();
        return () => { live = false; };
    }, [name, filterKey, sort, limit, reloadKey]);

    return { data, loading, error, reload };
}