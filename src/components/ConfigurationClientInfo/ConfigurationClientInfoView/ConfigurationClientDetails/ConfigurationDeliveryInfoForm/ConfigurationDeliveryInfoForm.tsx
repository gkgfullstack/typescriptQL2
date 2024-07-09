import React, {SyntheticEvent, useEffect, useState} from 'react';
import {Button, Col, Form, Row, Input, DatePicker} from "antd";
import {FormComponentProps} from "antd/lib/form";
import styles from "../ConfigurationClientDetails.module.less";
import moment from 'moment';
import { useGetSiteDelivery, useSaveSiteDelivery } from "src/api/configureSiteDelivery";

const { TextArea } = Input;

type ConfigurationDeliveryInfoFormProps = FormComponentProps & {
    clientId: string | undefined;
};

const ConfigurationDeliveryInfoForm: React.FC<ConfigurationDeliveryInfoFormProps> = ({
                                                                                            form,
                                                                                         clientId
                                                                                        }: ConfigurationDeliveryInfoFormProps
) => {
    const { getFieldDecorator } = form;
    const [savedDeliveryDetails, setSavedDeliveryDetails] = useState(null);
    const [deliveryInfo] = useGetSiteDelivery(clientId, savedDeliveryDetails);
    const [deliveryEdited, setDeliveryEdited] = useState(false);
    useSaveSiteDelivery(clientId, savedDeliveryDetails, setSavedDeliveryDetails);

    useEffect(() => {
        if (deliveryInfo && form) {
            form.setFieldsValue({ schedule: deliveryInfo.schedule });
            form.setFieldsValue({ location: deliveryInfo.location });
            form.setFieldsValue({ credentials: deliveryInfo.credentials });
            if (deliveryInfo.ftpExpirationDate) {
                form.setFieldsValue({ ftpExpirationDate: moment(deliveryInfo.ftpExpirationDate) });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deliveryInfo]);

    const onDeliveryScheduleChange = (value: any) => {
        form.setFieldsValue({ schedule: value });
    };

    const onDateChange = (value: any) => {
        form.setFieldsValue({ ftpExpirationDate: value });
    };

    const disabledDate = (currentDate: any) => {
        return currentDate && currentDate < moment().endOf('day');
    };

    const onSave = (event: SyntheticEvent): boolean => {
        event.preventDefault();
        form.validateFields((err, values: any) => {
            if (!err) {
                const newForm: any = {
                    schedule: values.schedule || '',
                    credentials: values.credentials || '',
                    location: values.location || '',
                    ftpExpirationDate: values.ftpExpirationDate ? moment(values.ftpExpirationDate).format('YYYY-MM-DD') : ''
                };
                if (deliveryInfo && deliveryInfo.id) {
                    newForm.id = deliveryInfo.id;
                }
                setSavedDeliveryDetails(newForm);
                setDeliveryEdited(false);
            }
        });
        return false;
    };

    const onEditDelivery = () => {
        setDeliveryEdited(true);
    };

    return (
        <Form className={styles.configuration_client_panel_form} layout="vertical" hideRequiredMark onSubmit={onSave}>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item label="Delivery Schedule:">
                        {getFieldDecorator('schedule')(
                            <TextArea
                                rows={2}
                                onChange={onDeliveryScheduleChange}
                                placeholder="Please enter Delivery Schedule"
                                disabled={!deliveryEdited}
                            />
                        )}
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="Delivery Location:">
                        {getFieldDecorator('location')(
                            <Input type="text" placeholder="Please enter Delivery Location" disabled={!deliveryEdited} />
                        )}
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="Delivery Credential:">
                        {getFieldDecorator('credentials')(
                            <Input type="text" placeholder="Please enter Delivery Credential" disabled={!deliveryEdited} />
                        )}
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="FTP Expiration Date:">
                        {getFieldDecorator('ftpExpirationDate')(
                            <DatePicker
                                onChange={onDateChange}
                                placeholder="Select FTP Expiration Date"
                                style={{ width: "100%" }}
                                format={"YYYY-MM-DD"}
                                disabledDate={disabledDate}
                                disabled={!deliveryEdited}
                            />
                        )}
                    </Form.Item>
                </Col>
            </Row>
            {
                !deliveryEdited && <Button
                    block
                    type="primary"
                    onClick={onEditDelivery}
                    className={styles.configuration_client_button}
                >
                    Edit Delivery Info
                </Button>
            }
            {
                deliveryEdited && <Button
                    block
                    type="primary"
                    htmlType="submit"
                    className={styles.configuration_client_button}
                >
                    Save Delivery Info
                </Button>
            }
        </Form>
    );
};

const WrappedConfigurationAdditionalNotesForm = Form.create<ConfigurationDeliveryInfoFormProps>({ name: 'name' })(ConfigurationDeliveryInfoForm);
export default WrappedConfigurationAdditionalNotesForm;