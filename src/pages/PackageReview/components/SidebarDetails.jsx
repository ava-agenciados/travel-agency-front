import React from 'react';
import PackageDetails from './PackageDetails.jsx';
import ConfirmPayment from '../../../components/Payment/ConfirmPayment.jsx';


const SidebarDetails = ({ onConfirm }) => (
  <div className="hidden lg:flex flex-col gap-6 w-full lg:w-[350px] order-3">
    <PackageDetails />
    <ConfirmPayment onConfirm={onConfirm} />
  </div>
);

export default SidebarDetails;
