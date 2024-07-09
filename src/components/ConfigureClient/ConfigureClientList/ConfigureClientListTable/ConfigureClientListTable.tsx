import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { SorterResult, PaginationConfig } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import ConfigureClientTableInfo from 'src/types/ConfigureClientTableInfo';
import styles from './ConfigureClientListTable.module.less';
import { getColumns } from '../services/ConfigureClientListTable.service';
import Spin from "src/components/common/Spin";

export type ConfigureClientListTableProps = {
    items: ConfigureClientTableInfo[];
    sorting: Sorting<ConfigureClientTableInfo>;
    onSortingChange: (sorting: Sorting<ConfigureClientTableInfo>) => void;
    onPageSizeChange: (size: number) => void;
    onPageChange: (page: number) => void;
    onChangeStatus: (record: any) => void;
    pageSize: number;
    total: number;
    loading?: boolean;
    page?: number;
};

const ConfigureClientListTable: React.FC<ConfigureClientListTableProps> = ({
                                                                   items,
                                                                   sorting,
                                                                   pageSize,
                                                                   total,
                                                                   loading,
                                                                   page,
                                                                   onSortingChange,
                                                                   onPageChange,
                                                                   onPageSizeChange,
                                                                   onChangeStatus
                                                               }: ConfigureClientListTableProps): React.ReactElement => {
    const locale = { items_per_page: '' };
    const [columns, setColumns] = useState<any[]>([]);
    const totalRender = (): React.ReactNode => <span>Total Results: {total}</span>;
    const emptyText: React.ReactNode = <p className={styles.no_results}>No results found</p>;

    useEffect(() => {
        if (sorting) {
            setColumns(getColumns(sorting, onChangeStatus));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sorting]);

    const handlePageSizeChanges = (_: number, size: number): void => {
        onPageSizeChange(size);
    };

    const handlerSortingColumn = (
        _: PaginationConfig,
        __: Partial<Record<keyof ConfigureClientTableInfo, string[]>>,
        sorter: SorterResult<ConfigureClientTableInfo>
    ): void => {
        const order =
            sorting.field === sorter.columnKey && sorter.order === undefined
                ? sorting.order === 'ascend'
                ? 'descend'
                : 'ascend'
                : sorter.order;

        onSortingChange({ field: sorter.columnKey, order: order });
    };

    const handlerPageChange = (page: number): void => {
        onPageChange(page);
    };

    const pagination: PaginationConfig = {
        pageSize: pageSize,
        current: page,
        showTotal: totalRender,
        total: total,
        hideOnSinglePage: false,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
        locale: locale,
        onShowSizeChange: handlePageSizeChanges,
        onChange: handlerPageChange,
    };

    return (
        <div className={styles.client_list_table_wrapper}>
            <Spin spinning={loading}>
                <Table
                    rowClassName={(): string => styles.client_list_table_row}
                    className={styles.client_list_table}
                    rowKey={(_, index: number): string => index.toString()}
                    columns={columns}
                    pagination={pagination}
                    dataSource={items}
                    onChange={handlerSortingColumn}
                    tableLayout={'auto'}
                    locale={{ emptyText: emptyText }}
                />
            </Spin>
        </div>
    );
};

export default ConfigureClientListTable;
