import React from 'react';
import { Link } from 'react-router-dom';

export function PageNotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-indigo-400">404</h1>
        <p className="text-sm text-slate-400">The requested campus route does not exist.</p>
        <Link to="/" className="inline-block px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}