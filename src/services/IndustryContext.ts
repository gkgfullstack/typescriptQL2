import React from 'react';

const industryContext = {
  isUpdated: false,
  updateIndustry: (isUpdated: any) => {
    console.log(isUpdated);
  },
};

export const IndustryContext = React.createContext(industryContext);
