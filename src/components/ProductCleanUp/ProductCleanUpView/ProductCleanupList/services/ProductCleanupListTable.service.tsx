import { Sorting } from 'src/types/Sorting';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import ProductCleanupTableInfo from 'src/types/ProductCleanupTableInfo';
import React from 'react';
import styles from '../ProductCleanupListTable/ProductCleanupListTable.module.less';
import TableColumnsFilter from 'src/components/common/TableColumnsFilter';

interface ColumnConfig extends ColumnProps<ProductCleanupTableInfo> {
  customColRenderer?: (dataIndex: ProductCleanupTableInfo) => React.ReactNode;
}

export const sortOrder = (
  sortedInfo: Sorting<ProductCleanupTableInfo> | null,
  key: keyof ProductCleanupTableInfo
): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};

export const productNameRender = (record: any) => {
  return (
    <p>
      <a href={record.productUrl}>{record.productName}</a>
    </p>
  );
};

export const productRender = (record: any, item: string) => {
  const notColoredColumnNames = ['productName', 'productId'];
  const duplicateClass =
    !record.isDuplicate && notColoredColumnNames.indexOf(item) === -1 && record.duplicatedProduct[item] !== record[item]
      ? styles.colored
      : '';

  return <p className={duplicateClass}>{record[item]}</p>;
};

export const defaultColumns = ['productName', 'productId', 'm1', 'm2', 'm3', 'm4', 'm5'];
export const columnNames: any = {
  productName: 'Product Name',
  productId: 'Product ID',
  productUrl: 'Product URL',
  m1: 'M1',
  m2: 'M2',
  m3: 'M3',
  m4: 'M4',
  m5: 'M5',
  m6: 'M6',
  m7: 'M7',
  m8: 'M8',
  m9: 'M9',
  m10: 'M10',
};

export const columnOptions: any = [
  {
    name: 'Product Name',
    id: 'productName',
    disabled: true,
  },
  {
    name: 'Product ID',
    id: 'productId',
    disabled: true,
  },
  {
    name: 'Product URL',
    id: 'productUrl',
  },
  {
    name: 'M1',
    id: 'm1',
  },
  {
    name: 'M2',
    id: 'm2',
  },
  {
    name: 'M3',
    id: 'm3',
  },
  {
    name: 'M4',
    id: 'm4',
  },
  {
    name: 'M5',
    id: 'm5',
  },
  {
    name: 'M6',
    id: 'm6',
  },
  {
    name: 'M7',
    id: 'm7',
  },
  {
    name: 'M8',
    id: 'm8',
  },
  {
    name: 'M9',
    id: 'm9',
  },
  {
    name: 'M10',
    id: 'm10',
  },
];

export const getColumns = (sorting: any, selectedColumns: any, onColumnChange: any) => {
  const actionsTitle = (
    <>
      {' '}
      <TableColumnsFilter onChange={onColumnChange} defaultColumns={defaultColumns} columnOptions={columnOptions} />
    </>
  );

  const columns: ColumnConfig[] = selectedColumns.map((item: string) => {
    const sortingKey: any = item;
    return {
      title: columnNames[item],
      key: item,
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: (record: any) => (item !== 'productName' ? productRender(record, item) : productNameRender(record)),
      sortOrder: sortOrder(sorting, sortingKey),
      sorter: true,
      width: 120,
    };
  });

  columns.push({
    title: actionsTitle,
    key: 'actions',
    render: (record: any) => <span>{record.name}</span>,
    width: 120,
  });

  return columns;
};

export const getUniqueProductIds = (selectedRowKeyVal: any) => {
  const products: any = [];

  selectedRowKeyVal
    .filter((item: any) => item.isDuplicate)
    .forEach((item: any) => {
      const isDuplicate =
        products.filter((duplicate: any) => duplicate.originalProductId === item.originalProduct.productId).length > 0;
      if (!isDuplicate) {
        products.push({
          originalProductId: item.originalProduct.productId,
          duplicatedProductId: item.duplicatedProduct.productId,
        });
      }
    });

  return products;
};

export const getUniqueProductNames = (selectedRowKeyVal: any) => {
  const products: any = [];

  selectedRowKeyVal
    .filter((item: any) => item.isDuplicate)
    .forEach((item: any) => {
      const isDuplicate =
        products.filter((duplicate: any) => duplicate.originalProductId === item.originalProduct.productId).length > 0;
      if (!isDuplicate) {
        products.push({
          originalProductId: item.originalProduct.productId,
          duplicatedProductId: item.duplicatedProduct.productId,
          productName: item.originalProduct.productName,
        });
      }
    });

  return products.map((item: any) => item.productName).join(', ');
};
