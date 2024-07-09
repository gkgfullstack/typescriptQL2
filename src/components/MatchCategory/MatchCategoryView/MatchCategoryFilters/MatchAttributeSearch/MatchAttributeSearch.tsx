import React, { useEffect, useState, SyntheticEvent } from 'react';
import { Input } from 'antd';
import styles from './MatchAttributeSearch.module.less';

const DEFAULT_PLACEHOLDER = 'Enter Match Attribute Name to refine your results';

type MatchAttributeSearchProps = {
    placeholder?: string;
    defaultValue?: string;
    value?: string;
    loading?: boolean;
    onChangeSearch: (
        value: string,
        event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>
    ) => void;
};

const MatchAttributeSearch: React.FC<MatchAttributeSearchProps> = ({
                                                                     placeholder = DEFAULT_PLACEHOLDER,
                                                                     defaultValue = '',
                                                                     value = '',
                                                                     loading = false,
                                                                     onChangeSearch,
                                                                 }: MatchAttributeSearchProps) => {
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

export default MatchAttributeSearch;
