import React, { SyntheticEvent, useState } from 'react';
import { Form, Modal, message, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import FILE_FORMAT from 'src/enums/fileFormat';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import Spin from 'src/components/common/Spin/Spin';
import { UploadRequest } from '../hooks/useSearchUploadingState';
import Select from 'src/components/common/Select/Select';
import styles from './UploadSearchForm.module.less';
import FilesListTable from '../FilesListTable';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';

export type AddMatchFormProps = FormComponentProps & {
  loading: boolean;
  error: string | boolean;
  onSubmit: (values: UploadRequest) => void;
  onClose: () => void;
  visible: boolean;
};

const { Option } = Select;
const fileFormats: string[] = Object.keys(FILE_FORMAT);
type FormFields = {
  [field: string]: any;
};
const hasErrors = (fieldsError: Record<string, string[] | undefined>): boolean => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};
export type FormConfig = {
  [field: string]: GetFieldDecoratorOptions;
};

export const UploadSearchForm: React.FC<AddMatchFormProps> = ({
  form,
  loading,
  error,
  onSubmit,
  onClose,
  visible,
}: AddMatchFormProps) => {
  const { getFieldDecorator, getFieldsError, getFieldsValue, isFieldsTouched } = form;
  const [file, setFile] = useState<File>();
  const { delimeter}:any = useQueryUrlParams();
  const formConfig: FormConfig = {
    fileFormat: {
      rules: [{ required: true, message: 'Please select file format!' }],
      validateTrigger: 'onBlur',
    },
  };
  const hasNoSetupRequiredFields = (fields: FormFields): boolean => {
    return Object.keys(fields).some(
      field =>
        fields[field] === undefined &&
        formConfig[field] !== undefined &&
        formConfig[field].rules !== undefined &&
        formConfig[field].rules!.some((rule:any) => rule.required !== undefined && rule.required)
    );
  };

  const disableSubmit =
  hasErrors(getFieldsError()) ||
  (isFieldsTouched() && hasNoSetupRequiredFields(getFieldsValue())) ||
  !isFieldsTouched() ||
  loading;
  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((err, values: UploadRequest) => {
      if (!err && file != null) {
        const array = file.name.split('.');
        let fileType = 'csv';
        if (array.length === 2) {
          const selectedExtension = array[1];
          fileType = values.fileFormat !== null && values.fileFormat === 't' ? 'tsv' : 'csv';

          if (fileType && selectedExtension !== null && selectedExtension.toUpperCase() !== fileType.toUpperCase()) {
            alert('Please choose a file with extension same as selected file format.');
            return false;
          }
        }
        // if(file.name.lastIndexOf("."))
        values.file = file;
        if (onSubmit) {
          onSubmit(values);
        }
      } else {
        message.error('Please choose a file.');
        return false;
      }
    });
    return false;
  };

  const closeWindow = (): void => {
    form.resetFields();
    onClose();
  };
  React.useEffect(() => {
    if (error) {
      //message.error(error);
      alert(error);
    }
  }, [error]);
  const onFileChange = (e: any) => {
    // Update the state
    setFile(e.target.files[0]);
  };

  //let fileLengt=fileLeng;
  return (
    <Modal
      visible={visible}
      title="Upload File"
      //okText="Submit"
      //cancelText="Cancel"
      onCancel={closeWindow}
      //onOk={handleSubmit}
      width={1020}
      footer={false}
      bodyStyle={{paddingBottom:"20px", overflow: "hidden"}}
    >
      <Form className={styles.form} onSubmit={handleSubmit}>
        <Spin spinning={loading}>
          <FilesListTable />
          <Form.Item label="File name" className={styles.form_item}>
            {getFieldDecorator(
              'file',
              formConfig.file
            )(<input type="file" className={styles.btn_pos} onChange={onFileChange} />)}
          </Form.Item>
          
          <Form.Item label="File format" className={styles.form_item}>
            {getFieldDecorator(
              'fileFormat',{
                initialValue: delimeter
              }
            )(
              <Select placeholder="Select Match Type" style={{ width: '270px' }}>
                {fileFormats.map(
                  (type: string): React.ReactNode => {
                    return (
                      <Option value={type} key={`file_format_${type}`}>
                        {FILE_FORMAT[type as keyof typeof FILE_FORMAT]}
                      </Option>
                    );
                  }
                )}
              </Select>
            )}
          </Form.Item>
          <div className={styles.uploadBtn}>
            <Button type="primary" onClick={closeWindow} className={styles.save_new_client}> Cancel </Button>
            <Button type="primary" htmlType="submit" disabled={disableSubmit} className={styles.save_new_client} > Submit </Button>
         </div>
        </Spin>
      </Form>
    </Modal>
  );
};

const WrappedAddMatchForm = Form.create<AddMatchFormProps>({ name: 'Upload_Search' })(UploadSearchForm);
export default WrappedAddMatchForm;
