import React from 'react';

export function InputOTP({ value, onChange, maxLength = 6, children }) {
  return (
    <div className="flex items-center gap-2">
      {children}
    </div>
  );
}

export function InputOTPGroup({ children }) {
  return <div className="flex items-center gap-1">{children}</div>;
}

export function InputOTPSlot({ index, ...props }) {
  return (
    <input
      type="text"
      maxLength={1}
      className="w-10 h-10 text-center font-bold rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
      {...props}
    />
  );
}

export default InputOTP;
