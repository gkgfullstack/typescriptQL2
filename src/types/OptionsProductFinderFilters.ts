// export type regionResGroupsDataFilter = {
//      Id: number;
//     regionName: string;
// };
export type regionResGroupsFilter = {
  regionGroupName:any;
  regionData:[{ 
    Id: number;
    value: string;
    label: string;
    title:string;
  }];
};

export type OptionsProductFinderFilters = {
  Regions:[{ 
    regionGroupName:any;
    region:[{ 
      Id: number;
      value: string;
      label: string;
      title:string;
    }];
}];
};
