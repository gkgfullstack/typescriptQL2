import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import Select from 'src/components/common/Select';
import { Form, Col, Row, Input, Button } from 'antd';
import styles from './SiteRegionForm.module.less';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { useGetRegionStates } from 'src/api/configureRegionStates';
import { SiteManagementInfo } from 'src/types/SiteManagementInfo';
import SiteInfo from 'src/components/common/SiteInfo';

const { Option } = Select;

type ConfigureSiteRegionFormProps = FormComponentProps & {
  onSave: (values: any) => void;
  region: any;
  site: SiteManagementInfo;
  schema: string | undefined;
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
  city: { rules: [{ required: true, message: 'City is required!' }], validateTrigger: 'onBlur' },
  state: { rules: [{ required: true, message: 'State is required!' }], validateTrigger: 'onBlur' },
  zipCode: { rules: [{ required: true, message: 'ZIP Code is required!' }], validateTrigger: 'onBlur' },
  country: { rules: [{ required: true, message: 'Country is required!' }], validateTrigger: 'onBlur' },
};

const hasRequiredFields = (fields: FormFields): boolean => {
  return Object.keys(fields).some(
    field =>
      (fields[field] === undefined || fields[field] === '') &&
      formConfig[field] !== undefined &&
      formConfig[field].rules !== undefined &&
      formConfig[field].rules!.some(rule => rule.required !== undefined && rule.required)
  );
};

export const SiteRegionForm: React.FC<ConfigureSiteRegionFormProps> = ({
  form,
  onSave,
  region,
  site,
  schema,
}: ConfigureSiteRegionFormProps) => {
  const [states] = useGetRegionStates(undefined);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { getFieldDecorator, getFieldsError, getFieldsValue } = form;
  const disableSubmit =
    hasErrors(getFieldsError()) ||
    hasRequiredFields(getFieldsValue()) ||
    (region.ID && (!getFieldsValue().name || getFieldsValue().name === ''));

  useEffect(() => {
    if (region && form) {
      if (!region.country) {
        form.setFieldsValue({ country: 'US' });
      } else {
        form.setFieldsValue({ country: region.country });
      }
      form.setFieldsValue({ city: region.city });
      form.setFieldsValue({ state: region.state });
      form.setFieldsValue({ zipCode: region.zipCode });
      if (region.name) {
        form.setFieldsValue({ name: region.name });
      }
      if (region.value) {
        form.setFieldsValue({ value: region.value });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region]);

  const isCountryValid = () => {
    const isValid = getFieldsValue().country.length === 2;
    setErrorMessage('');
    if (!isValid) {
      setErrorMessage('Country must be two characters long');
    }
    return isValid;
  };

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((err, values: any) => {
      if (!err && isCountryValid()) {
        const newRegion = {
          ...values,
        };
        if (region.ID) {
          newRegion.ID = region.ID;
          newRegion.owner = region.owner;
          newRegion.active = region.active;
        } else {
          newRegion.owner = {
            ID: site.ID,
          };
          newRegion.name = `${values.city.toUpperCase()}-${newRegion.zipCode}`;
          newRegion.active = true;
        }
        newRegion.value = values.value ? values.value : values.zipCode;
        onSave(newRegion);
      }
    });
    return false;
  };

  const onStateChange = (value: any) => {
    form.setFieldsValue({ state: value });
  };

  const getTitle = (region: any) => {
    return region.ID ? 'Edit Region' : 'Add Region';
  };

  const getButtonLabel = (region: any) => {
    return region.ID ? 'Save' : 'Create Region';
  };

  const onSearchFilter = (input: string, option: ReactElement) => {
    const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
    return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <div className={styles.create_region_form_wrapper}>
      <h1 className={styles.create_region_title}>{getTitle(region)}</h1>
      <SiteInfo site={site} schema={schema} />
      <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit} className={styles.create_region_form}>
        <div>
          <Row gutter={24}>
            <Col span={24}>
              {region.ID && (
                <Form.Item label="Name:">
                  {getFieldDecorator('name', formConfig.City)(<Input type="text" placeholder="Please enter Name" />)}
                </Form.Item>
              )}
              <Form.Item label="City:">
                {getFieldDecorator('city', formConfig.City)(<Input type="text" placeholder="Please enter City" />)}
              </Form.Item>
              <Form.Item label="State:">
                {getFieldDecorator(
                  'state',
                  formConfig.Industry
                )(
                  <Select
                    placeholder="Select State"
                    onChange={onStateChange}
                    allowClear
                    showSearch
                    filterOption={onSearchFilter}
                  >
                    {states &&
                      states.map(
                        (option: any, i: number): React.ReactNode => {
                          return (
                            <Option value={option.name} key={`tree_node_option_-${option.name}-${i}`}>
                              {option.name}
                            </Option>
                          );
                        }
                      )}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="Zip Code:">
                {getFieldDecorator(
                  'zipCode',
                  formConfig.Code
                )(<Input type="text" placeholder="Please enter Zip Code" />)}
              </Form.Item>
              <Form.Item label="Region Value:">
                {getFieldDecorator(
                  'value',
                  formConfig.Code
                )(<Input type="text" placeholder="Please enter Region Value" />)}
              </Form.Item>
              <Form.Item label="Country:">
                {getFieldDecorator(
                  'country',
                  formConfig.Country
                )(<Input type="text" placeholder="Please enter Country" />)}
                <p className={styles.error_message}>{errorMessage}</p>
              </Form.Item>
            </Col>
            <Col className={styles.create_region_buttons_wrapper} span={24}>
              <Col span={24}>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  disabled={disableSubmit}
                  className={styles.save_new_region}
                >
                  {getButtonLabel(region)}
                </Button>
              </Col>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

const WrappedConfigurationNewRegionForm = Form.create<ConfigureSiteRegionFormProps>({ name: 'name' })(SiteRegionForm);
export default WrappedConfigurationNewRegionForm;
