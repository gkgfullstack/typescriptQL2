import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'antd';
import styles from './CreateDrugInputValues.module.less';
import TextArea from 'antd/lib/input/TextArea';
import ConfigurableFields from 'src/components/CreateNewSearch/CreateNewLineDrug/CreateDrugInputValues/ConfigurableFields';
import UserContex from 'src/services/UserContex';
import moment from 'moment';

type CreateDrugInputValuesProps = {
  fields: any;
};

const CreateDrugInputValues: React.FC<CreateDrugInputValuesProps> = ({ fields }: CreateDrugInputValuesProps) => {
  const [inputValues, setInputValues] = useState([]);
  const [fieldsResult, setFieldsResult] = useState('');
  const dateFormatContext = UserContex.getDateFormat();
  const dateFormat = dateFormatContext;

  useEffect(() => {
    if (fields.length > 0) {
      const transformFields: any = [...fields].map(field => {
        field.value = undefined;
        return field;
      });
      setInputValues(transformFields);
    }
  }, [fields]);

  const onAddInputValues = () => {
    const result = [...inputValues]
      .map((field: any) => {
        return field.fieldType === 'DateField'
          ? field.value
            ? moment(field.value).format(dateFormat)
            : ''
          : field.value;
      })
      .join(', ');
    const transformFields: any = [...fields].map(field => {
      field.value = undefined;
      return field;
    });
    setInputValues(transformFields);
    setFieldsResult(result);
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
          <div className="ant-col ant-col-15 ant-form-item-control-wrapper">
            <div className={styles.drug_input_values_wrapper}>
              <ConfigurableFields fields={inputValues} setInputValues={setInputValues} dateFormat={dateFormat} />
              <div className={styles.drug_input_values_button_wrapper}>
                <Button type="primary" onClick={onAddInputValues} disabled={fieldsResult.length > 0}>
                  Add
                </Button>
              </div>
              <TextArea
                rows={4}
                value={fieldsResult}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setFieldsResult(event.target.value)}
              />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default CreateDrugInputValues;
