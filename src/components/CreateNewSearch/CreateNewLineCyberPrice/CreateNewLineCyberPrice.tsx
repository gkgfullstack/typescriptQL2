import React, { SyntheticEvent } from 'react';
import styles from 'src/components/CreateNewSearch/CreateNewLineItem/CreateNewLineItem.module.less';
import { Button, Col, Form, Input, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import SelectSite from 'src/components/CreateNewSearch/SelectSite';
import { SelectValue } from 'antd/lib/select';
import FormFieldWrapper from 'src/components/CreateNewSearch/FormFieldWrapper';
import CreateCyberPriceFields from './CreateCyberPriceFields';
import useCreateCyberPrice from 'src/api/cyberPrice';
import { CyberPrice } from 'src/types/CyberPrice';

type CreateNewLineCyberPriceProps = FormComponentProps & {
  vertical: string;
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

export const CreateNewLineCyberPrice: React.FC<CreateNewLineCyberPriceProps> = ({
  form,
  vertical,
  searchName,
  jobId,
}: CreateNewLineCyberPriceProps) => {
  const [cyberPrice, setCyberPrice] = React.useState<CyberPrice | undefined>();
  const [inputFieldValues, setInputFieldValues] = React.useState<string>('');
  useCreateCyberPrice(cyberPrice);

  const { getFieldDecorator, getFieldsError, getFieldsValue, isFieldsTouched, setFieldsValue } = form;
  const formConfig: FormConfig = {
    searchName: {
      initialValue: searchName,
    },
    vertical: {
      initialValue: 'CyberPrice',
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
    form.setFieldsValue({ sites: value });
    return;
  };

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((error: any, values: CyberPrice) => {
      if (!error) {
        if (values) {
          const transformedData = {
            ...values,
            inputsValues: inputFieldValues,
            sites: Array.isArray(values.sites) ? values.sites.join(', ') : values.sites.toString(),
          };
          const {
            manufacturer,
            productNumber,
            reference,
            secondPassword,
            secondaryProductNumber,
            sitePassword,
            siteUsername,
            zipCode,
            ...formatedData
          } = transformedData;
          setCyberPrice(formatedData);
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
            <CreateCyberPriceFields
              onSetInputValues={setInputFieldValues}
              getFieldDecorator={getFieldDecorator}
              setFieldsValue={setFieldsValue}
              getFieldsValue={getFieldsValue}
            />
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

const WrappedCreateNewLineCyberPrice = Form.create<CreateNewLineCyberPriceProps>({ name: 'name' })(
  CreateNewLineCyberPrice
);
export default WrappedCreateNewLineCyberPrice;
