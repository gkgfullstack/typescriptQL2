import { MATCH_TYPE } from 'src/enums';

type FilterMatch = {
  productId: string;
  matchtype: keyof typeof MATCH_TYPE;
  variance: [{
    Id:number;
    label:string;
    max:number;
  }];
  owners:[{
    Id:string;
    label: string;
  }];
};

export default FilterMatch;
