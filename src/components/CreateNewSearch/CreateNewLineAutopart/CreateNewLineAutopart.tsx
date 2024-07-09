import React, { SyntheticEvent, useEffect, useState } from 'react';
import styles from 'src/components/CreateNewSearch/CreateNewLineItem/CreateNewLineItem.module.less';
import { Button, Col, Form, Input, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import SelectSite from 'src/components/CreateNewSearch/SelectSite';
import { SelectValue } from 'antd/lib/select';
import FormFieldWrapper from 'src/components/CreateNewSearch/FormFieldWrapper';
import CreateAutopartAdvancedOptions from './CreateAutopartAdvancedOptions';
import CreateAutopartSearchType from './CreateAutopartSearchType';
import CreateAutopartRegion from './CreateAutopartRegion';
import CreateAutopartBookmark from './CreateAutopartBookmark';
import CreateAutopartInputValues from './CreateAutopartInputValues';
import { useApplicationParams } from 'src/api/applicationParams';
import Spin from 'src/components/common/Spin';
import { useCreateAutopartJobSearch } from 'src/api/autopartJobSearch';
import CreateAutopartCategories from './CreateAutopartCategories';

type CreateNewLineAutopartProps = FormComponentProps & {
  appId: string;
  vertical: string;
  searchName?: string | undefined;
  jobId?: number;
};

type FormConfig = {
  [field: string]: GetFieldDecoratorOptions;
};

const hasErrors = (fieldsError: Record<string, string[] | undefined>): boolean => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};

const { TextArea } = Input;

const getApplicationType = (type: string) => {
  return type.toLowerCase().replace(' ', '_');
};

export const CreateNewLineAutopart: React.FC<CreateNewLineAutopartProps> = ({
  form,
  appId,
  vertical,
  searchName,
  jobId,
}: CreateNewLineAutopartProps) => {
  const [loading, { isAutopartsScript, enableYMME }] = useApplicationParams(appId);
  const [searchType, setSearchType] = useState('keyword_url');
  const [site, setSite] = useState<any>('');
  const [region, setRegion] = useState<string>('');
  const [category, setCategory] = useState('');
  const [inputValues, setInputValues] = useState<any>(null);
  const [autopartData, setAutopartData] = React.useState(undefined);
  useCreateAutopartJobSearch(autopartData);
  const { getFieldDecorator, getFieldsError, getFieldsValue, setFieldsValue, getFieldValue } = form;

  useEffect(() => {
    setSite(undefined);
    setRegion('');
    form.setFieldsValue({
      sites: undefined,
      year: undefined,
      model: undefined,
      make: undefined,
      engine: undefined,
      bookmark: undefined,
    });
  }, [searchType]);

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
  const disableSubmit = hasErrors(getFieldsError()) || !site;
  const onSiteChange = (value: SelectValue) => {
    form.setFieldsValue({
      sites: value,
      year: undefined,
      model: undefined,
      make: undefined,
      engine: undefined,
      bookmark: undefined,
    });
    setSite(value);
    return;
  };

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((error: any, values: any) => {
      if (!error) {
        let transformData = {
          ...values,
        };
        if (region) {
          transformData.region = region.replace(/;/g, ',');
        }
        if (inputValues) {
          transformData = {
            ...transformData,
            ...inputValues,
          };
        }
        if (!isAutopartsScript) {
          if (transformData.category) {
            transformData = {
              ...transformData,
              type: 'Keyword/URL',
            };
          } 
        } else {
          if (values.keyword) {
            transformData = {
              ...transformData,
              type: 'Keyword/URL',
            };
          }
          if (values.bookmark) {
            transformData = {
              ...transformData,
              type: 'Bookmark',
            };
          }
          if (
            searchType === 'category crawl' ||
            searchType === 'shallow' ||
            searchType === 'product pull' ||
            searchType === 'spider' ||
            searchType === 'fitment spider'
          ) {
            console.log(category);
            transformData = {
              ...transformData,
              category: category ? category : null,
              type: searchType
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' '),
            };
          }
        }
        setAutopartData(transformData);
      }
    });
    return false;
  };

  return (
    <div className="create_new_client_form_wrapper">
      <Spin spinning={loading}>
        <Form hideRequiredMark>
          <Row>
            <Col span={16} offset={4}>
              <Form.Item>
                {getFieldDecorator('jobId', formConfig.jobId)(<Input type="hidden" placeholder="Please enter jobId" />)}
              </Form.Item>
              <FormFieldWrapper
                label={<h6>Search Name</h6>}
                content={getFieldDecorator(
                  'searchName',
                  formConfig.searchName
                )(<Input type="text" placeholder="Please enter Search Name" className={styles.readOnly} disabled />)}
              />
              <FormFieldWrapper
                label={<h6>Vertical</h6>}
                content={getFieldDecorator(
                  'vertical',
                  formConfig.vertical
                )(<Input type="text" placeholder="Please enter Vertical" className={styles.readOnly} disabled />)}
              />
              {isAutopartsScript && (
                <CreateAutopartSearchType
                  getFieldDecorator={getFieldDecorator}
                  setSearchType={setSearchType}
                  appId={appId}
                />
              )}
              <SelectSite
                vertical={appId}
                isSingle={true}
                getFieldDecorator={getFieldDecorator}
                onSiteChange={onSiteChange}
                appType={getApplicationType(searchType)}
              />
              {isAutopartsScript && searchType === 'keyword_url' && (
                <FormFieldWrapper
                  label={
                    <h6>
                      Keyword/URL
                      <span>One per Line</span>
                    </h6>
                  }
                  content={getFieldDecorator(
                    'keyword',
                    {}
                  )(<TextArea rows={3} placeholder={'Please enter Keyword/URL'} />)}
                />
              )}
              {isAutopartsScript && searchType === 'bookmark' && (
                <CreateAutopartBookmark site={site} vertical={appId} getFieldDecorator={getFieldDecorator} />
              )}
              {isAutopartsScript && (
                <CreateAutopartCategories
                  vertical={appId}
                  searchType={searchType}
                  site={site}
                  category={category}
                  setCategory={setCategory}
                />
              )}
              {isAutopartsScript && (
                <CreateAutopartRegion vertical={appId} site={site} onUpdate={setRegion} searchType={searchType} />
              )}
            </Col>
          </Row>
          {!isAutopartsScript && (
            <CreateAutopartInputValues
              vertical={appId}
              getFieldDecorator={getFieldDecorator}
              enableYMME={enableYMME}
              getFieldValue={getFieldValue}
              getFieldsValue={getFieldsValue}
              setFieldsValue={setFieldsValue}
              site={site}
              onUpdate={setInputValues}
              searchType={searchType}
            />
          )}
          {isAutopartsScript && (
            <CreateAutopartAdvancedOptions
              vertical={appId}
              getFieldDecorator={getFieldDecorator}
              enableYMME={enableYMME}
              searchType={searchType}
              getFieldValue={getFieldValue}
              getFieldsValue={getFieldsValue}
              setFieldsValue={setFieldsValue}
            />
          )}
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
      </Spin>
    </div>
  );
};

const WrappedCreateNewLineAutopart = Form.create<CreateNewLineAutopartProps>({ name: 'name' })(CreateNewLineAutopart);
export default WrappedCreateNewLineAutopart;
