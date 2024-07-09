import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Col, Row, Input, Button } from 'antd';
import styles from './EditMatchAttributeForm.module.less';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';
import { useGetMatchCategory } from 'src/api/matchCategory';

const { Option } = Select;

type EditMatchAttributeFormProps = FormComponentProps & {
  matchAttribute: any;
  onSave: (values: any) => void;
};

type FormConfig = {
  [field: string]: GetFieldDecoratorOptions;
};

const formConfig: FormConfig = {
  Name: { rules: [{ required: true, message: 'Match Category Name is required!' }], validateTrigger: 'onBlur' },
  Category: { rules: [{ required: true, message: 'Category is required!' }], validateTrigger: 'onBlur' },
};

export const EditMatchAttributeForm: React.FC<EditMatchAttributeFormProps> = ({
  form,
  matchAttribute,
  onSave,
}: EditMatchAttributeFormProps) => {
  const [matchCategoryOptions] = useGetMatchCategory();
  const { getFieldDecorator, getFieldsValue } = form;
  const [selectedCategory, setSelectedCategory] = useState<any>([]);

  useEffect(() => {
    if (matchAttribute && form) {
      form.setFieldsValue({ name: matchAttribute.name });
      if (matchCategoryOptions.length > 0 && matchAttribute.matchCategoryId) {
        form.setFieldsValue({ category: Number(matchAttribute.matchCategoryId) });
        setSelectedCategory(Number(matchAttribute.matchCategoryId));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchAttribute, matchCategoryOptions]);

  const disableSubmit = () => {
    return (
      !getFieldsValue().name ||
      getFieldsValue().name === '' ||
      !getFieldsValue().category ||
      getFieldsValue().category === ''
    );
  };

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((err, values: any) => {
      if (!err) {
        const newMatchCategory: any = {
          name: values.name,
          category: values.category ? values.category.toString() : '',
          ID: Number(matchAttribute.ID),
        };
        onSave(newMatchCategory);
      }
    });
    return false;
  };

  const onCategoryChange = (value: SelectValue) => {
    form.setFieldsValue({ category: value });
    setSelectedCategory(value);
  };

  const onSearchFilter = (input: string, option: ReactElement) => {
    const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
    return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <div className={styles.create_form_wrapper}>
      <h1 className={styles.create_title}>Edit Match Attribute: {matchAttribute.ID}</h1>
      <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
        <div>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Match Attribute Name:">
                {getFieldDecorator(
                  'name',
                  formConfig.name
                )(<Input type="text" placeholder="Please enter Match Attribute Name" />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Match Category:">
                {getFieldDecorator('category', {
                  valuePropName: 'any',
                })(
                  <Select
                    placeholder="Select Category"
                    onChange={onCategoryChange}
                    allowClear
                    showSearch
                    value={selectedCategory}
                    filterOption={onSearchFilter}
                  >
                    {matchCategoryOptions.map(
                      (option: any, i: number): React.ReactNode => {
                        return (
                          <Option value={option.ID} key={`match-attribute-${option.name}-${i}`}>
                            {option.name}
                          </Option>
                        );
                      }
                    )}
                  </Select>
                )}
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

const WrappedEditMatchAttributeForm = Form.create<EditMatchAttributeFormProps>({ name: 'name' })(
  EditMatchAttributeForm
);
export default WrappedEditMatchAttributeForm;
