import React, { ReactElement, SyntheticEvent, useState } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Col, Row, Input, Button } from 'antd';
import styles from './CreateMatchCategoryForm.module.less';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';
import { useGetMWSSchemas } from 'src/api/MWSSchemasFilter';
import SiteFilter from 'src/components/common/SiteFilter';

const { Option } = Select;

type CreateMatchCategoryFormProps = FormComponentProps & {
  onSave: (values: any) => void;
};

type FormConfig = {
  [field: string]: GetFieldDecoratorOptions;
};

const formConfig: FormConfig = {
  Name: { rules: [{ required: true, message: 'Match Category Name is required!' }], validateTrigger: 'onBlur' },
  Vertical: { rules: [{ required: true, message: 'Vertical is required!' }], validateTrigger: 'onBlur' },
};

export const CreateMatchCategoryForm: React.FC<CreateMatchCategoryFormProps> = ({
  form,
  onSave,
}: CreateMatchCategoryFormProps) => {
  const [selectedSchema, setSelectedSchema] = useState('');
  const [ownerIds, setOwnerIds] = useState<any>([]);
  const { getFieldDecorator, getFieldsValue } = form;
  const [schemasOptions] = useGetMWSSchemas();

  const disableSubmit = () => {
    return (
      !getFieldsValue().name ||
      getFieldsValue().name === '' ||
      !getFieldsValue().vertical ||
      getFieldsValue().vertical === ''
    );
  };

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((err, values: any) => {
      if (!err) {
        const newMatchCategory: any = {
          ...values,
          ownerIds: ownerIds,
        };
        onSave(newMatchCategory);
      }
    });
    return false;
  };

  const onDataSourceChange = (value: SelectValue) => {
    const schema: string = value ? value.toString() : '';
    form.setFieldsValue({ vertical: value });
    setSelectedSchema(schema);
  };

  const onOwnerChange = (name: string, value: string) => {
    if (name === 'site') {
      const ownerIds = value.length > 0 ? value.split(',') : [];
      setOwnerIds(ownerIds);
    }
  };

  const onSearchFilter = (input: string, option: ReactElement) => {
    const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
    return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <div className={styles.create_match_category_form_wrapper}>
      <h1 className={styles.create_match_category_title}>Create New Match Category</h1>
      <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
        <div>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Match Category Name:">
                {getFieldDecorator(
                  'name',
                  formConfig.Name
                )(<Input type="text" placeholder="Please enter Match Category Name" />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Vertical:">
                {getFieldDecorator(
                  'vertical',
                  formConfig.Vertical
                )(
                  <Select
                    placeholder="Select Vertical"
                    onChange={onDataSourceChange}
                    allowClear
                    showSearch
                    filterOption={onSearchFilter}
                  >
                    {schemasOptions.map(
                      (option: any, i: number): React.ReactNode => {
                        return (
                          <Option value={option.name} key={`match-vertical-${option.name}-${i}`}>
                            {option.name}
                          </Option>
                        );
                      }
                    )}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Site Mapping:">
                <SiteFilter setParams={onOwnerChange} schema={selectedSchema} multiple={true} />
              </Form.Item>
            </Col>
            <Col span={24} style={{ marginTop: '30px' }}>
              <Col span={24}>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  disabled={disableSubmit()}
                  className={styles.save_button}
                >
                  Create Match Category
                </Button>
              </Col>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

const WrappedCreateMatchCategoryForm = Form.create<CreateMatchCategoryFormProps>({ name: 'name' })(
  CreateMatchCategoryForm
);
export default WrappedCreateMatchCategoryForm;
