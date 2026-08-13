import React, { Component } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/ui/sidebar';
import { Dashboard } from './pages/Dashboard';
import { Attendance } from './pages/Attendance';
import { Certifications } from './pages/Certifications';
import { CertificationDetail } from './pages/CertificationDetail';
import { Clubs } from './pages/Clubs';
import { ClubDetail } from './pages/ClubDetail';
import { Events } from './pages/Events';
import { EventDetail } from './pages/EventDetail';
import { Notices } from './pages/Notices';
import { Placements } from './pages/Placements';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { PageNotFound } from './lib/PageNotFound';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary Caught Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 text-center">
          <div className="glass-panel p-8 rounded-3xl border border-rose-500/30 max-w-md space-y-4">
            <h2 className="text-xl font-bold text-rose-400">Application Rendering Issue</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              {this.state.error?.toString() || "An unexpected error occurred while rendering the page."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-lg"
            >
              Reload Digital Campus
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export function AppContent() {
  const location = useLocation();
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/certifications/:id" element={<CertificationDetail />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/clubs/:id" element={<ClubDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}