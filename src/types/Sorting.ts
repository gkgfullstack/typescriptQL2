import { SorterResult, SortOrder } from 'antd/lib/table';

export interface Sorting<T> {
  field: SorterResult<T>['field'];
  order: SortOrder;
}
