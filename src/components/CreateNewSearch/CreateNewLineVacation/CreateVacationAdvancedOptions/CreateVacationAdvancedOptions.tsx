import React from 'react';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { Row, Col, Collapse, Form, Checkbox, Divider } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import styles from 'src/components/CreateNewSearch/CreateNewLineItem/CreateNewLineItem.module.less';
import FormFieldWrapper from 'src/components/CreateNewSearch/FormFieldWrapper';
import CreateVacationPropertyName from './CreateVacationPropertyName/CreateVacationPropertyName';
import FormSelectWrapper from 'src/components/CreateNewSearch/FormSelectWrapper';
import { defaultCheckedList, dayOptions, options, timeSlots } from './CreateVacationAdvancedOptions.config';
import {
  CheckInDOWTooltip,
  CheckOutDOWTooltip,
} from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';
import GeoFieldWrapper from 'src/components/CreateNewSearch/GeoFieldWrapper';

const { Panel } = Collapse;
const CheckboxGroup = Checkbox.Group;

type CreateVacationAdvancedOptionsProps = {
  vertical: string;
  getFieldDecorator<T extends Record<string | number | symbol, string>>(
    id: keyof T,
    options?: GetFieldDecoratorOptions
  ): (node: React.ReactNode) => React.ReactNode;
  setFieldsValue: (object: object, callback?: Function) => void;
  onUpdatePropertyName: (value: string) => void;
  setDepartDaysOfWeek: (daysOfWeek: string) => void;
  setReturnDaysOfWeek: (daysOfWeek: string) => void;
};

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 15 },
};

export const CreateVacationAdvancedOptions: React.FC<CreateVacationAdvancedOptionsProps> = ({
  vertical,
  getFieldDecorator,
  setFieldsValue,
  onUpdatePropertyName,
  setDepartDaysOfWeek,
  setReturnDaysOfWeek,
}: CreateVacationAdvancedOptionsProps) => {
  const [departureCheckboxState, setDepartureCheckboxState] = React.useState({
    checkedList: defaultCheckedList,
    indeterminate: false,
    checkAll: true,
  });

  const [returnCheckboxState, setReturnCheckboxState] = React.useState({
    checkedList: defaultCheckedList,
    indeterminate: false,
    checkAll: true,
  });

  const onChangeDepartDays = (checkedList: CheckboxValueType[]) => {
    setDepartureCheckboxState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < dayOptions.length,
      checkAll: checkedList.length === dayOptions.length,
    });
    setDepartDaysOfWeek(checkedList.join(','));
  };

  const onCheckAllDepartChange = (e: CheckboxChangeEvent) => {
    const daysOfWeek = e.target.checked ? dayOptions : [];
    setDepartureCheckboxState({
      checkedList: daysOfWeek,
      indeterminate: false,
      checkAll: e.target.checked,
    });
    setDepartDaysOfWeek(daysOfWeek.join(','));
  };

  const onChangeReturnDays = (checkedList: CheckboxValueType[]) => {
    setReturnCheckboxState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < dayOptions.length,
      checkAll: checkedList.length === dayOptions.length,
    });
    setReturnDaysOfWeek(checkedList.join(','));
  };

  const onCheckAllReturnChange = (e: CheckboxChangeEvent) => {
    const daysOfWeek = e.target.checked ? dayOptions : [];
    setReturnCheckboxState({
      checkedList: daysOfWeek,
      indeterminate: false,
      checkAll: e.target.checked,
    });
    setReturnDaysOfWeek(daysOfWeek.join(','));
  };

  const addSearchResult = (searchResult: string) => {
    onUpdatePropertyName(searchResult);
  };

  const onChangeDepartTime = (value: SelectValue) => {
    setFieldsValue({ departTime: value });
    return;
  };

  const onChangeReturnTime = (value: SelectValue) => {
    setFieldsValue({ returnTime: value });
    return;
  };

  return (
    <Row>
      <Col span={16} offset={4}>
        <Collapse defaultActiveKey={['0']} expandIconPosition="right" bordered={false}>
          <Panel header={'Advanced options'} key={'1'} className={'advancedOptions'}>
            <Row>
              {options.length &&
                options.map(option => {
                  switch (option.name) {
                    case 'departTime':
                      return (
                        <FormSelectWrapper
                          key={`advanced-option-${option.name}`}
                          name={option.name}
                          getFieldDecorator={getFieldDecorator}
                          label={option.label}
                          placeholder={'Depart Time'}
                          options={timeSlots}
                          onChange={onChangeDepartTime}
                        />
                      );
                    case 'returnTime':
                      return (
                        <FormSelectWrapper
                          key={`advanced-option-${option.name}`}
                          name={option.name}
                          getFieldDecorator={getFieldDecorator}
                          label={option.label}
                          placeholder={'Return Time'}
                          options={timeSlots}
                          onChange={onChangeReturnTime}
                        />
                      );
                    case 'propertyName':
                      return (
                        <CreateVacationPropertyName key={option.name} label={option.label} onAdd={addSearchResult} />
                      );
                    default:
                      return (
                        <FormFieldWrapper
                          key={`advanced-option-${option.name}`}
                          label={option.label}
                          content={getFieldDecorator(option.name, {})(option.content)}
                        />
                      );
                  }
                })}
              <GeoFieldWrapper getFieldDecorator={getFieldDecorator} vertical={vertical} />
              <Divider className="dividerCustom" />
              <Col span={24}>
                <Form.Item
                  {...layout}
                  label={
                    <h6 className="tooltiplayout">
                      Limit departure to these days of week <CheckInDOWTooltip />
                      <span>(optional)</span>
                    </h6>
                  }
                >
                  <div className={styles.create_new_line_checkboxes}>
                    <Checkbox
                      indeterminate={departureCheckboxState.indeterminate}
                      onChange={onCheckAllDepartChange}
                      checked={departureCheckboxState.checkAll}
                    >
                      All
                    </Checkbox>
                    <CheckboxGroup
                      options={dayOptions}
                      value={departureCheckboxState.checkedList}
                      onChange={onChangeDepartDays}
                    />
                  </div>
                </Form.Item>
                <Divider className="dividerCustom" />
                <Form.Item
                  {...layout}
                  label={
                    <h6 className="tooltiplayout">
                      Limit return to these days of week <CheckOutDOWTooltip />
                      <span>(optional)</span>
                    </h6>
                  }
                >
                  <div className={styles.create_new_line_checkboxes}>
                    <Checkbox
                      indeterminate={returnCheckboxState.indeterminate}
                      onChange={onCheckAllReturnChange}
                      checked={returnCheckboxState.checkAll}
                    >
                      All
                    </Checkbox>
                    <CheckboxGroup
                      options={dayOptions}
                      value={returnCheckboxState.checkedList}
                      onChange={onChangeReturnDays}
                    />
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};
export default CreateVacationAdvancedOptions;
