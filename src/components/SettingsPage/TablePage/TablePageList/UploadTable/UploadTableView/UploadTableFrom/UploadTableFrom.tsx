import React, { SyntheticEvent, useState } from 'react';
import styles from './UploadTableFrom.module.less';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Button, Select, message } from 'antd';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import Spin from 'src/components/common/Spin';
import FilesListTable from 'src/components/JobSearchDetails/UploadSearch/FilesListTable';
import FILE_FORMAT_TABLEPAGE from 'src/enums/fileFormatTablePage';

const { Option } = Select;
const fileFormats: string[] = Object.keys(FILE_FORMAT_TABLEPAGE);
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

export type EditTableFormProps = FormComponentProps & {
  loading?: boolean;
  error?: string | boolean;
  onSubmit: (values: any) => void;
  visible: boolean;
  formatVal: string;
  uploadId:any;
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





const UploadTableFrom: React.FC<EditTableFormProps> = ({
  form,
  loading,
  //error,
  onSubmit,
  formatVal,
  uploadId
}: EditTableFormProps) => {
  const { getFieldDecorator, getFieldsError, getFieldsValue, isFieldsTouched } = form;
  const [file, setFile] = useState<File>();
  const formConfig: FormConfig = {
    fileFormat: { initialValue: formatVal, rules: [{ required: true, message: 'Please select file format!' }], validateTrigger: 'onBlur' },
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

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    form.validateFields((err, values: any) => {
      if (!err && file != null) {
        let array = file.name.split(".");
        let fileType = "csv";
        if (array.length === 2) {
          var selectedExtension = array[1];
          fileType = values.fileFormat !== null && values.fileFormat === "t" ? "tsv" : "csv";

          if (fileType && selectedExtension !== null && (selectedExtension.toUpperCase() !== fileType.toUpperCase())) {
            alert("Please choose a file with extension same as selected file format.");
            return false;
          }
        }
        values.file = file;
        if (onSubmit) {
          onSubmit(values);
        }
      }
      else {
        message.error("Please choose a file.");
        return false;
      }
    });
    return false;
  };

  const onFileChange = (e: any) => {
    setFile(e.target.files[0]);
    return
  };
  return (<div className={styles.matches_filter_wrapper}>
        <div className={styles.settingPage}>
          <Form {...formItemLayout} onSubmit={handleSubmit} layout="inline">
            {loading && (
              <div className={styles.filters_spinner}>
                <Spin spinning={loading} />
              </div>
            )}
            <div className={styles.emailAddressSite}>
              <Form.Item label={''} className={styles.formLable}>
                {getFieldDecorator('uploadId', (
                  formConfig.TableId, {
                    initialValue: uploadId,
                  }))(
                    <Input type="hidden" />
                  )}
              </Form.Item>
              <FilesListTable />
              <Form.Item label="File name" className={styles.form_item}>
              {getFieldDecorator('file', (
                  formConfig.file, {
                    initialValue: "",
                  }))(
                    <Input type="file" className={styles.btn_pos} onChange={onFileChange}  id={"file"} />
                  )}
              </Form.Item>
              <Form.Item label={'File format'} className={styles.formLable}>
                {getFieldDecorator('delim', (
                  formConfig.searchMatchType, {
                    initialValue: formatVal === undefined ? 't' : formatVal,
                  }))(
                    <Select style={{ width: '270px' }}>
                      {fileFormats.map(
                        (type: string): React.ReactNode => {
                          return (
                            <Option value={type} key={`file_format_${type}`}>
                              {FILE_FORMAT_TABLEPAGE[type as keyof typeof FILE_FORMAT_TABLEPAGE]}
                            </Option>
                          );
                        }
                      )}
                    </Select>
                  )}
              </Form.Item>
              <Form.Item className={styles.siteNotificationBTN} >
                <Button type="primary" htmlType="submit" disabled={disableSubmit} >
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>);
};
const WrappedJobPropertiesForm = Form.create<EditTableFormProps>({ name: 'uploadTableFrom' })(UploadTableFrom);
export default WrappedJobPropertiesForm;