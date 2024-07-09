import React from 'react';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import FormFieldWrapper from 'src/components/CreateNewSearch/FormFieldWrapper';
import { searchByKeywordOptions } from './CreateSearchByKeyword.config';
import { Row } from 'antd';

type CreateSearchByKeywordProps = {
  getFieldDecorator<T extends Record<string | number | symbol, string>>(
    id: keyof T,
    options?: GetFieldDecoratorOptions
  ): (node: React.ReactNode) => React.ReactNode;
};

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

const CreateSearchByKeyword: React.FC<CreateSearchByKeywordProps> = ({ getFieldDecorator }) => {
  return (
    <Row>
      {searchByKeywordOptions.length &&
        searchByKeywordOptions.map(option => {
          return (
            <FormFieldWrapper
              key={`input-value-keyword-option-${option.name}`}
              label={option.label}
              isDivider={false}
              layout={layout}
              content={getFieldDecorator(option.name, {})(option.content)}
            />
          );
        })}
    </Row>
  );
};

export default CreateSearchByKeyword;
