// Redux slice para controlar o fluxo do pagamento Pix
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showPixModal: false, // Exibe modal do QR Code
  showProcessingModal: false, // Exibe modal de processamento
  showSuccessModal: false, // Exibe modal de sucesso
  showAuthRequiredModal: false, // Exibe modal de autenticação
  pixCode: '', // Código do QR Code
  paymentStatus: 'idle', // idle | pending | success | error
};

const pixPaymentSlice = createSlice({
  name: 'pixPayment',
  initialState,
  reducers: {
    openPixModal(state, action) {
      state.showPixModal = true;
      state.pixCode = action.payload || '';
      state.showProcessingModal = false;
      state.showSuccessModal = false;
      state.showAuthRequiredModal = false;
      state.paymentStatus = 'pending';
    },
    closePixModal(state) {
      state.showPixModal = false;
    },
    openProcessingModal(state) {
      state.showProcessingModal = true;
      state.showPixModal = false;
    },
    closeProcessingModal(state) {
      state.showProcessingModal = false;
    },
    openSuccessModal(state) {
      state.showSuccessModal = true;
      state.showProcessingModal = false;
      state.paymentStatus = 'success';
    },
    closeSuccessModal(state) {
      state.showSuccessModal = false;
    },
    openAuthRequiredModal(state) {
      state.showAuthRequiredModal = true;
      state.showPixModal = false;
      state.showProcessingModal = false;
      state.showSuccessModal = false;
    },
    closeAuthRequiredModal(state) {
      state.showAuthRequiredModal = false;
    },
    resetPixPayment(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  openPixModal,
  closePixModal,
  openProcessingModal,
  closeProcessingModal,
  openSuccessModal,
  closeSuccessModal,
  openAuthRequiredModal,
  closeAuthRequiredModal,
  resetPixPayment,
} = pixPaymentSlice.actions;

export default pixPaymentSlice.reducer;
