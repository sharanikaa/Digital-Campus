import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER, ROLES } from './campus';
import { supabase, isSupabaseConfigured } from './supabase';
import { authService } from '@/services/auth.service';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(INITIAL_USER);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unreadNoticesCount, setUnreadNoticesCount] = useState(2);
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Attendance Alert', message: 'CS308 Attendance is currently 71.0% (below 75% limit)', time: '10m ago', unread: true },
    { id: '2', title: 'New Event Registered', message: 'Registered for HackCampus 2026', time: '1h ago', unread: true },
  ]);

  useEffect(() => {
    let mounted = true;

    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    // Get current session & profile
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (!mounted) return;
      setSession(currentSession);
      if (currentSession?.user) {
        authService.getProfile(currentSession.user.id).then(profile => {
          if (mounted && profile) setUser(profile);
        });
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      if (!mounted) return;
      setSession(currentSession);
      if (currentSession?.user) {
        const profile = await authService.getProfile(currentSession.user.id);
        if (mounted && profile) setUser(profile);
      } else {
        if (mounted) setUser(INITIAL_USER);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    if (res.user) setUser(res.user);
    if (res.session) setSession(res.session);
    return res;
  };

  const signUp = async (payload) => {
    const res = await authService.signUp(payload);
    return res;
  };

  const logout = async () => {
    await authService.logout();
    setSession(null);
    setUser(INITIAL_USER);
  };

  const switchRole = (newRole) => {
    setUser(prev => ({
      ...prev,
      role: newRole,
      name: newRole === 'Faculty' ? 'Dr. Marcus Holloway' :
            newRole === 'Placement_Officer' ? 'Sarah Jenkins (TPO)' :
            newRole === 'Club_Coordinator' ? 'Elena Rostova (DevX Lead)' :
            newRole === 'Admin' ? 'System Administrator' : 'Alex Vance'
    }));
  };

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    setUnreadNoticesCount(0);
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      session,
      loading,
      roles: ROLES,
      login,
      signUp,
      logout,
      switchRole,
      notifications,
      unreadNoticesCount,
      markNotificationsRead
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
