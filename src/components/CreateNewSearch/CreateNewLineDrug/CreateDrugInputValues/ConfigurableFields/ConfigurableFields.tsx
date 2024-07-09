import React from 'react';
import { Row, Col, Form, Input, Select, DatePicker } from 'antd';
import { SearchTooltipWrapper } from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';
import { SelectValue } from 'antd/lib/select';

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 15 },
};
const { Option } = Select;

type ConfigurableFieldsProps = {
  fields: any;
  setInputValues: any;
  dateFormat: any;
};

const transformFieldValues = (fields: any, name: string, value: any) => {
  return [...fields].map(field => {
    if (field.name === name) {
      field.value = value;
    }
    return field;
  });
};

const ConfigurableFields: React.FC<ConfigurableFieldsProps> = ({
  fields,
  setInputValues,
  dateFormat,
}: ConfigurableFieldsProps) => {
  const onInputChange = (name: string) => {
    return (event: any) => {
      setInputValues(transformFieldValues(fields, name, event.target.value));
    };
  };

  const onSelectChange = (name: string, value: SelectValue) => {
    setInputValues(transformFieldValues(fields, name, value));
  };

  const onDateChange = (name: string, date: any) => {
    setInputValues(transformFieldValues(fields, name, date));
  };

  return (
    <Col>
      <Row>
        {fields.map(({ value, label, name, hint, fieldType, values, maxLength }: any) => (
          <Col span={24} key={`configurable_fields_${name}`}>
            <Form.Item
              {...layout}
              label={
                <h6>
                  {label}
                  {hint && <SearchTooltipWrapper content={hint} />}
                </h6>
              }
            >
              {fieldType === 'StringField' && (
                <Input
                  type="text"
                  placeholder={`Please enter ${label}`}
                  maxLength={maxLength ? maxLength : undefined}
                  onChange={onInputChange(name)}
                  value={value}
                />
              )}
              {fieldType === 'DateField' && (
                <DatePicker
                  placeholder={`Select ${label}`}
                  showToday={false}
                  format={dateFormat}
                  value={value}
                  onChange={(date: any) => onDateChange(name, date)}
                />
              )}
              {fieldType === 'dropdown' && (
                <Select
                  showArrow
                  placeholder={`Select ${label}`}
                  allowClear
                  onChange={(value: SelectValue) => {
                    onSelectChange(name, value);
                  }}
                  value={value}
                >
                  {values &&
                    values.map(
                      (option: any, i: number): React.ReactNode => {
                        return (
                          <Option key={`configurable_dropdown_${name}_${i}`} value={option}>
                            {option}
                          </Option>
                        );
                      }
                    )}
                </Select>
              )}
            </Form.Item>
          </Col>
        ))}
      </Row>
    </Col>
  );
};

export default ConfigurableFields;
