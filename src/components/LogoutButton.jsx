import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutAsync } from '../store/authThunks';

const LogoutButton = () => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(logoutAsync())}
      style={{
        padding: '8px 16px',
        background: '#e53935',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        margin: '16px 0',
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
