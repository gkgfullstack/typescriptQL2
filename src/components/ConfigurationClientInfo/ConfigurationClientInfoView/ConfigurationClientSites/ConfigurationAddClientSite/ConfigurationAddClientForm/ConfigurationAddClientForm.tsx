import React, { ReactElement } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Col, Row, Button, Select } from 'antd';
import styles from './ConfigurationAddClientForm.module.less';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { SelectValue } from "antd/lib/select";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useGetConfigureAllSiteList } from "src/api/configureSiteList";

const { Option } = Select;

type SaveClientRequest = {
    siteId: string;
};

type ConfigurationAddClientFormProps = FormComponentProps & {
    onSave: (values: SaveClientRequest) => void;
    site: any;
    openCreateNewSite: () => void;
    clientId: string | undefined;
};

type FormConfig = {
    [field: string]: GetFieldDecoratorOptions;
};

const formConfig: FormConfig = {};


export const ConfigurationAddClientForm: React.FC<ConfigurationAddClientFormProps> = ({
                                                                                          form,
                                                                                          onSave,
                                                                                          site,
                                                                                          openCreateNewSite,
                                                                                          clientId
                                                                                      }: ConfigurationAddClientFormProps
) => {
    const { getFieldDecorator, getFieldsValue } = form;
    const [allSites] = useGetConfigureAllSiteList(clientId);

    const onSiteChange = (value: SelectValue) => {
        form.setFieldsValue({ site: value });
        return;
    };

    const addSiteToClient = () => {
        form.validateFields((err, values: SaveClientRequest) => {
            if (!err) {
                onSave(values);
            }
        });
    };

    const getSiteName = (option: any) => {
        const dataSource = option.dataSource ? `- Data source: ${option.dataSource}` : '';
        const productType = option.productType ? `- Product type: ${option.productType}` : '';
        return `${option.name} ${dataSource} ${productType}`;
    };

    const isSiteSelected = () => {
        return !getFieldsValue().site;
    };

    const onSearchFilter = (input: string, option: ReactElement) => {
        const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
        return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    return (
        <div className={styles.create_new_site_form_wrapper}>
            <h1>Add New {site.type} Site</h1>
            <Form layout="vertical">
                <div>
                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item
                                label="Sites:"
                            >
                                {getFieldDecorator(
                                    'site',
                                    formConfig.Industry
                                )(
                                    <Select
                                        placeholder="Select Site"
                                        onChange={onSiteChange}
                                        allowClear
                                        showSearch
                                        filterOption={onSearchFilter}
                                    >
                                        {allSites.map(
                                            (option: any, i: number): React.ReactNode => {
                                                return (
                                                    <Option value={option.ID} key={`site-${option.name}-${i}`}>{getSiteName(option)}</Option>
                                                );
                                            }
                                        )}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={24} className={styles.new_client_site_buttons}>
                            <Button
                                block
                                onClick={openCreateNewSite}
                                type="primary"
                                disabled={!isSiteSelected()}
                                style={{backgroundColor: '#4b8026'}}
                            >
                                <FontAwesomeIcon icon={['fal', 'plus']} className={styles.chevronDown} size="lg" style={{ marginRight: '10px' }} />
                                Create New Site
                            </Button>
                            <Button
                                block
                                type="primary"
                                onClick={addSiteToClient}
                                disabled={isSiteSelected()}
                                style={{backgroundColor: 'rgb(0, 45, 116)'}}
                            >
                                Add Site
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
    );
};

const WrappedConfigurationNewSiteForm = Form.create<ConfigurationAddClientFormProps>({ name: 'name' })(ConfigurationAddClientForm);
export default WrappedConfigurationNewSiteForm