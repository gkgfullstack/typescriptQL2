import React, { SyntheticEvent, useEffect } from 'react';
import { Form, Col, Row, Input, Button } from 'antd';
import styles from './CreateCompetitiveSetsForm.module.less';
import { FormComponentProps } from 'antd/lib/form';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import CreateComSetPropertyName from '../CreateComSetPropertyName';
import { CompetitiveSetInfo } from 'src/types/CompetitiveSetInfo';
import { CompetitiveSet } from 'src/types/CompetitiveSet';
import useCreateCompset from 'src/api/createCompetitiveSet';

type CreateCompetitiveSetsFormProps = FormComponentProps & { record?: CompetitiveSetInfo; isEditable?: boolean };

type FormConfig = {
  [field: string]: GetFieldDecoratorOptions;
};

const formConfig: FormConfig = {
  compSetName: { rules: [{ required: true, message: 'Competitive Set name is required!' }], validateTrigger: 'onBlur' },
};

const CreateCompetitiveSetsForm: React.FC<CreateCompetitiveSetsFormProps> = ({
  form,
  record,
  isEditable,
}: CreateCompetitiveSetsFormProps) => {
  const [compSetData, setCompSetData] = React.useState<{ compSetName: string; propertyIDs: string } | undefined>(
    undefined
  );

  useCreateCompset(compSetData, record);

  useEffect(() => {
    if (record) {
      form.setFieldsValue({ compSetName: record.name });
      form.setFieldsValue({ propertyIDs: record.propertyIds?.map(id => id).join(', ') });
    }
  }, [record]);

  const { getFieldDecorator, getFieldsValue } = form;

  const disableSubmit = (): boolean => {
    return (
      !getFieldsValue().compSetName ||
      getFieldsValue().compSetName === '' ||
      !getFieldsValue().propertyIDs ||
      getFieldsValue().propertyIDs === ''
    );
  };

  const clearForm = (): void => {
    form.setFieldsValue({ compSetName: undefined });
  };

  const onSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    form.validateFields((error, values: CompetitiveSet) => {
      if (!error) {
        setCompSetData(values);
        clearForm();
      }
    });
  };

  const onAdd = (values: string): void => {
    form.setFieldsValue(
      !record ? { propertyIDs: values } : { propertyIDs: `${record?.propertyIds?.map(id => id).join(', ')}, ${values}` }
    );
  };

  return (
    <div className={styles.create_new_site_form_wrapper}>
      <h1>Create New or Edit Competitive Set</h1>
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item label="Competitive Set Name:">
              {getFieldDecorator(
                'compSetName',
                formConfig.compSetName
              )(<Input type="text" placeholder="Please enter Competitive Set Name" />)}
            </Form.Item>
          </Col>
          <Col span={24}>
            <CreateComSetPropertyName label={'Property ID Search:'} onAdd={onAdd} flexed editCompset />
          </Col>
          {isEditable && (
            <Col span={24}>
              <Form.Item label="List Property IDs:">
                {getFieldDecorator(
                  'propertyIDs',
                  formConfig.propertyIDs
                )(<Input type="text" placeholder="Multiple property IDs (Comma separated)" />)}
              </Form.Item>
            </Col>
          )}
          <Col span={24} className={styles.centered_button}>
            <Button
              className={styles.save_new_compset}
              disabled={disableSubmit()}
              type="primary"
              size="default"
              onClick={event => onSubmit(event)}
            >
              Save Competitive Set
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

const WrappedCreateCompetitiveSetsForm = Form.create<CreateCompetitiveSetsFormProps>()(CreateCompetitiveSetsForm);
export default WrappedCreateCompetitiveSetsForm;
