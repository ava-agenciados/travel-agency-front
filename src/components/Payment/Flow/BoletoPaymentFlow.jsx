import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AuthRequiredModal from '../Modals/AuthRequiredModal';
import PendingModal from '../Modals/PendingModal';
import { useNavigate } from 'react-router-dom';

const BoletoPaymentFlow = ({ hideButton }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPendingModal, setShowPendingModal] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setShowPendingModal(true);
    setTimeout(() => {
      setShowPendingModal(false);
      navigate('/notfound');
    }, 3500);
  };

  const handleLogin = () => {
    setShowAuthModal(false);
    navigate('/login');
  };
  const handleRegister = () => {
    setShowAuthModal(false);
    navigate('/register');
  };

  return (
    <>
      {showAuthModal && (
        <AuthRequiredModal
          onLogin={handleLogin}
          onRegister={handleRegister}
          onClose={() => setShowAuthModal(false)}
        />
      )}
      {showPendingModal && <PendingModal />}
    </>
  );
};

export default BoletoPaymentFlow;
