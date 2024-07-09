import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './ComponentShowcase.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Checkbox,
  Radio,
  Input,
  List,
  Popover,
  Switch,
  Breadcrumb,
  Tabs,
  Popconfirm,
  notification,
  Table,
} from 'antd';
import Select from 'src/components/common/Select';
import Modal from 'src/components/common/Modal';
import { ColumnProps, PaginationConfig, SorterResult, SortOrder } from 'antd/lib/table';

import { SelectValue } from 'antd/lib/select';
import DropDownMenu from 'src/components/common/DropDownMenu';

const { TabPane } = Tabs;
const { Option, OptGroup } = Select;

export type AppProps = {
  className?: string;
};

function handleChange(value: SelectValue): void {
  console.log(`selected ${value}`);
}
const notificationTypes = [
  { title: 'success', onClick: notification.success },
  { title: 'error', onClick: notification.error },
  { title: 'info', onClick: notification.info },
  { title: 'warn', onClick: notification.warn },
  { title: 'open', onClick: notification.open },
];
const notificationArgs = {
  message: 'Notification Title',
  description: 'Some notification description',
};

export interface TableSortingInfo<T> {
  columnKey: SorterResult<T>['columnKey'];
  order: SorterResult<T>['order'];
}

type ProductsMatchItem = {
  key: number;
  site: string;
  imgUrl: string;
  manufacture: string;
  type: string;
  price: number;
};

interface ColumnConfig extends ColumnProps<ProductsMatchItem> {
  customColRenderer?: (record: ProductsMatchItem, index: number) => React.ReactNode;
}

const sortOrder = (
  sortedInfo: TableSortingInfo<ProductsMatchItem> | null,
  key: keyof ProductsMatchItem
): SortOrder | boolean => {
  return sortedInfo && sortedInfo.columnKey === key ? sortedInfo.order : false;
};

const defaultSorting: TableSortingInfo<ProductsMatchItem> = { columnKey: 'price', order: 'ascend' };

const tableData: ProductsMatchItem[] = [];
for (let i = 0; i < 100; i++) {
  tableData.push({
    key: i,
    site: i % 2 === 0 ? `Amazone ${i}` : `Boscores ${i}`,
    imgUrl:
      'https://product-images.weber.com/1321004AB_1800x1800.png?auto=compress,format&fit=fill&h=950&w=1000&trim=color&trimtol=10&bg=0FFF&pad=50',
    manufacture: i % 2 === 0 ? 'CuisinArt' : 'Chefman',
    type: i % 2 === 0 ? 'Exact match' : 'Like match',
    price: i % 2 === 0 ? Number(`${i * 2}.99`) : Number(`${i}.99`),
  });
}
const imageRender = (record: ProductsMatchItem): React.ReactNode => <img src={record.imgUrl} width={'50px'} alt={''} />;
const priceRender = (record: ProductsMatchItem): React.ReactNode => <span>{`$${record.price}`}</span>;
const actionRender = (): React.ReactNode => (
  <Popconfirm
    title="Are you sure you want to remove this match?"
    okText="No, keep it for now"
    cancelText="Yes, I am sure"
    placement="right"
    icon={null}
  >
    <FontAwesomeIcon icon={['fal', 'minus-circle']} size={'sm'} />
  </Popconfirm>
);
const totalRender = (total: number): React.ReactNode => <span>Total Results: {total}</span>;

const ComponentShowcase: React.FC<AppProps> = ({ className }: AppProps) => {
  const [activeTabKey, setActiveTabKey] = useState('1');
  const [visible, setVisible] = useState(false);
  const [sorting, setSorting] = useState(defaultSorting);
  const [pageSize, setPageSize] = useState(20);
  const handlePageSizeChanges = (_: number, size: number): void => {
    setPageSize(size);
  };
  const handleTableChanges = (
    _: PaginationConfig,
    __: Partial<Record<keyof ProductsMatchItem, string[]>>,
    sorter: SorterResult<ProductsMatchItem>
  ): void => {
    setSorting({
      columnKey: sorter.columnKey,
      order: sorter.order,
    });
  };

  const columns: ColumnConfig[] = [
    {
      title: 'Site',
      dataIndex: 'site',
      sortOrder: sortOrder(sorting, 'site'),
      sorter: (a: ProductsMatchItem, b: ProductsMatchItem): number => a.site.length - b.site.length,
      sortDirections: ['descend', 'ascend'],
      width: 150,
    },
    {
      title: '',
      dataIndex: 'imgUrl',
      width: 150,
      customColRenderer: imageRender,
    },
    {
      title: 'Manufacture',
      dataIndex: 'manufacture',
      sortOrder: sortOrder(sorting, 'manufacture'),
      sorter: (a: ProductsMatchItem, b: ProductsMatchItem): number => a.manufacture.length - b.manufacture.length,
      sortDirections: ['descend', 'ascend'],
      width: 150,
    },
    {
      title: 'Match Type',
      dataIndex: 'type',
      sortOrder: sortOrder(sorting, 'type'),
      sorter: (a: ProductsMatchItem, b: ProductsMatchItem): number => a.type.length - b.type.length,
      sortDirections: ['descend', 'ascend'],
      width: 150,
    },
    {
      align: 'right',
      title: 'Price',
      dataIndex: 'price',
      sortOrder: sorting.columnKey === 'price' && sorting.order,
      sorter: (a: ProductsMatchItem, b: ProductsMatchItem): number => a.price - b.price,
      sortDirections: ['descend', 'ascend'],
      customColRenderer: priceRender,
    },
    {
      title: '',
      dataIndex: '',
      customColRenderer: actionRender,
    },
  ];
  columns.map(column => {
    if (column.customColRenderer) {
      const renderer = column.customColRenderer;
      column.render = (_: string | number, record: ProductsMatchItem, index: number): React.ReactNode => {
        return renderer(record, index);
      };
    }

    return column;
  });
  /*eslint @typescript-eslint/camelcase: ["error", {properties: "never"}]*/
  const locale = { items_per_page: '' };
  const pagination: PaginationConfig = {
    pageSize: pageSize,
    showTotal: totalRender,
    hideOnSinglePage: true,
    showSizeChanger: true,
    pageSizeOptions: ['20', '50'],
    locale: locale,
    onShowSizeChange: handlePageSizeChanges,
  };
  const data = ['Title 1', 'Title 2'];
  const popoverContent = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
  const exclamationPopoverContent = (
    <div className={styles.exclamation}>
      <FontAwesomeIcon icon={['fas', 'exclamation-triangle']} size={'sm'} className={styles.exclamation_icon} />
      Price 25% Higher than Lowest Compretitor
    </div>
  );
  const appClassName = clsx(className, styles.page);

  return (
    <div className={appClassName}>
      <h1>Header 1</h1>
      <h2>Header 2</h2>
      <h3>Header 3</h3>
      <h4>Header 4</h4>
      <br />
      <h4>Paragraph with simple link</h4>
      <p>
        Somthing text here <a href="http://google.com">Link on smth</a>
      </p>
      <h4>List component:</h4>
      <List dataSource={data} renderItem={(item): React.ReactNode => <List.Item>{item}</List.Item>} />
      <h4>Clickable component:</h4>
      <Popover content={popoverContent} trigger={'click'} placement={'top'}>
        <span>Clickable item with popover</span>
      </Popover>
      <Popover content={exclamationPopoverContent} trigger={'hover'}>
        <FontAwesomeIcon icon={['fas', 'exclamation-triangle']} className={styles.exclamation_icon} />
      </Popover>
      <h4>Breadcrumbs:</h4>
      <Breadcrumb separator=">">
        <Breadcrumb.Item href="">Home Decor</Breadcrumb.Item>
        <Breadcrumb.Item href="">Throw Pillow</Breadcrumb.Item>
      </Breadcrumb>
      <h4>Tabs:</h4>
      <Tabs activeKey={activeTabKey} tabPosition="top" onChange={setActiveTabKey}>
        <TabPane tab="Distribution" key="1">
          Distribution
        </TabPane>
        <TabPane tab="Variance" key="2">
          Variance
        </TabPane>
        <TabPane tab="Custom" key="3">
          Variance
        </TabPane>
      </Tabs>
      <h4>FontAwesome icons:</h4>
      <FontAwesomeIcon icon={['far', 'chevron-right']} size={'lg'} />
      <FontAwesomeIcon icon={['fal', 'question-circle']} size={'lg'} />
      <FontAwesomeIcon icon={['fal', 'history']} size={'lg'} />
      <FontAwesomeIcon icon={['fal', 'caret-down']} size={'lg'} />
      <h4>Form components:</h4>
      <Button type="primary">Button</Button>
      <Button>Default</Button>
      <Button type="primary" disabled>
        Default dis
      </Button>
      <Button disabled>Default</Button>
      <Button type="primary" size={'large'}>
        Button
      </Button>
      <Button type="primary" size={'small'}>
        Button
      </Button>
      <Button type="link">Link</Button>
      <Checkbox>Label</Checkbox>
      <Radio>Label</Radio>
      <Switch size={'small'} />
      <Input style={{ width: 120 }} />
      <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
        <OptGroup label="Manager">
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
        </OptGroup>
        <OptGroup label="Engineer">
          <Option value="Yiminghe">yiminghe</Option>
        </OptGroup>
      </Select>
      <h4>Confirmation popup</h4>
      <Popconfirm
        title="Are you sure you want to remove this match?"
        okText="No, keep it for now"
        cancelText="Yes, I am sure"
        placement="right"
        icon={null}
      >
        <FontAwesomeIcon icon={['fal', 'minus-circle']} size={'sm'} />
      </Popconfirm>
      <h4>Notifications:</h4>
      {notificationTypes.map(({ title, onClick }) => (
        <Button
          key={title}
          onClick={(): void => {
            onClick(notificationArgs);
          }}
        >
          {title}
        </Button>
      ))}
      <h4>Modal:</h4>
      <Button
        type="primary"
        onClick={(): void => {
          setVisible(true);
        }}
      >
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        visible={visible}
        onCancel={(): void => {
          setVisible(false);
        }}
        okText="Add"
        onOk={(): void => {
          setVisible(false);
        }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <h4>DropDownMenu:</h4>
      <DropDownMenu
        placement="bottomLeft"
        listData={[
          {
            icon: <FontAwesomeIcon icon={['far', 'print']} size="sm" />,
            label: 'Print',
            onClick: (): void => window.print(),
          },
          {
            icon: <FontAwesomeIcon icon={['fal', 'file-export']} size="sm" />,
            label: 'Export PDF',
            onClick: (): void => window.print(),
          },
          {
            icon: <FontAwesomeIcon icon={['fal', 'file-export']} size="sm" />,
            label: 'Export XLS',
            onClick: (): void => window.print(),
          },
        ]}
      />
      <h4>Table:</h4>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={pagination}
        scroll={{ y: 240 }}
        onChange={handleTableChanges}
      />
    </div>
  );
};

export default ComponentShowcase;
