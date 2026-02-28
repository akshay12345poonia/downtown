import React from 'react';
import { FaUser } from 'react-icons/fa';

const LoginButton = ({ onLogin }) => {
  return (
    <div className="flex items-center">
      <button 
        onClick={onLogin}
        className="btn btn-primary group"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:scale-110">
          <FaUser size={16} />
        </div>
        <span className="font-semibold">Login</span>
      </button>
    </div>
  );
};

export default LoginButton;