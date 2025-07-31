import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AuthRequiredModal from '../Modals/AuthRequiredModal';
import RefusedModal from '../Modals/RefusedModal';
import IconLoading from '../Modals/IconLoading';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreditCardForm from '../CreditCardForm';

const CreditCardPaymentFlow = ({ fields, setFields, showForm = true }) => {
  return (
    <>
      {showForm && <CreditCardForm fields={fields} setFields={setFields} />}
    </>
  );
};

export default CreditCardPaymentFlow;
