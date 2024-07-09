import React from 'react';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { Select } from 'antd';
import FormFieldWrapper from 'src/components/CreateNewSearch/FormFieldWrapper';
import { SelectValue } from 'antd/lib/select';

type CreateAutopartSearchTypeProps = {
  getFieldDecorator<T extends Record<string | number | symbol, string>>(
    id: keyof T,
    options?: GetFieldDecoratorOptions
  ): (node: React.ReactNode) => React.ReactNode;
  setSearchType: (searchType: string) => void;
  appId: string;
};

const { Option } = Select;

const searchTypeOptions = [
  {
    name: 'Keyword/URL',
    id: 'Keyword Url',
  },
  {
    name: 'Shallow',
    id: 'Shallow',
  },
  {
    name: 'Spider',
    id: 'Spider',
  },
  {
    name: 'Fitment Spider',
    id: 'Fitment Spider',
  },
  
  {
    name: 'Bookmark',
    id: 'keyword_url,price_update',
    
  },
  {
    name: 'Category Crawl',
    id: 'Category Crawl',
  },
  {
    name: 'Product Pull',
    id: 'Keyword url',
  },
  
];

const CreateAutopartSearchType: React.FC<CreateAutopartSearchTypeProps> = ({
  getFieldDecorator,
  setSearchType,
  appId,
}: CreateAutopartSearchTypeProps) => {
  const onSearchTypeChange = (value: SelectValue) => {
    const searchType: string = value ? value.toString().toLocaleLowerCase() : '';
    setSearchType(searchType);
  };

  return (
    <FormFieldWrapper
      label={<h6>Search Type</h6>}
      content={getFieldDecorator('searchType', {
        initialValue: 'keyword_url',
      })(
        <Select
          showArrow
          className="siteCodeSelect"
          placeholder={'Please enter Search Type'}
          onChange={onSearchTypeChange}
          allowClear
        >
          {searchTypeOptions &&
            searchTypeOptions
              .filter(option => (option.name === 'Fitment Spider' ? appId === '163' : true))
              .map(searchTypeOption => {
                return (
                  <Option key={searchTypeOption.id} value={searchTypeOption.id}>
                    {searchTypeOption.name}
                  </Option>
                );
              })}
        </Select>
      )}
    />
  );
};

export default CreateAutopartSearchType;
