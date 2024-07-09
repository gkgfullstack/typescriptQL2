import React, { ChangeEvent, useEffect, useState } from 'react';
import { Divider, Radio } from 'antd';
import styles from '../CreateAutopartRegion/CreateAutopartRegion.module.less';
import { RadioChangeEvent } from 'antd/lib/radio';
import CreateAutopartCategory from '../CreateAutopartInputValues/CreateSearchByCategory/CreateAutopartCategory/CreateAutopartCategory';
import SearchByCategoryName from '../CreateAutopartInputValues/CreateSearchByCategory/SearchByCategoryName';
import TextArea from 'antd/lib/input/TextArea';

type CreateAutopartCategoriesProps = {
  vertical: string;
  searchType: string;
  site: string;
  category: any;
  setCategory: any;
};

const isAutopartCategoriesVisible = (type: string | undefined): boolean => {
  if (type) {
    return (
      type === 'shallow' ||
      type === 'spider' ||
      type === 'fitment spider' ||
      type === 'product pull' ||
      type === 'category crawl' ||
      type === 'price update'
    );
  }
  return false;
};

const getSubTitle = (type: string | undefined): string => {
  if (type && (type === 'spider' || type === 'fitment spider')) {
    return 'Spider';
  }
  return 'Run';
};

const CreateAutopartCategories: React.FC<CreateAutopartCategoriesProps> = ({
  vertical,
  searchType,
  site,
  category,
  setCategory,
}: CreateAutopartCategoriesProps) => {
  const [checkboxSelection, setCheckboxSelection] = useState(1);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

  useEffect(() => {
    setCheckedKeys([]);
  }, [searchType]);

  const onChangeTab = (event: RadioChangeEvent) => {
    setCheckboxSelection(event.target.value);
    setCategory('');
    setCheckedKeys([]);
  };

  const isCategoryBySearchVisible = (type?: string) => {
    return type === 'spider' || type === 'fitment spider';
  };

  return isAutopartCategoriesVisible(searchType) ? (
    <>
      <div className={'ant-row ant-form-item'}>
        <div className="ant-col ant-col-9 ant-form-item-label">
          <label>
            <h6>
              Categories
              <span>One per Line</span>
            </h6>
          </label>
        </div>
        <div className={`ant-col ant-col-15 ant-form-item-control-wrapper ${styles.region_wrapper}`}>
          <Radio.Group onChange={onChangeTab} value={checkboxSelection}>
            <Radio value={1}>{getSubTitle(searchType)} All Categories</Radio>
            <Radio value={2}>{getSubTitle(searchType)} Specific Categories</Radio>
            {isCategoryBySearchVisible(searchType) && <Radio value={3}>Search by Category Name</Radio>}
          </Radio.Group>
          {checkboxSelection === 2 && (
            <CreateAutopartCategory
              site={site}
              setCategory={setCategory}
              category={category}
              checkedKeys={checkedKeys}
              setCheckedKeys={setCheckedKeys}
              searchType={searchType}
            />
          )}
          {checkboxSelection === 3 && (
            <>
              <SearchByCategoryName
                site={site}
                vertical={vertical}
                setCategory={setCategory}
                checkedKeys={checkedKeys}
                setCheckedKeys={setCheckedKeys}
              />
              <TextArea
                rows={2}
                value={category}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setCategory(event.target.value)}
                placeholder={'Please enter Category Path'}
                style={{ margin: '10px 0 15px' }}
              />
            </>
          )}
        </div>
      </div>
      <Divider className="dividerCustom" />
    </>
  ) : null;
};

export default CreateAutopartCategories;
