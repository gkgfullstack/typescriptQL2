import React, { ReactElement, useState, useEffect } from 'react';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';
import { useGetAllSiteList } from 'src/api/configureSiteList';

const { OptGroup, Option } = Select;

const getProductTypes = (sitesOptions: any) => {
  const newSchemas: string[] = [];

  sitesOptions.forEach((site: any) => {
    if (site.schemaName && newSchemas.indexOf(site.schemaName) === -1) {
      newSchemas.push(site.schemaName);
    }
  });
  newSchemas.sort();
  newSchemas.push('No Schema');

  return newSchemas;
};

const onSearchFilter = (input: string, option: ReactElement) => {
  const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
  return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

const getOptions = (schema: string, sitesOptions: any) => {
  const sites = sitesOptions.filter((site: any) => {
    if (schema === 'No Schema') {
      return !site.schemaName;
    }
    return site.schemaName === schema;
  });

  return sites.map(
    (option: any, i: number): React.ReactNode => {
      const optionName =
        !option.dataSource || option.dataSource === 'Scraped' ? option.name : `${option.name} ${option.dataSource}`;
      return (
        <Option
          style={{ whiteSpace: 'normal' }}
          value={`${option.schemaName}-${option.ID}`}
          key={`site-name-${option.name}-${i}`}
        >
          {optionName}
        </Option>
      );
    }
  );
};

type DiagnosticSiteFilterProps = {
  setParams: (name: string, value: string) => void;
  schema: string | undefined;
  loading?: boolean;
};

const DiagnosticSiteFilter: React.FC<DiagnosticSiteFilterProps> = ({ schema, setParams, loading }) => {
  const [schemaNames, setSchemaNames] = useState<any>([]);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [sitesOptions] = useGetAllSiteList(schema);

  useEffect(() => {
    setSelectedItems([]);
    setParams('sites', '');
    if (sitesOptions.length > 0) {
      setSchemaNames(getProductTypes(sitesOptions));
    }
    if (schema === '') {
      setSchemaNames([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schema, sitesOptions]);

  const onSiteChange = (value: SelectValue) => {
    const newSite: string = value ? value.toString() : '';
    setParams('sites', newSite);
    setSelectedItems(value);
  };

  return (
    <Select
      mode="multiple"
      showArrow={true}
      placeholder="Select Site"
      onChange={onSiteChange}
      value={selectedItems}
      allowClear
      showSearch
      filterOption={onSearchFilter}
      loading={loading}
      dropdownStyle={loading ? { display: 'none' } : {}}
      maxTagCount={1}
    >
      {schemaNames &&
        schemaNames.map(
          (option: any, i: number): React.ReactNode => {
            return (
              <OptGroup label={option} key={`product-type-${option.name}-${i}`}>
                {getOptions(option, sitesOptions)}
              </OptGroup>
            );
          }
        )}
    </Select>
  );
};

export default DiagnosticSiteFilter;
