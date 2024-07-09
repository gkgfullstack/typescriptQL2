import React, { useEffect, useState } from 'react';
import { useSearchAutopartsCategory } from 'src/api/createNewSearch/autoPartsCategory';
import Spin from 'src/components/common/Spin';
import styles from './SearchByCategoryName.module.less';
import { Checkbox, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

type SearchByCategoryNameProps = {
  site: string;
  vertical: string;
  checkedKeys: any;
  setCategory: any;
  setCheckedKeys: any;
};

const { Search } = Input;

const SearchByCategoryName: React.FC<SearchByCategoryNameProps> = ({
  site,
  vertical,
  checkedKeys,
  setCheckedKeys,
  setCategory,
}: SearchByCategoryNameProps) => {
  const [search, setSearch] = useState('');
  const [loading, categoriesData]: any = useSearchAutopartsCategory(site, vertical, search);

  useEffect(() => {
    if (categoriesData.length > 0) {
      const checkboxList: any = [];
      const checkedKeys: any = [];
      categoriesData.forEach((item: any) => {
        checkboxList.push(false);
        checkedKeys.push(`${item.name}: ${item.categoryPath}`);
      });
      setCheckedKeys(checkboxList);
    }
  }, [categoriesData]);

  const onCheckCategoryChange = (i: number) => {
    return (event: CheckboxChangeEvent) => {
      const checkboxList: any = [...checkedKeys];
      const checked: any = [];
      checkboxList[i] = event.target.checked;
      categoriesData.forEach((item: any, index: number) => {
        if (checkboxList[index]) {
          checked.push(`${item.name}: ${item.categoryPath}`);
        }
      });
      setCheckedKeys(checkboxList);
      setCategory(checked.join('; '));
    };
  };

  return (
    <div className={styles.category_by_search_wrapper}>
      {!site && <p className={styles.category_by_name_text_error}>Please select Site before search Categories</p>}
      {site && (
        <Search
          placeholder="Please enter Category Name"
          allowClear
          enterButton="Search"
          onSearch={(value: string) => setSearch(value)}
          className={styles.category_by_name_search_input}
        />
      )}
      <Spin spinning={loading}>
        {!loading && site && search.length > 1 && categoriesData.length === 0 && (
          <p className={styles.category_by_name_text_no_result}>No Category found</p>
        )}
        {categoriesData.length > 0 && (
          <div className={styles.category_by_name_list}>
            {categoriesData.map((item: any, i: number) => {
              return (
                <p className={styles.category_by_name_list_item} key={`category_name_search_result_${i}`}>
                  <Checkbox
                    checked={checkedKeys[i]}
                    onChange={onCheckCategoryChange(i)}
                    style={{ marginRight: '6px', display: 'inline-block' }}
                  />
                  {item.name}: {item.categoryPath}
                </p>
              );
            })}
          </div>
        )}
      </Spin>
    </div>
  );
};

export default SearchByCategoryName;
