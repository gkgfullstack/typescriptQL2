import React, { useState } from 'react';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import FormFieldWrapper from 'src/components/CreateNewSearch/FormFieldWrapper';
import { Col, Form, Radio, Row } from 'antd';
import categoryOptions from 'src/components/CreateNewSearch/CreateNewLineAutopart/CreateAutopartInputValues/CreateSearchByCategory/CreateSearchByCategory.config';
import CreateAutopartCategory from 'src/components/CreateNewSearch/CreateNewLineAutopart/CreateAutopartInputValues/CreateSearchByCategory/CreateAutopartCategory';
import SearchByCategoryName from 'src/components/CreateNewSearch/CreateNewLineAutopart/CreateAutopartInputValues/CreateSearchByCategory/SearchByCategoryName';
import { RadioChangeEvent } from 'antd/lib/radio';

type CreateSearchByCategoryProps = {
  getFieldDecorator<T extends Record<string | number | symbol, string>>(
    id: keyof T,
    options?: GetFieldDecoratorOptions
  ): (node: React.ReactNode) => React.ReactNode;
  site: string;
  setCategory: (category: string) => void;
  category: string;
  vertical: string;
  checkedKeys: any;
  setCheckedKeys: any;
  setFieldsResult: any;
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const CreateSearchByCategory: React.FC<CreateSearchByCategoryProps> = ({
  getFieldDecorator,
  site,
  setCategory,
  category,
  vertical,
  checkedKeys,
  setCheckedKeys,
  setFieldsResult,
}: CreateSearchByCategoryProps) => {
  const [checkboxSelection, setCheckboxSelection] = useState(1);

  const onChangeTab = (event: RadioChangeEvent) => {
    setCheckboxSelection(event.target.value);
    setFieldsResult('');
    setCategory('');
  };

  return (
    <Row>
      <Radio.Group onChange={onChangeTab} value={checkboxSelection}>
        <Radio value={1}>Search by Category Name</Radio>
        <Radio value={2}>Search by Category Tree</Radio>
      </Radio.Group>
      <Col span={24}>
        <Form.Item {...layout} label={'Category Path'}>
          {checkboxSelection === 1 && (
            <SearchByCategoryName
              site={site}
              vertical={vertical}
              setCategory={setCategory}
              checkedKeys={checkedKeys}
              setCheckedKeys={setCheckedKeys}
            />
          )}
          {checkboxSelection === 2 && (
            <CreateAutopartCategory
              site={site}
              setCategory={setCategory}
              category={category}
              checkedKeys={checkedKeys}
              setCheckedKeys={setCheckedKeys}
            />
          )}
        </Form.Item>
      </Col>
      {categoryOptions.map(({ label, name, content }) => (
        <FormFieldWrapper
          key={`advanced-option-${name}`}
          label={label}
          content={name === 'category' ? content : getFieldDecorator(name, {})(content)}
          isDivider={false}
          layout={layout}
        />
      ))}
    </Row>
  );
};

export default CreateSearchByCategory;
