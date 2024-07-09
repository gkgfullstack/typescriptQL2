import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Col, Row, Input } from 'antd';
import styles from './DeleteConfirmationForm.module.less';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';

type DeleteConfirmationFormProps = FormComponentProps & {
  name: string;
  setPassword: any;
};

type FormConfig = {
  [field: string]: GetFieldDecoratorOptions;
};

const formConfig: FormConfig = {};

export const DeleteConfirmationForm: React.FC<DeleteConfirmationFormProps> = ({
  form,
  name,
  setPassword,
}: DeleteConfirmationFormProps) => {
  const { getFieldDecorator } = form;

  const onChangePassphrase = (event: any) => {
    setPassword(event.target.value);
  };

  return (
    <div className={styles.delete_confirmation_form_wrapper}>
      <h1 className={styles.form_title}>
        Are you sure you want to delete <span className={styles.form_title_name}>{name}</span>?
      </h1>
      <Form layout="vertical" hideRequiredMark className={styles.form_wrapper}>
        <div>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label={
                  <span>
                    To confirm deletion, type <i>delete</i> in the text field.
                  </span>
                }
              >
                {getFieldDecorator(
                  'passphrase',
                  formConfig.City
                )(<Input type="text" placeholder={'delete'} onChange={onChangePassphrase} />)}
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

const WrappedDeleteConfirmationForm = Form.create<DeleteConfirmationFormProps>({ name: 'name' })(
  DeleteConfirmationForm
);
export default WrappedDeleteConfirmationForm;
