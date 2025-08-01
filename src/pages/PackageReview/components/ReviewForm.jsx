import React from 'react';
import ResponsibleForm from './ResponsibleForm.jsx';
import CompanionsList from './CompanionsList.jsx';
import ButtonAddCompanion from './buttonAddCompanion.jsx';

const ReviewForm = ({
  responsible,
  handleResponsibleChange,
  handleAddCompanion,
  companions,
  removingIndexes,
  handleRemoveCompanion,
  handleCompanionChange
}) => (
  <div className="flex-1 flex flex-col gap-6 order-2">
    <ResponsibleForm
      responsible={responsible}
      handleResponsibleChange={handleResponsibleChange}
    >
      <ButtonAddCompanion onClick={handleAddCompanion} />
    </ResponsibleForm>
    <CompanionsList
      companions={companions}
      removingIndexes={removingIndexes}
      handleRemoveCompanion={handleRemoveCompanion}
      handleCompanionChange={handleCompanionChange}
    />
  </div>
);

export default ReviewForm;
