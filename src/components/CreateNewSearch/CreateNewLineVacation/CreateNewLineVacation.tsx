import React, { SyntheticEvent, useState } from 'react';
import styles from 'src/components/CreateNewSearch/CreateNewLineItem/CreateNewLineItem.module.less';
import { Button, Col, Divider, Form, Input, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import SelectSite from 'src/components/CreateNewSearch//SelectSite';
import CreateVacationTraveler from './CreateVacationTraveler';
import CreateVacationDates from './CreateVacationDates';
import { SelectValue } from 'antd/lib/select';
import CreateVacationSearchTypes from './CreateVacationSearchTypes';
import CreateVacationAdvancedOptions from './CreateVacationAdvancedOptions';
import { useCreateNewLineVacation } from 'src/api/vacationJobSearch';
import { ReferenceTooltip } from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';
import { defaultCheckedList } from './CreateVacationAdvancedOptions/CreateVacationAdvancedOptions.config';
import { AirportCodeTooltip,DestinationsTooltip} from 'src/components/CreateNewSearch/CreateNewLineVacation/CreateVacationTooltip/CreateVacationTooltip';

type CreateNewLineVacationProps = FormComponentProps & {
  searchName?: string | undefined;
  jobId?: number;
  vertical: string;
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

const { TextArea } = Input;
const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 15 },
};

export const CreateNewLineVacation: React.FC<CreateNewLineVacationProps> = ({
  form,
  searchName,
  jobId,
  vertical,
}: CreateNewLineVacationProps) => {
  const [vacationData, setVacationData] = React.useState(undefined);
  const [dateRange, setDateRange] = useState<{
    [key: string]: string | undefined;
  }>({});
  const [propertyName, setPropertyName] = React.useState('');
  const [departDaysOfWeek, setDepartDaysOfWeek] = React.useState(defaultCheckedList.join(','));
  const [returnDaysOfWeek, setReturnDaysOfWeek] = React.useState(defaultCheckedList.join(','));
  useCreateNewLineVacation(vacationData);
  const { getFieldDecorator, getFieldsError, getFieldsValue, isFieldsTouched, setFieldsValue } = form;
  const formConfig: FormConfig = {
    searchName: {
      initialValue: searchName,
    },
    vertical: {
      initialValue: 'Vacation',
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

  const onSearchTypeChange = (value: SelectValue) => {
    form.setFieldsValue({ searchType: value });
  };

  const onSiteChange = (value: SelectValue) => {
    const sites: string = Array.isArray(value) ? value.join(', ') : value.toString();
    form.setFieldsValue({ sites });
  };

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((error: any, values: any) => {
      if (!error) {
        const transformData = {
          ...values,
          sites: values.sites.join(', '),
          sortByPrice: values.sortByPrice ? '1' : '0',
          ratesPerHotel: values.ratesPerHotel ? '1' : '0',
          geo: values.geo ? values.geo : '',
        };
        if (departDaysOfWeek) {
          transformData.dowFilterDep = departDaysOfWeek;
        }
        if (returnDaysOfWeek) {
          transformData.dowFilterRet = returnDaysOfWeek;
        }
        if (dateRange.specificDate) {
          transformData.specificDate = dateRange.specificDate;
        } else {
          transformData.dateRangeStart = dateRange.dateRangeStart;
          transformData.dateRangeEnd = dateRange.dateRangeEnd;
          transformData.dateRangeLength = dateRange.dateRangeLength;
        }
        if (propertyName) {
          transformData.propertyName = propertyName;
        }
        setVacationData(transformData);
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
            <Form.Item {...layout} label={<h6 className="tooltiplayout">Search Name</h6>}>
              {getFieldDecorator(
                'searchName',
                formConfig.searchName
              )(<Input type="text" placeholder="Please enter Search Name" className={styles.readOnly} disabled />)}
            </Form.Item>
            <Divider className="dividerCustom" />
            <Form.Item {...layout} label={<h6 className="tooltiplayout">Vertical</h6>}>
              {getFieldDecorator(
                'vertical',
                formConfig.vertical
              )(<Input type="text" placeholder="Please enter Vertical" className={styles.readOnly} disabled />)}
            </Form.Item>
            <Divider className="dividerCustom" />
            <SelectSite vertical={vertical} getFieldDecorator={getFieldDecorator} onSiteChange={onSiteChange} />
            <Form.Item
              {...layout}
              label={
                <h6 className="tooltiplayout">
                  Origin
                  <span>Comma separated Airport codes</span>
                  <AirportCodeTooltip />
                </h6>
              }
            >
              {getFieldDecorator('origin', {})(<Input type="text" placeholder="Please enter Origin" />)}
            </Form.Item>
            <Divider className="dividerCustom" />
            <Form.Item
              {...layout}
              label={
                <h6 className="tooltiplayout">
                  Destination<span>Comma separated Destinations</span>
                  <DestinationsTooltip/>
                </h6>
              }
            >
              {getFieldDecorator('destination', {})(<TextArea rows={3} placeholder="Please enter Destination" />)}
            </Form.Item>
            <Divider className="dividerCustom" />
            <CreateVacationTraveler getFieldDecorator={getFieldDecorator} />
            <CreateVacationSearchTypes getFieldDecorator={getFieldDecorator} onSearchTypeChange={onSearchTypeChange} />
          </Col>
        </Row>
        <Row>
          <Col span={16} offset={4}>
            <CreateVacationDates onUpdate={setDateRange} />
          </Col>
          <Col span={16} offset={4}>
            <Divider className="dividerCustom" />
            <Form.Item
              {...layout}
              label={
                <h6>
                  Reference <ReferenceTooltip />
                </h6>
              }
            >
              {getFieldDecorator('reference', {})(<Input placeholder="Please enter Reference" />)}
            </Form.Item>
            <Divider className="dividerCustom" />
          </Col>
        </Row>
        <CreateVacationAdvancedOptions
          vertical={vertical}
          getFieldDecorator={getFieldDecorator}
          setFieldsValue={setFieldsValue}
          onUpdatePropertyName={setPropertyName}
          setDepartDaysOfWeek={setDepartDaysOfWeek}
          setReturnDaysOfWeek={setReturnDaysOfWeek}
        />
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

const WrappedCreateNewLineVacationForm = Form.create<CreateNewLineVacationProps>({ name: 'name' })(
  CreateNewLineVacation
);
export default WrappedCreateNewLineVacationForm;
