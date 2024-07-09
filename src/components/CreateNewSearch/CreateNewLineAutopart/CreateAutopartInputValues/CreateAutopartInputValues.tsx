import React, { useEffect, useState } from 'react';
import CreateAutopartAdvancedOptions from 'src/components/CreateNewSearch/CreateNewLineAutopart/CreateAutopartAdvancedOptions';
import CreateSearchByCategory from 'src/components/CreateNewSearch/CreateNewLineAutopart/CreateAutopartInputValues/CreateSearchByCategory';
import CreateSearchByKeyword from 'src/components/CreateNewSearch/CreateNewLineAutopart/CreateAutopartInputValues/CreateSearchByKeyword';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { Button, Col, Row, Tabs } from 'antd';
import styles from './CreateAutopartInputValues.module.less';
import TextArea from 'antd/lib/input/TextArea';

const { TabPane } = Tabs;

type CreateAutopartInputValuesProps = {
  getFieldDecorator<T extends Record<string | number | symbol, string>>(
    id: keyof T,
    options?: GetFieldDecoratorOptions
  ): (node: React.ReactNode) => React.ReactNode;
  setFieldsValue: (object: object, callback?: Function) => void;
  getFieldValue: (fieldName: string) => any;
  getFieldsValue: (fieldNames?: Array<string>) => { [key: string]: any };
  enableYMME: boolean;
  vertical: string;
  site: string;
  onUpdate: (values: any) => void;
  searchType: string;
};

const getFieldValues = (text: string, selectedTabIndex: string) => {
  const results: string[] = Array(5);
  text
    .replace(/\n/g, '::')
    .split('::')
    .forEach((item, i) => {
      const trimString = item.trim();
      if (trimString) {
        results[i] = results[i] ? `${results[i]},${trimString}` : trimString;
      }
    });
  if (selectedTabIndex === '2') {
    return {
      category: results[0],
      zipCode: results[1],
      reference: results[2],
    };
  }
  return {
    sitePartNumber: results[0],
    manufacturerPartNumber: results[1],
    manufacturer: results[2],
    zipCode: results[3],
    reference: results[4],
  };
};

const CreateAutopartInputValues: React.FC<CreateAutopartInputValuesProps> = ({
  vertical,
  getFieldDecorator,
  enableYMME,
  setFieldsValue,
  getFieldValue,
  getFieldsValue,
  site,
  onUpdate,
  searchType,
}: CreateAutopartInputValuesProps) => {
  const [checkboxSelection, setCheckboxSelection] = useState('1');
  const [fieldsResult, setFieldsResult] = useState('');
  const [category, setCategory] = useState('');
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

  useEffect(() => {
    setFieldsResult('');
    onUpdate({});
  }, [searchType]);

  const onChangeTab = (activeKey: string) => {
    setCheckboxSelection(activeKey);
    setFieldsResult('');
    onUpdate({});
  };

  const isAddButtonDisabled = () => {
    if (fieldsResult.length > 0) {
      return true;
    }
    if (
      checkboxSelection === '1' &&
      !Object.values(getFieldsValue(['sitePartNumber', 'manufacturerPartNumber', 'manufacturer'])).join('')
    ) {
      return true;
    }
  };

  const onAddInputValues = () => {
    let result = Object.values(
      getFieldsValue(['sitePartNumber', 'manufacturerPartNumber', 'manufacturer', 'zipCode', 'reference'])
    ).join('\n');

    if (checkboxSelection === '2') {
      result = [category]
        .concat(Object.values(getFieldsValue(['zipCode', 'reference'])))
        .filter(item => item)
        .join('\n');
    }
    if (fieldsResult) {
      result = fieldsResult + `\n${result}`;
    }

    setFieldsResult(result);
    setFieldsValue({
      ...getFieldsValue(),
      sitePartNumber: '',
      manufacturerPartNumber: '',
      manufacturer: '',
      reference: '',
      zipCode: '',
    });
    setCategory('');
    onUpdate(getFieldValues(result, checkboxSelection));
    setCheckedKeys([]);
  };

  return (
    <Row>
      <Col span={16} offset={4}>
        <div className={'ant-row ant-form-item'}>
          <div className="ant-col ant-col-9 ant-form-item-label">
            <label>
              <h6>Input Values</h6>
            </label>
          </div>
          <div className={`ant-col ant-col-15 ant-form-item-control-wrapper ${styles.autopart_tabs}`}>
            <Tabs defaultActiveKey="1" type="card" tabPosition="top" className="travelTab" onChange={onChangeTab}>
              <TabPane tab="Search by Keyword" key="1" className="travelTab2">
                <CreateSearchByKeyword getFieldDecorator={getFieldDecorator} />
              </TabPane>
              <TabPane tab="Search by Category" key="2" className="travelTab2">
                <CreateSearchByCategory
                  getFieldDecorator={getFieldDecorator}
                  setCategory={setCategory}
                  site={site}
                  category={category}
                  checkedKeys={checkedKeys}
                  setCheckedKeys={setCheckedKeys}
                  vertical={vertical}
                  setFieldsResult={setFieldsResult}
                />
              </TabPane>
            </Tabs>
            <div className={styles.autopart_fields_wrapper}>
              <Row>
                <CreateAutopartAdvancedOptions
                  vertical={vertical}
                  getFieldDecorator={getFieldDecorator}
                  enableYMME={enableYMME}
                  getFieldValue={getFieldValue}
                  getFieldsValue={getFieldsValue}
                  setFieldsValue={setFieldsValue}
                  layout={{ span: 24 }}
                  isDivider={false}
                />
              </Row>
              <div className={styles.autopart_button_wrapper}>
                <Button type="primary" onClick={onAddInputValues} disabled={isAddButtonDisabled()}>
                  Add
                </Button>
              </div>
              <TextArea
                rows={3}
                value={fieldsResult}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setFieldsResult(event.target.value);
                  onUpdate(getFieldValues(event.target.value, checkboxSelection));
                }}
              />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default CreateAutopartInputValues;
