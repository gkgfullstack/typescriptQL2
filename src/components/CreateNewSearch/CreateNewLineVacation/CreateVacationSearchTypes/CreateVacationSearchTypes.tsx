import React from 'react';
import { Col, Divider, Form, Select } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { SearchTypeTooltip } from 'src/components/CreateNewSearch/CreateNewLineVacation/CreateVacationTooltip/CreateVacationTooltip';

type CreateVacationSearchTypesProps = {
  getFieldDecorator<T extends Record<string | number | symbol, string>>(
    id: keyof T,
    options?: GetFieldDecoratorOptions
  ): (node: React.ReactNode) => React.ReactNode;
  onSearchTypeChange: (value: SelectValue) => void;
};

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 15 },
};

const { Option } = Select;

const searchTypeOptions = [
  {
    name: 'FH',
  },
  {
    name: 'FHC',
  },
  {
    name: 'HC',
  },
  {
    name: 'FSH',
  },
];

const CreateVacationSearchTypes: React.FC<CreateVacationSearchTypesProps> = ({
  getFieldDecorator,
  onSearchTypeChange,
}) => {
  const config = {
    initialValue: 'FH',
  };

  return (
    <>
      <Col span={24}>
        <Form.Item {...layout} label={<h6>Search Type <SearchTypeTooltip /></h6>}>
          {getFieldDecorator(
            'searchType',
            config
          )(
            <Select placeholder="Select Search Type" onChange={onSearchTypeChange}>
              {searchTypeOptions &&
                searchTypeOptions.map(
                  (type: { name: string }): React.ReactNode => {
                    return (
                      <Option key={type.name} value={type.name}>
                        {type.name}
                      </Option>
                    );
                  }
                )}
            </Select>
          )}
        </Form.Item>
      </Col>
      <Divider className="dividerCustom" />
    </>
  );
};

export default CreateVacationSearchTypes;
