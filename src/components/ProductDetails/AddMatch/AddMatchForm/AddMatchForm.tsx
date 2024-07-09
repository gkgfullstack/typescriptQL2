import React, { SyntheticEvent, useState } from 'react';
import { Alert, Button, Form, Input, Tooltip, TreeSelect } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import MATCH_TYPE from 'src/enums/matchType';
import Select from 'src/components/common/Select/Select';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import Competitor from 'src/types/Competitor';
import Spin from 'src/components/common/Spin/Spin';
import { AddMatchRequest } from '../hooks/useMatchAddingState';
import clsx from 'clsx';

import styles from './AddMatchForm.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { TreeNode } = TreeSelect;

export type AddMatchFormProps = FormComponentProps & {
  visible: boolean;
  loading: boolean;
  competitors: Competitor[] | null;
  error: string | boolean;
  onSubmit: (values: AddMatchRequest) => void;
};

const { Option } = Select;
const matchTypes: string[] = Object.keys(MATCH_TYPE);

const hasErrors = (fieldsError: Record<string, string[] | undefined>): boolean => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};
type FormFields = {
  [field: string]: any;
};

export type FormConfig = {
  [field: string]: GetFieldDecoratorOptions;
};

export const formConfig: FormConfig = {
  ownerId: {
    rules: [{ required: true, message: 'Please select site!' }],
    validateTrigger: 'onBlur',
  },
  productURL: {
    rules: [
      { required: true, message: 'Please input product url!' },
      {
        type: 'url',
        message: 'URL is invalid.',
      },
    ],
    validateTrigger: 'onBlur',
  },
  productUniqueId: { rules: [{ required: false }] },
  matchType: { rules: [{ required: true, message: 'Please select match type!' }], validateTrigger: 'onBlur' },
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

export const AddMatchForm: React.FC<AddMatchFormProps> = ({
  visible,
  form,
  loading,
  competitors,
  error,
  onSubmit,
}: AddMatchFormProps) => {
  const { getFieldDecorator, getFieldsError, getFieldsValue, isFieldsTouched } = form;
  const disableSubmit =
    hasErrors(getFieldsError()) ||
    (isFieldsTouched() && hasNoSetupRequiredFields(getFieldsValue())) ||
    !isFieldsTouched() ||
    loading;

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((err, values: AddMatchRequest) => {
      if (!err) {
        if (onSubmit) {
          let states = values.ownerId.split('-')
          values.ownerId = states[0];
          onSubmit(values);
        }
      }
    });
    return false;
  };

  React.useEffect(() => {
    if (!visible) {
      form.resetFields();
    }
  }, [form, visible]);

  const productUrlSuffix = (
    <Tooltip title="ex: https://www.site.com/category/1002343" overlayClassName={styles.productUrlTooltip}>
      <FontAwesomeIcon icon={['fal', 'info-circle']} size={'1x'} className={styles.example} />
    </Tooltip>
  );
  const productUniqueIdSuffix = (
    <Tooltip title="ex: 1002343">
      <FontAwesomeIcon icon={['fal', 'info-circle']} size={'1x'} className={styles.example} />
    </Tooltip>
  );
  const [, setState] = useState('')
  const searchAddMatch = (state:string) => { 
    setState(state);
  };

  
  return (
    <Form onSubmit={handleSubmit} className={styles.form}>
      {error && <Alert message={error} type="error" showIcon />}
      <Spin spinning={loading}>
        <Form.Item className={styles.form_item}>
          {getFieldDecorator(
            'ownerId',
            formConfig.state
          )(
            <TreeSelect            
        style={{ width: '100%' }}
        dropdownStyle={{ maxHeight: 300, overflow: 'auto', lineHeight:'20px', margin:'0px' }}
        placeholder="Select Site"
        allowClear
        showSearch={true}
        treeDefaultExpandAll={false}
        onChange={searchAddMatch}
        searchPlaceholder={'Select Site' }
        autoClearSearchValue
        treeIcon={false}
        treeCheckable={false}
        treeCheckStrictly={false}       
        dropdownClassName={styles.addmatchSearch}
        
      >
        {competitors &&
                competitors.map(
                  (competitorOwner: Competitor): React.ReactNode => {
                    return (                      
                      <TreeNode  
                      value={competitorOwner.ownerId + "-" + competitorOwner.ownerName} 
                      title={competitorOwner.ownerName} 
                      key={`owner_${competitorOwner.ownerName}`}
                      style={{margin:'0px', width:'auto', lineHeight:'25px'}}
                      />                                                              
                    );
                  }
                )}
      </TreeSelect>
            
          )}
        </Form.Item>
        <Form.Item className={clsx(styles.form_item, styles.product_url)}>
          {getFieldDecorator(
            'productURL',
            formConfig.productURL
          )(<Input placeholder="Product URL" suffix={productUrlSuffix} />)}
        </Form.Item>
        <Form.Item className={clsx(styles.form_item, styles.productUniqueId)}>
          {getFieldDecorator(
            'productUniqueId',
            formConfig.productUniqueId
          )(<Input placeholder="Product Unique ID" suffix={productUniqueIdSuffix} />)}
        </Form.Item>
        <Form.Item className={styles.form_item}>
          {getFieldDecorator(
            'matchType',
            formConfig.matchType
          )(
            <Select placeholder="Select Match Type">
              {matchTypes.map(
                (type: string): React.ReactNode => {
                  return (
                    <Option value={type} key={`match_type_${type}`}>
                      {MATCH_TYPE[type as keyof typeof MATCH_TYPE]}
                    </Option>
                  );
                }
              )}
            </Select>
          )}
        </Form.Item>
        <Form.Item className={styles.form_buttons_bar}>
          <Button
            className={styles.clear_button}
            onClick={(): void => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
          <Button type="primary" htmlType="submit" disabled={disableSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Spin>
    </Form>
  );
};

const WrappedAddMatchForm = Form.create<AddMatchFormProps>({ name: 'add_match' })(AddMatchForm);
export default WrappedAddMatchForm;
