import React from 'react';
import FadeSlide from './FadeSlide.jsx';
import CompanionForm from './CompanionForm.jsx';

const CompanionsList = ({ companions, removingIndexes, handleRemoveCompanion, handleCompanionChange }) => (
  <>
    {companions.map((companion, idx) => (
      <FadeSlide key={idx} show={!removingIndexes.includes(idx)}>
        <CompanionForm
          index={idx}
          data={companion}
          onRemove={handleRemoveCompanion}
          onChange={handleCompanionChange}
        />
      </FadeSlide>
    ))}
  </>
);

export default CompanionsList;
