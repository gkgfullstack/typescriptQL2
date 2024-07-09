import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Col, Row, Input, Button } from 'antd';
import styles from './EditFingerprintForm.module.less';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import SiteInfo from 'src/components/common/SiteInfo';
import { SiteManagementInfo } from 'src/types/SiteManagementInfo';
import FingerprintInfo from 'src/types/FingerprintInfo';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';
import { useGetSiteMetadataList } from 'src/api/siteMetadata';
import { useGetFingerprint } from 'src/api/fingerPrintFilter';
import Spin from 'src/components/common/Spin';

const { Option } = Select;

type EditFingerprintFormProps = FormComponentProps & {
  site: SiteManagementInfo;
  schema: string | undefined;
  onSave: (values: any) => void;
  fingerprint: FingerprintInfo;
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

const formConfig: FormConfig = {};

const hasRequiredFields = (fields: FormFields): boolean => {
  return Object.keys(fields).some(
    field =>
      (fields[field] === undefined || fields[field] === '') &&
      formConfig[field] !== undefined &&
      formConfig[field].rules !== undefined &&
      formConfig[field].rules!.some(rule => rule.required !== undefined && rule.required)
  );
};

export const EditFingerprintForm: React.FC<EditFingerprintFormProps> = ({
  site,
  schema,
  form,
  onSave,
  fingerprint,
}: EditFingerprintFormProps) => {
  const [requestParams, setRequestParams] = useState({});
  const [selectedMetadata, setSelectedMetadata] = useState<any>(undefined);
  const [loading, metadataCount, metadataList] = useGetSiteMetadataList(requestParams);
  const [isEdited, setEdited] = useState<boolean>(false);
  const [updatedFinger] = useGetFingerprint(isEdited, fingerprint.ID, schema, setEdited);

  const { getFieldDecorator, getFieldsError, getFieldsValue } = form;
  const disableSubmit =
    hasErrors(getFieldsError()) ||
    hasRequiredFields(getFieldsValue()) ||
    !getFieldsValue().name ||
    getFieldsValue().name === '';

  useEffect(() => {
    if (!loading && metadataCount === 0) {
      setRequestParams({
        pagesize: 50,
        pagestart: 0,
        siteId: site.ID,
        verticalName: schema,
        sortingcolumn: 'name',
        sortingorder: 'asc',
      });
    }
    if (fingerprint && fingerprint.ID) {
      setEdited(true);
    }
    if (fingerprint && form) {
      if (fingerprint.name) {
        form.setFieldsValue({ name: fingerprint.name });
      }
      if (fingerprint.metadataIds) {
        form.setFieldsValue({ metadataIds: fingerprint.metadataIds });
      }
    }
    if (updatedFinger && updatedFinger.metadataIds && metadataCount > 0) {
      const metadataIds = updatedFinger.metadataIds.map((item: any) => (item ? item.toString() : ''));
      form.setFieldsValue({ metadataIds });
      setSelectedMetadata(metadataIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fingerprint, updatedFinger, metadataCount]);

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((err, values: any) => {
      if (!err) {
        const newFingerprint = {
          ...values,
        };
        if (fingerprint.ID) {
          newFingerprint.ID = Number(fingerprint.ID);
        }
        if (!newFingerprint.metadataIds) {
          newFingerprint.metadataIds = [];
        }
        onSave(newFingerprint);
      }
    });
    return false;
  };

  const getTitle = (fingerprint: FingerprintInfo) => {
    return fingerprint.ID ? 'Edit Fingerprint' : 'Add Fingerprint';
  };

  const getButtonLabel = (fingerprint: FingerprintInfo) => {
    return fingerprint.ID ? 'Save' : 'Create Fingerprint';
  };

  const onMetadataChange = (value: SelectValue) => {
    form.setFieldsValue({ metadataIds: value });
    setSelectedMetadata(value);
  };

  const onSearchFilter = (input: string, option: ReactElement) => {
    const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
    return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <div className={styles.create_fingerprint_form_wrapper}>
      <h1 className={styles.create_fingerprint_title}>{getTitle(fingerprint)}</h1>
      <SiteInfo site={site} schema={schema} />
      <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit} className={styles.create_fingerprint_form}>
        <div>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Fingerprint Name:">
                {getFieldDecorator(
                  'name',
                  formConfig.City
                )(<Input type="text" placeholder="Please enter Fingerprint Name" />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Spin spinning={loading}>
                <Form.Item label="Metadata Name:">
                  {getFieldDecorator('metadataIds', {
                    valuePropName: 'any',
                  })(
                    <Select
                      mode="multiple"
                      showArrow={true}
                      placeholder="Select Metadata Name"
                      value={selectedMetadata}
                      onChange={onMetadataChange}
                      showSearch
                      filterOption={onSearchFilter}
                      allowClear
                      maxTagCount={1}
                    >
                      {metadataList.map(
                        (option: any, i: number): React.ReactNode => {
                          return (
                            <Option value={option.ID} key={`metadata-name-${option.ID}-${i}`}>
                              {option.name}
                            </Option>
                          );
                        }
                      )}
                    </Select>
                  )}
                </Form.Item>
              </Spin>
            </Col>
            <Col className={styles.create_fingerprint_buttons_wrapper} span={24}>
              <Col span={24}>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  disabled={disableSubmit}
                  className={styles.save_new_fingerprint}
                >
                  {getButtonLabel(fingerprint)}
                </Button>
              </Col>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

const WrappedEditFingerprintForm = Form.create<EditFingerprintFormProps>({ name: 'name' })(EditFingerprintForm);
export default WrappedEditFingerprintForm;
