import { SorterResult } from 'antd/lib/table';

type TableSortingInfo<T> = {
  field: SorterResult<T>['field'];
  order: SorterResult<T>['order'];
};

export default TableSortingInfo;
