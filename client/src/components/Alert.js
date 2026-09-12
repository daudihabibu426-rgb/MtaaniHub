import React from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfoIcon, FiAlertTriangle } from 'react-icons/fi';

const Alert = ({ type = 'info', title, message, onClose }) => {
  const typeStyles = {
    success: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    info: 'bg-blue-100 text-blue-800 border-blue-300'
  };

  const iconMap = {
    success: <FiCheckCircle className="text-green-600" size={20} />,
    error: <FiAlertCircle className="text-red-600" size={20} />,
    warning: <FiAlertTriangle className="text-yellow-600" size={20} />,
    info: <FiInfoIcon className="text-blue-600" size={20} />
  };

  return (
    <div className={`border-l-4 p-4 rounded ${typeStyles[type]} flex gap-4 items-start`}>
      <div>{iconMap[type]}</div>
      <div className="flex-1">
        {title && <p className="font-semibold mb-1">{title}</p>}
        <p className="text-sm">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-current opacity-70 hover:opacity-100">
          ✕
        </button>
      )}
    </div>
  );
};

export default Alert;
