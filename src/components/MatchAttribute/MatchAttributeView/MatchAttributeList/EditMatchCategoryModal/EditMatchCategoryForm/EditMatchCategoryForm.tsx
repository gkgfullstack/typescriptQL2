import React, { SyntheticEvent, useEffect, useState } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Col, Row, Input, Button } from 'antd';
import styles from './EditMatchCategoryForm.module.less';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';
import { useGetMWSSchemas } from 'src/api/MWSSchemasFilter';
import SiteFilter from 'src/components/common/SiteFilter';

const { Option } = Select;

type EditMatchCategoryFormProps = FormComponentProps & {
  onSave: (values: any) => void;
  matchCategory: any;
};

type FormConfig = {
  [field: string]: GetFieldDecoratorOptions;
};

const formConfig: FormConfig = {
  Name: { rules: [{ required: true, message: 'Match Category Name is required!' }], validateTrigger: 'onBlur' },
  Vertical: { rules: [{ required: true, message: 'Vertical is required!' }], validateTrigger: 'onBlur' },
};

export const EditMatchCategoryForm: React.FC<EditMatchCategoryFormProps> = ({
  form,
  onSave,
  matchCategory,
}: EditMatchCategoryFormProps) => {
  const [selectedSchema, setSelectedSchema] = useState('');
  const [selectedSites, setSelectedSites] = useState<any>([]);
  const [ownerIds, setOwnerIds] = useState<any>([]);
  const { getFieldDecorator, getFieldsValue } = form;
  const [schemasOptions] = useGetMWSSchemas();

  useEffect(() => {
    if (matchCategory && form) {
      form.setFieldsValue({ name: matchCategory.name });
      form.setFieldsValue({ vertical: matchCategory.vertical });
      setSelectedSchema(matchCategory.vertical);
    }
    if (matchCategory.ownerIds && matchCategory.ownerIds.length > 0) {
      const owners = matchCategory.ownerIds.map((item: any) => (item ? item.toString() : ''));
      setSelectedSites(owners);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchCategory]);

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
          ID: matchCategory.ID,
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
      const owners = value.length > 0 ? value.split(',') : [];
      setOwnerIds(owners);
    }
  };

  return (
    <div className={styles.create_match_category_form_wrapper}>
      <h1 className={styles.create_match_category_title}>Edit Match Category: {matchCategory.ID}</h1>
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
                  <Select placeholder="Select Vertical" onChange={onDataSourceChange} allowClear>
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
                <SiteFilter
                  setParams={onOwnerChange}
                  schema={selectedSchema}
                  multiple={true}
                  selectedSites={selectedSites}
                />
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

const WrappedEditMatchCategoryForm = Form.create<EditMatchCategoryFormProps>({ name: 'name' })(EditMatchCategoryForm);
export default WrappedEditMatchCategoryForm;
