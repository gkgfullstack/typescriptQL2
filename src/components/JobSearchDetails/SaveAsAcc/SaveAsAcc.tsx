  import React, { SyntheticEvent } from 'react';
  import { FormComponentProps } from 'antd/lib/form';
  import styles from './SaveAsAcc.module.less';
  import Spin from 'src/components/common/Spin';
  import { Input, Form, Button, Divider } from 'antd';
  import { useSearchDetailsStateContext } from 'src/stateProviders/useSearchDetailsStateContext';
  import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
  //import { useSaveAsFetching } from './hooks';

  export type SaveAsAccFormProps = FormComponentProps & {
    onUpdate: (values: any, form: any) => void;
    jobId: any;
    setVisibleSaveAsAcc: (visibleSaveAsAcc: any) => void;
    jobName:any;
    loadingData:boolean;
  };

  type FormConfig = {
    [field: string]: GetFieldDecoratorOptions;
  };

  const formConfig: FormConfig = {
    name: { rules: [{ required: true, message: 'Name is required!' }], validateTrigger: 'onBlur' }
  };

  const SaveAsAcc: React.FC<SaveAsAccFormProps> = ({onUpdate, setVisibleSaveAsAcc, form, jobName, loadingData }: SaveAsAccFormProps) => {
    const { getFieldDecorator } = form;
    const { searchId } = useSearchDetailsStateContext();
    let jobId = searchId;
    const handleSubmit = (event: SyntheticEvent): boolean => {
      event.preventDefault();
      form.validateFields((err, values: any) => {
        if (!err) {
          const newSite: any = {
            ...values
          };
          onUpdate(newSite, form);
          setVisibleSaveAsAcc(false);
        }
      });
      return false;
    };

    return (<div className={styles.saveAsMain}>
      <Spin spinning={loadingData} >
        <Form layout="horizontal" hideRequiredMark onSubmit={handleSubmit}>
          <p>Save a copy of this search with another name.</p>
          <Form.Item label="" className={styles.displayNone}>
            {getFieldDecorator(
              'id', (formConfig.Id, {
                initialValue: jobId,
              }))(<Input type="hidden" />)}
          </Form.Item>
          <Form.Item label="Name" >
            {getFieldDecorator(
              'name', (formConfig.Name, {
                initialValue: 'Copy of' +" "+jobName
              }))(<Input />)}
          </Form.Item>
          <Divider />
          <Form.Item label="" >
            <Button type="primary" onClick={setVisibleSaveAsAcc}> Cancel</Button>
            <Button type="primary" htmlType="submit"> Save</Button>
          </Form.Item>
        </Form></Spin>
    </div>);
  };
  const WrappedJobPropertiesForm = Form.create<SaveAsAccFormProps>({ name: 'saveAsAcc' })(SaveAsAcc);
  export default WrappedJobPropertiesForm;


