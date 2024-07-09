import React, { SyntheticEvent, useState } from 'react';
import styles from 'src/components/CreateNewSearch/CreateNewLineItem/CreateNewLineItem.module.less';
import { Button, Col, Divider, Form, Input, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { FerryJobSearch } from 'src/types/FerryJobSearch';
import { useCreateNewLineFerry } from 'src/api/ferryJobSearch';
import SelectSite from 'src/components/CreateNewSearch//SelectSite';
import { SelectValue } from 'antd/lib/select';
import { ReferenceTooltip } from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';
import FormFieldWrapper from 'src/components/CreateNewSearch/FormFieldWrapper';
import CreateFerryDates from './CreateFerryDates';
import CreateFerryAdvancedOptions from './CreateFerryAdvancedOptions';
import CreateFerryMarkets from './CreateFerryMarkets';
import GeoFieldWrapper from 'src/components/CreateNewSearch/GeoFieldWrapper';

type CreateNewLineFerryProps = FormComponentProps & {
  searchName?: string | undefined;
  jobId?: number;
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

const vertical = '151';

export const CreateNewLineFerry: React.FC<CreateNewLineFerryProps> = ({
  form,
  searchName,
  jobId,
}: CreateNewLineFerryProps) => {
  const [ferryData, setFerryData] = React.useState<FerryJobSearch | undefined>(undefined);
  const [markets, setMarkets] = React.useState<Array<string>>([]);
  const [dateRange, setDateRange] = useState<{
    [key: string]: string | undefined;
  }>({});
  useCreateNewLineFerry(ferryData);
  const { getFieldDecorator, getFieldsError, getFieldsValue, isFieldsTouched } = form;
  const formConfig: FormConfig = {
    searchName: {
      initialValue: searchName,
    },
    vertical: {
      initialValue: 'Ferry',
    },
    jobId: {
      initialValue: jobId,
    },
  };

  const hasNoSetupRequiredFields = (fields: FormFields): boolean => {
    return Object.keys(fields).some(
      field =>
        fields[field] === undefined &&
        formConfig[field] !== undefined &&
        formConfig[field].rules !== undefined &&
        formConfig[field].rules!.some(rule => rule.required !== undefined && rule.required)
    );
  };

  const disableSubmit =
    hasErrors(getFieldsError()) ||
    (isFieldsTouched() && hasNoSetupRequiredFields(getFieldsValue())) ||
    !isFieldsTouched();

  const onSiteChange = (value: SelectValue) => {
    form.setFieldsValue({ siteCode: value });
    return;
  };

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((error: any, values: any) => {
      if (!error) {
        if (values) {
          const transformedData = {
            ...values,
            ...dateRange,
            siteCode: Array.isArray(values.siteCode) ? values.siteCode.join(',') : values.siteCode.toString(),
            geo: values.geo ? values.geo : '',
            markets: Array.isArray(markets) ? markets.join(',') : null,
          };
          setFerryData(transformedData);
        }
      }
    });
    return false;
  };

  return (
    <div className="create_new_client_form_wrapper">
      <Form hideRequiredMark>
        <Row>
          <Col span={16} offset={4}>
            <Form.Item>
              {getFieldDecorator('jobId', formConfig.jobId)(<Input type="hidden" placeholder="Please enter jobId" />)}
            </Form.Item>
            <FormFieldWrapper
              label={<h6 className="tooltiplayout">Search Name</h6>}
              content={getFieldDecorator(
                'searchName',
                formConfig.searchName
              )(<Input type="text" placeholder="Please enter Search Name" className={styles.readOnly} disabled />)}
            />
            <FormFieldWrapper
              label={<h6 className="tooltiplayout">Vertical</h6>}
              content={getFieldDecorator(
                'vertical',
                formConfig.vertical
              )(<Input type="text" placeholder="Please enter Vertical" className={styles.readOnly} disabled />)}
            />
            <SelectSite
              vertical={vertical}
              name={'siteCode'}
              getFieldDecorator={getFieldDecorator}
              onSiteChange={onSiteChange}
            />
            <CreateFerryMarkets markets={markets} setMarkets={setMarkets} />
          </Col>
        </Row>
        <Row>
          <Col span={16} offset={4}>
            <CreateFerryDates onUpdate={setDateRange} />
          </Col>
          <Col span={16} offset={4}>
            <Divider className="dividerCustom" />
            <FormFieldWrapper
              label={
                <h6>
                  Reference <ReferenceTooltip />
                  <span>Free-form, see help</span>
                </h6>
              }
              content={getFieldDecorator('reference', {})(<Input placeholder="Please enter Reference" />)}
            />
          </Col>
          <GeoFieldWrapper vertical={vertical} getFieldDecorator={getFieldDecorator} />
        </Row>
        <Row>
          <Col span={16} offset={4}>
            <CreateFerryAdvancedOptions getFieldDecorator={getFieldDecorator} />
          </Col>
        </Row>
        <Col span={16} offset={4}>
          <Button
            type="primary"
            onClick={handleSubmit}
            disabled={disableSubmit}
            className="submitBtn"
            style={{ margin: '20px auto', display: 'table' }}
          >
            Submit
          </Button>
        </Col>
      </Form>
    </div>
  );
};

const WrappedCreateNewLineFerry = Form.create<CreateNewLineFerryProps>({ name: 'name' })(CreateNewLineFerry);
export default WrappedCreateNewLineFerry;
