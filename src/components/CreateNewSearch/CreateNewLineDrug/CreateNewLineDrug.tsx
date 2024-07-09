import React, { SyntheticEvent } from 'react';
import styles from 'src/components/CreateNewSearch/CreateNewLineItem/CreateNewLineItem.module.less';
import { Button, Col, Form, Input, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import SelectSite from 'src/components/CreateNewSearch//SelectSite';
import { SelectValue } from 'antd/lib/select';
import FormFieldWrapper from 'src/components/CreateNewSearch/FormFieldWrapper';
import { useCreateConfigurableJobSearch, useGetConfigurableList } from 'src/api/createNewSearch/configurableList';
import CreateDrugInputValues from 'src/components/CreateNewSearch/CreateNewLineDrug/CreateDrugInputValues';
import SolutionsData from 'src/types/SolutionsData';

type CreateNewLineDrugProps = FormComponentProps & {
  searchName?: string | undefined;
  jobId?: number;
  vertical: string;
  appId: string;
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

export const CreateNewLineDrug: React.FC<CreateNewLineDrugProps> = ({
  form,
  searchName,
  jobId,
  vertical,
  appId,
}: CreateNewLineDrugProps) => {
  const { getFieldDecorator, getFieldsError, getFieldsValue, isFieldsTouched } = form;
  const formConfig: FormConfig = {
    searchName: {
      initialValue: searchName,
    },
    vertical: {
      initialValue: vertical,
    },
    jobId: {
      initialValue: jobId,
    },
  };
  const [fields, siteName] = useGetConfigurableList(appId);
  const [configurableData, setConfigurableData] = React.useState<SolutionsData[] | undefined>(undefined);
  useCreateConfigurableJobSearch(configurableData, jobId);

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
    form.setFieldsValue({ sites: value });
    return;
  };

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((error: any, values: any) => {
      if (!error) {
        const transformedData: any = [];
        if (values.sites.length) {
          transformedData.push({ key: siteName, value: values.sites });
        }

        setConfigurableData(transformedData);
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
              isSingle={true}
              vertical={'10005'}
              getFieldDecorator={getFieldDecorator}
              onSiteChange={onSiteChange}
            />
          </Col>
        </Row>
        {fields.length > 0 && <CreateDrugInputValues fields={fields} />}
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

const WrappedCreateNewLineDrug = Form.create<CreateNewLineDrugProps>({ name: 'name' })(CreateNewLineDrug);
export default WrappedCreateNewLineDrug;
