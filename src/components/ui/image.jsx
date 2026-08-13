import React from 'react';

export function Image({ src, alt = '', className = '', ...props }) {
  return (
    <img
      src={src || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800"}
      alt={alt}
      className={`object-cover ${className}`}
      {...props}
    />
  );
}

export default Image;
