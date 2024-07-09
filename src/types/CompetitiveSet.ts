export type CompetitiveSet = {
  compSetName: string;
  propertyIDs: string;
};

export type CreateCompetitiveSet = {
  CompSetDataInputs: CompetitiveSet;
};

export type EditCompetitiveSet = {
  CompSetDataInputs: CompetitiveSet & { compSetId: string };
};
