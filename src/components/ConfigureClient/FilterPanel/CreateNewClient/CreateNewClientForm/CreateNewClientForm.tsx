import React, { ReactElement, SyntheticEvent, useState, useEffect } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Col, Row, Input, Button, Select } from 'antd';
import styles from './CreateNewClientForm.module.less';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { SelectValue } from 'antd/lib/select';
import ConfigureClientFilter from 'src/types/ConfigureClientFilter';
import AddIndustry from 'src/components/common/AddIndustry';

const { Option } = Select;

type SaveClientRequest = {
  name: string;
  industry: string;
  mwsSchema: string;
};

type CreateNewClientFormProps = FormComponentProps & {
  onSave: (values: SaveClientRequest) => void;
  schemas: ConfigureClientFilter[];
  industries: ConfigureClientFilter[];
};

type FormFields = {
  [field: string]: any;
};

type FormConfig = {
  [field: string]: GetFieldDecoratorOptions;
};

const hasErrors = (fieldsError: Record<string, string[] | undefined>): boolean => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};

const formConfig: FormConfig = {
  name: { rules: [{ required: true, message: 'Client name is required!' }], validateTrigger: 'onBlur' },
  industry: { rules: [{ required: true, message: 'Industry is required!' }], validateTrigger: 'onBlur' },
  mwsSchema: { rules: [{ required: true, message: 'MWS Schema is required!' }], validateTrigger: 'onBlur' },
};

const hasRequiredFields = (fields: FormFields): boolean => {
  return Object.keys(fields).some(
    field =>
      fields[field] === undefined &&
      formConfig[field] !== undefined &&
      formConfig[field].rules !== undefined &&
      formConfig[field].rules!.some(rule => rule.required !== undefined && rule.required)
  );
};

export const CreateNewClientForm: React.FC<CreateNewClientFormProps> = ({
  form,
  onSave,
  schemas,
  industries,
}: CreateNewClientFormProps) => {
  const [industryList, setIndustryList] = useState<any>([]);
  const { getFieldDecorator, getFieldsError, getFieldsValue, isFieldsTouched } = form;
  const disableSubmit =
    hasErrors(getFieldsError()) || (isFieldsTouched() && hasRequiredFields(getFieldsValue())) || !isFieldsTouched();

  useEffect(() => {
    if (industries && industries.length > 0) {
      setIndustryList(industries);
    }
  }, [industries]);

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((err, values: SaveClientRequest) => {
      if (!err) {
        onSave(values);
        setIndustryList(industries);
      }
    });
    return false;
  };

  const onIndustryChange = (value: SelectValue) => {
    form.setFieldsValue({ industry: value });
    return;
  };

  const onSchemaChange = (value: SelectValue) => {
    form.setFieldsValue({ mwsSchema: value });
    return;
  };

  const onSearchFilter = (input: string, option: ReactElement) => {
    const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
    return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const onAddIndustry = (industryName: string) => {
    const newList = industryList;
    const isNameUnique =
      newList.filter((item: any) => item.name.toLowerCase() === industryName.toLowerCase()).length === 0;
    if (isNameUnique) {
      newList.push({
        name: industryName,
      });
      newList.sort((a: any, b: any) => a.name.localeCompare(b.name));
      setIndustryList(newList);
    }
    form.setFieldsValue({ industry: industryName });
  };

  return (
    <div className={styles.create_new_client_form_wrapper}>
      <h1>Create New Client</h1>
      <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
        <div>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Client Name:">
                {getFieldDecorator(
                  'name',
                  formConfig.ClientName
                )(<Input type="text" placeholder="Please enter Client Name" />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Industry:">
                {getFieldDecorator(
                  'industry',
                  formConfig.Industry
                )(
                  <Select
                    placeholder="Select Industry"
                    onChange={onIndustryChange}
                    allowClear
                    showSearch
                    filterOption={onSearchFilter}
                  >
                    {industryList &&
                      industryList.map(
                        (option: any, i: number): React.ReactNode => {
                          return (
                            <Option value={option.name} key={`industry-${option.name}-${i}`}>
                              {option.name}
                            </Option>
                          );
                        }
                      )}
                  </Select>
                )}
              </Form.Item>
              <AddIndustry onUpdateIndustry={onAddIndustry} />
            </Col>
            <Col span={24}>
              <Form.Item label="MWS Schema:">
                {getFieldDecorator(
                  'mwsSchema',
                  formConfig.Schema
                )(
                  <Select
                    placeholder="Select MWS Schema"
                    onChange={onSchemaChange}
                    allowClear
                    showSearch
                    filterOption={onSearchFilter}
                  >
                    {schemas &&
                      schemas.map(
                        (option: any, i: number): React.ReactNode => {
                          return (
                            <Option value={option.name} key={`schema-${option.name}-${i}`}>
                              {option.name}
                            </Option>
                          );
                        }
                      )}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={24} style={{ marginTop: '80px' }}>
              <Col span={24}>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  disabled={disableSubmit}
                  className={styles.save_new_client}
                  style={{ margin: ' 0px auto', maxWidth: '300px', padding: '10px', height: 'auto' }}
                >
                  Save
                </Button>
              </Col>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

const WrappedCreateNewClientForm = Form.create<CreateNewClientFormProps>({ name: 'name' })(CreateNewClientForm);
export default WrappedCreateNewClientForm;
