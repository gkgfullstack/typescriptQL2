import React, { useState } from 'react';
import CreateCompetitiveSets from 'src/components/SettingsPage/CompetitiveSets/CompetitiveSetsView/CreateCompetitiveSets';
import CompetitiveSetsList from 'src/components/SettingsPage/CompetitiveSets/CompetitiveSetsView/CompetitiveSetsList';
import { CompetitiveSetsRequest, useGetCompetitiveSets } from 'src/api/competitorSets';
import {CompetitiveDeleteRequest,  useCompetitorDelete } from 'src/api/competitorDelete';

type CompetitiveSetsViewProps = {};

const CompetitiveSetsView: React.FC<CompetitiveSetsViewProps> = (): React.ReactElement => {
  const [requestParams, setRequestParams] = useState<CompetitiveSetsRequest | null>(null);
  
  const [loading, totalRecords, competitiveSetsList] = useGetCompetitiveSets(requestParams);
  const [requestDeleteParams, setRequestDeleteParams] = useState<CompetitiveDeleteRequest | null>(null);
const [{}, competitiveDelete] = useCompetitorDelete(requestDeleteParams);

  return (
    <>
      <CreateCompetitiveSets />
      <CompetitiveSetsList
        requestParams={requestParams}
        setRequestParams={setRequestParams}
        loading={loading}
        totalRecords={totalRecords}
        competitiveSetsList={competitiveSetsList}
        setRequestDeleteParams={setRequestDeleteParams}
        competitiveDelete={competitiveDelete}
      />
    </>
  );
};

export default CompetitiveSetsView;
