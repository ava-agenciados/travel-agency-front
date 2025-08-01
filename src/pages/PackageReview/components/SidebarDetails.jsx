import React from 'react';
import PackageDetails from './PackageDetails.jsx';
import ConfirmPayment from '../../../components/Payment/ConfirmPayment.jsx';




const SidebarDetails = ({ onConfirm, packageData, startTravel, endTravel }) => (
  <div className="hidden lg:flex flex-col gap-6 w-full lg:w-[350px] order-3">
    <PackageDetails packageData={packageData} startTravel={startTravel} endTravel={endTravel} />
    <ConfirmPayment onConfirm={onConfirm} price={packageData?.price} />
  </div>
);

export default SidebarDetails;
