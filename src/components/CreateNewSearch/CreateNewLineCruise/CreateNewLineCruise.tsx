import React, { SyntheticEvent } from 'react';
import styles from 'src/components/CreateNewSearch/CreateNewLineItem/CreateNewLineItem.module.less';
import { Button, Col, Divider, Form, Input, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import SelectSite from 'src/components/CreateNewSearch/SelectSite';
import { SelectValue } from 'antd/lib/select';
import { ReferenceTooltip } from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';
import FormFieldWrapper from 'src/components/CreateNewSearch/FormFieldWrapper';
import CreateCruiseDates from './CreateCruiseDates';
import CreateCruiseAdvancedOptions from './CreateCruiseAdvancedOptions';
import CreateCruiseDestination from './CreateCruiseDestination';
import { useCreateNewLineCruise } from 'src/api/cruiseJobSearch';
import { CruiseJobSearch } from 'src/types/CruiseJobSearch';

type CreateNewLineCruiseProps = FormComponentProps & {
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

const vertical = '134';

export const CreateNewLineCruise: React.FC<CreateNewLineCruiseProps> = ({
  form,
  searchName,
  jobId,
}: CreateNewLineCruiseProps) => {
  const [destinations, setDestinations] = React.useState<string[]>([]);
  const [cruiseData, setCruiseData] = React.useState<CruiseJobSearch | undefined>(undefined);
  useCreateNewLineCruise(cruiseData);

  const { getFieldDecorator, getFieldsError, getFieldsValue, isFieldsTouched, setFieldsValue } = form;
  const formConfig: FormConfig = {
    searchName: {
      initialValue: searchName,
    },
    vertical: {
      initialValue: 'Cruises',
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
    setFieldsValue({ sites: value });
    return;
  };

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((error: any, values: CruiseJobSearch) => {
      if (!error) {
        if (values) {
          const isDateRange = values.dateRange && values.dateRange.trim().split(' ').length > 1;
          const transformedData = {
            ...values,
            dateRange:
              isDateRange && values.dateRange
                ? values.dateRange
                    .trim()
                    .split('\n')
                    .join(', ')
                : undefined,
            relative: isDateRange ? 'false' : 'true',
            monthFromNow: !isDateRange && values.dateRange ? values.dateRange.trim() : undefined,
            destination: Array.isArray(destinations) ? destinations.join(', ') : destinations,
            sites: Array.isArray(values.sites) ? values.sites.join(', ') : values.sites.toString(),
            geo: values.geo ? values.geo : '',
          };
          setCruiseData(transformedData);
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
            <SelectSite vertical={vertical} getFieldDecorator={getFieldDecorator} onSiteChange={onSiteChange} />
            <CreateCruiseDestination destinations={destinations} setDestinations={setDestinations} />
          </Col>
        </Row>
        <Row>
          <Col span={16} offset={4}>
            <CreateCruiseDates
              getFieldDecorator={getFieldDecorator}
              setFieldsValue={setFieldsValue}
              getFieldsValue={getFieldsValue}
            />
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
        </Row>
        <CreateCruiseAdvancedOptions vertical={vertical} getFieldDecorator={getFieldDecorator} />
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

const WrappedCreateNewLineCruise = Form.create<CreateNewLineCruiseProps>({ name: 'name' })(CreateNewLineCruise);
export default WrappedCreateNewLineCruise;
