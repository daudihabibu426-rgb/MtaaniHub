import React from 'react';

const Badge = ({ variant = 'primary', children }) => {
  const variants = {
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    gray: 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
};

export default Badge;
