import React, { ReactElement, useEffect, useState } from 'react';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';
import { useGetFingerPrint } from 'src/api/fingerPrintFilter';

const { Option } = Select;

type ProductFingerPrintFilterProps = {
  setParams: (name: string, value: string) => void;
  site: string | undefined;
  schema: string | undefined;
};

const ProductFingerPrintFilter: React.FC<ProductFingerPrintFilterProps> = ({ schema, site, setParams }) => {
  const [previousSchema, setPreviousSchema] = useState<string>('');
  const [previousSite, setPreviousSite] = useState<string>('');
  const [fingerPrintOptions] = useGetFingerPrint(schema, site);
  const [values, setValues] = useState<any>(undefined);

  useEffect(() => {
    if (schema !== previousSchema) {
      const newSchema: string = schema ? schema : '';
      setValues(undefined);
      setPreviousSchema(newSchema);
    } else if (site !== previousSite) {
      const newSite: string = site ? site : '';
      setValues(undefined);
      setPreviousSite(newSite);
    }
  }, [previousSchema, schema, previousSite, site]);

  const onSiteChange = (value: SelectValue) => {
    const newSite: string = value ? value.toString() : '';
    setParams('fingerPrint', newSite);
    setValues(value);
  };

  const onSearchFilter = (input: string, option: ReactElement) => {
    const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
    return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <Select
      placeholder="Select Fingerprint"
      value={values}
      onChange={onSiteChange}
      allowClear
      showSearch
      filterOption={onSearchFilter}
    >
      {fingerPrintOptions &&
        fingerPrintOptions.map(
          (option: any, i: number): React.ReactNode => {
            return (
              <Option
                value={option.ID}
                key={`product-site-${option.name}-${i}`}
                style={{ whiteSpace: 'normal' }}
              >
                {option.name}
              </Option>
            );
          }
        )}
    </Select>
  );
};

export default ProductFingerPrintFilter;
