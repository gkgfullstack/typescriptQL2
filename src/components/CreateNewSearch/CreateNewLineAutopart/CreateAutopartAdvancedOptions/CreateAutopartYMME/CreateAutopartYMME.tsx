import React from 'react';
import FormFieldWrapper from 'src/components/CreateNewSearch/FormFieldWrapper';
import { autopartYMMEOptions } from 'src/components/CreateNewSearch/CreateNewLineAutopart/CreateAutopartAdvancedOptions/CreateAutopartAdvancedOptions.config';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import {
  useGetYearOptionValues,
  useGetMakeOptionValues,
  useGetModelOptionValues,
  useGetEngineOptionValues,
} from 'src/api/AutopartAdvancedOptions';
import { Select } from 'antd';

const { Option } = Select;

type optionsValue = {
  [key: string]: string[] | [];
};
type CreateAutopartYMMEProps = {
  getFieldDecorator<T extends Record<string | number | symbol, string>>(
    id: keyof T,
    options?: GetFieldDecoratorOptions
  ): (node: React.ReactNode) => React.ReactNode;
  setFieldsValue: (object: object, callback?: Function) => void;
  getFieldValue: (fieldName: string) => any;
  getFieldsValue: (fieldNames?: Array<string>) => { [key: string]: any };
  isDivider?: boolean;
  vertical: string;
};

const CreateAutopartYMME: React.FC<CreateAutopartYMMEProps> = ({
  getFieldDecorator,
  setFieldsValue,
  getFieldValue,
  getFieldsValue,
  vertical,
  isDivider = true,
}) => {
  const year = getFieldValue('year');
  const make = getFieldValue('make');
  const model = getFieldValue('model');
  const siteCode = getFieldValue('sites');
  const optionsValueMap: optionsValue = {};
  [optionsValueMap.year] = useGetYearOptionValues(vertical, siteCode);
  [optionsValueMap.make] = useGetMakeOptionValues(vertical, siteCode, year);
  [optionsValueMap.model] = useGetModelOptionValues(vertical, siteCode, year, make);
  [optionsValueMap.engine] = useGetEngineOptionValues(vertical, siteCode, year, make, model);

  const onUpdate = (name: string) => {
    return () => {
      switch (name) {
        case 'year': {
          setFieldsValue({ ...getFieldsValue(), model: undefined, make: undefined, engine: undefined });
          return;
        }
        case 'make': {
          setFieldsValue({ ...getFieldsValue(), model: undefined, engine: undefined });
          return;
        }
        case 'model': {
          setFieldsValue({ ...getFieldsValue(), engine: undefined });
          return;
        }
        default:
          return;
      }
    };
  };

  return (
    <>
      {autopartYMMEOptions &&
        autopartYMMEOptions.map(({ label, name }, i: number) => (
          <FormFieldWrapper
            key={`filter-${name}-${i}`}
            label={label}
            isDivider={isDivider}
            content={getFieldDecorator(
              name,
              {}
            )(
              <Select
                showArrow
                showSearch
                allowClear
                disabled={name !== 'year' && optionsValueMap[name].length === 0}
                onChange={onUpdate(name)}
                placeholder={`Select ${name.toUpperCase()}`}
              >
                {(optionsValueMap[name] as string[]).map(
                  (option: string, i: number): React.ReactNode => {
                    return (
                      <Option key={`filter-${name}-${option}-${i}`} value={option}>
                        {option}
                      </Option>
                    );
                  }
                )}
              </Select>
            )}
          />
        ))}
    </>
  );
};

export default CreateAutopartYMME;
