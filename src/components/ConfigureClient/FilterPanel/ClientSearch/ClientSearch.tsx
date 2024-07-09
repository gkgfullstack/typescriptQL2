import React, { useEffect, useState, SyntheticEvent } from 'react';
import { Input } from 'antd';
import styles from './ClientSearch.module.less';

const DEFAULT_PLACEHOLDER = 'Enter Client Name to refine your results';

type ClientSearchProps = {
    placeholder?: string;
    defaultValue?: string;
    value?: string;
    loading?: boolean;
    search?:any;
    onChangeSearch: (
        value: string,
        event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>
    ) => void;
};

const ClientSearch: React.FC<ClientSearchProps> = ({
                                                 placeholder = DEFAULT_PLACEHOLDER,
                                                 defaultValue = '',
                                                 value = '',
                                                 loading = false,
                                                 onChangeSearch
                                             }: ClientSearchProps) => {
    const [currValue, setValue] = useState(value);

    useEffect(() => {
        setValue(value);
    }, [value]);

    const handlerSearchEvent = (e: SyntheticEvent<HTMLInputElement>): void => {
        const value = e.currentTarget.value;
        setValue(value);
    };

    return (
        <Input.Search
            className={styles.search_bar_input}
            defaultValue={defaultValue}
            loading={loading}
            value={currValue}
            placeholder={placeholder}
            onSearch={onChangeSearch}
            onChange={handlerSearchEvent}
            allowClear
        />
    );
};

export default ClientSearch;
