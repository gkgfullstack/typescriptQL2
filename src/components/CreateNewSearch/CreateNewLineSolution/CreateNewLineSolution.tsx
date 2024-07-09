import React, { SyntheticEvent } from 'react';
import { SolutionJobSearch } from 'src/types/SolutionJobSearch';
import { Button, Col, Divider, Form, Input, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import styles from 'src/components/CreateNewSearch/CreateNewLineItem/CreateNewLineItem.module.less';
import SelectSite from 'src/components/CreateNewSearch/SelectSite';
import { SelectValue } from 'antd/lib/select';
import { useCreateConfigurableJobSearch } from 'src/api/createNewSearch/configurableList';
import SolutionsData from 'src/types/SolutionsData';
import { InputValuesTooltip } from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';

type CreateNewLineSolutionProps = FormComponentProps & {
  searchName?: string | undefined;
  jobId?: number;
};

type FormFields = { [field: string]: any };
type FormConfig = { [field: string]: GetFieldDecoratorOptions };

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 15 },
};
const vertical = '104';
const { TextArea } = Input;

const hasErrors = (fieldsError: Record<string, string[] | undefined>): boolean => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};

export const CreateNewLineSolution: React.FC<CreateNewLineSolutionProps> = ({
  searchName,
  jobId,
  form,
}: CreateNewLineSolutionProps) => {
  const [solutionData, setSolutionData] = React.useState<SolutionsData[] | undefined>(undefined);
  useCreateConfigurableJobSearch(solutionData, jobId);

  const { getFieldDecorator, getFieldsError, getFieldsValue, isFieldsTouched } = form;
  const formConfig: FormConfig = {
    jobId: {
      initialValue: jobId,
    },
    searchName: {
      initialValue: searchName,
    },
    vertical: {
      initialValue: 'Solutions',
    },
    inputValues: {
      rules: [{ required: true, message: 'Input Values is required!' }],
      validateTrigger: 'onBlur',
    },
  };

  const onSiteChange = (value: SelectValue) => {
    form.setFieldsValue({ sites: value });
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

  const handleSubmit = (event: SyntheticEvent): boolean => {
    form.validateFields((error, values: SolutionJobSearch) => {
      event.preventDefault();
      if (!error) {
        const transformedData: SolutionsData[] = [
          { key: 'script', value: values.sites },
          { key: 'input', value: values.inputValues },
        ];
        setSolutionData(transformedData);
      }
    });
    return false;
  };
  return (
    <div className={'create_new_client_form_wrapper'}>
      <Form hideRequiredMark>
        <Row>
          <Col span={16} offset={4}>
            <Form.Item>
              {getFieldDecorator('jobId', formConfig.jobId)(<Input type="hidden" placeholder={'Please enter jobId'} />)}
            </Form.Item>
            <Form.Item {...layout} label={<h6 className="tooltiplayout">Search Name</h6>}>
              {getFieldDecorator(
                'searchName',
                formConfig.searchName
              )(<Input type="text" placeholder={'Please enter Search Name'} className={styles.readOnly} disabled />)}
            </Form.Item>
            <Divider className={'dividerCustom'} />
            <Form.Item {...layout} label={<h6 className={'tooltiplayout'}>Vertical</h6>}>
              {getFieldDecorator(
                'vertical',
                formConfig.vertical
              )(<Input type={'text'} placeholder={'Please enter Vertical'} className={styles.readOnly} disabled />)}
            </Form.Item>
            <Divider className={'dividerCustom'} />
            <SelectSite
              isSingle={true}
              vertical={vertical}
              getFieldDecorator={getFieldDecorator}
              onSiteChange={onSiteChange}
            />
            <Form.Item
              {...layout}
              label={
                <h6 className={'tooltiplayout'}>
                  Input Values
                  <InputValuesTooltip />
                  <span>Comma separated</span>
                </h6>
              }
            >
              {getFieldDecorator(
                'inputValues',
                formConfig.inputValues
              )(<TextArea rows={3} placeholder={'Please enter Input Values'} />)}
            </Form.Item>
            <Divider className={'dividerCustom'} />
          </Col>
        </Row>
        <Col span={16} offset={4}>
          <Button
            type={'primary'}
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

const WrappedCreateNewLineSolutionForm = Form.create<CreateNewLineSolutionProps>({ name: 'name' })(
  CreateNewLineSolution
);
export default WrappedCreateNewLineSolutionForm;
