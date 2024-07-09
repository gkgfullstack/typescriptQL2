import React, { ReactElement, SyntheticEvent } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Col, Row, Input, Button, Radio, Select } from 'antd';
import styles from './CreateNewTableForm.module.less';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { useVarticalTableFilter } from 'src/api/varticalTableFilter';
//import { SelectValue } from 'antd/lib/select';

const { Option } = Select;

type CreateNewTableFormProps = FormComponentProps & {
    onSave: (NewTableInputs: any) => void;
    setVisible:any;
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
    name: { rules: [{ required: true, message: 'Table name is required!' }], validateTrigger: 'onBlur' },
    sAppId: { rules: [{ required: true, message: 'Industry is required!' }], validateTrigger: 'onBlur' },
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

export const CreateNewTableForm: React.FC<CreateNewTableFormProps> = ({
    form,
    onSave,
    setVisible
}: CreateNewTableFormProps
) => {
    const { getFieldDecorator, getFieldsError, getFieldsValue, isFieldsTouched } = form;
    //const [verticalList, setVerticalList] = useState<any>(undefined);
    const [verticalOptions] = useVarticalTableFilter();
    const disableSubmit =
        hasErrors(getFieldsError()) ||
        (isFieldsTouched() && hasRequiredFields(getFieldsValue())) ||
        !isFieldsTouched();

    const handleSubmit = (event: SyntheticEvent): boolean => {
        event.preventDefault();
        form.validateFields((err, values: any) => {
            if (!err) {
                let newSite: any = {
                    ...values,
                };
                onSave(newSite);
            }
        });
        return false;
    };
    const onSiteLogoChange = (value: any) => {
        form.setFieldsValue(value)
        return
    };
    let defaultAppId = verticalOptions && verticalOptions.map((option: any) => (option.ID))
    const onSearchFilter = (input: string, option: ReactElement) => {
        const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
        return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    return (
        <div className={styles.create_new_Table_form_wrapper}>
            <h1>Create New Table</h1>
            <Form layout="vertical" onSubmit={handleSubmit}>
                <div>
                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item label="Vertical Name:">
                                {getFieldDecorator('sAppId', (
                                    formConfig.SAppId, 
                                    {
                                    initialValue: defaultAppId[0],
                                    })
                                    )(
                                    <Select
                                        placeholder="Select from existing vertical"
                                        onChange={onSiteLogoChange}
                                        allowClear
                                        showSearch
                                        filterOption={onSearchFilter}
                                    >
                                        {verticalOptions &&
                                            verticalOptions.map(
                                                (option: any, i: number): React.ReactNode => {
                                                    return (
                                                        <Option value={option.ID} key={`Table-option-${option.name}-${i}`}>
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
                            <Form.Item label="Table Name:" >
                                {getFieldDecorator('sTableName',
                                    formConfig.STableName
                                )(
                                    <Input type="text" placeholder="Please enter Table Name" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Visibility:" >
                                {getFieldDecorator('sVisibility', (
                                    formConfig.Visibility, {
                                        initialValue: "p",
                                    }))(
                                        <Radio.Group style={{ width: '100%', textAlign: 'left' }}>
                                            <Radio value="p">Private </Radio>
                                            <Radio value="s">Shared</Radio>
                                        </Radio.Group>
                                    )}

                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Columns:" >
                                {getFieldDecorator('sColumns',
                                    formConfig.SColumns
                                )(
                                    <Input type={'text'} />
                                )}
                                <p style={{ textAlign: 'left', paddingTop: '10px' }}>List column headings, separated by commas.</p>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Description:" >
                                {getFieldDecorator('sDescription',
                                    formConfig.Schema
                                )(
                                    <Input type={'text'} />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={24} style={{ marginTop: '10px' }}>
                        <Col span={8}></Col>
                            <Col span={8}>
                                <Button
                                    block
                                    type="primary"
                                    htmlType="submit"
                                    disabled={disableSubmit}
                                    className={styles.save_new_client}
                                    style={{ margin: ' 0px auto', maxWidth: '300px', padding: '10px', height: 'auto' }}
                                >
                                    Create
                                </Button>
                                </Col>
                                <Col span={8}>
                                <Button
                                    block
                                    type="primary"
                                    className={styles.save_new_client}
                                    style={{ margin: ' 0px auto', maxWidth: '300px', padding: '10px', height: 'auto' }}
                                    onClick={setVisible}
                                >
                                    Cancel
                                </Button>                                
                            </Col>
                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
    );
};

const WrappedCreateNewTableForm = Form.create<CreateNewTableFormProps>({ name: 'name' })(CreateNewTableForm);
export default WrappedCreateNewTableForm;