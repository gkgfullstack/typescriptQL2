import { NoOfMatchesFilter } from './NoOfMatchesFilter';
import { OwnersFilter } from './OwnersFilter';
import { PriceVarianceFilter } from './PriceVarianceFilter';
import { ManufacturerFilter } from './ManufacturerFilter';
import { PriceFilter } from './PriceFilter';
import { ActiveFilter } from './ActiveFilter';
import { InsightFilter } from './InsightFilter';
import CategoryPriceDistributionType from './CategoryPriceDistributionType';
import {CustomFilterCategories} from './CustomFilterType';
import { OptionsProductFinderFilters } from './OptionsProductFinderFilters';

export type ProductFinderFilters = {
  price: PriceFilter[];
  active:ActiveFilter[];
  insight:InsightFilter[];
  manufacturer?: ManufacturerFilter[];
  variance: PriceVarianceFilter[];
  owners: OwnersFilter[];
  noOfMatches: NoOfMatchesFilter[];  
  categoryList: CategoryPriceDistributionType[];
  customFilterList?: CustomFilterCategories[];
  region?:OptionsProductFinderFilters[];
};
