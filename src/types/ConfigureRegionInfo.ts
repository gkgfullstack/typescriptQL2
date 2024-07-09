type ConfigureRegionInfo = {
  ID?: number;
  name?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  owner: {
    ID: number;
  };
  active: boolean;
  value?: string;
};

export default ConfigureRegionInfo;
