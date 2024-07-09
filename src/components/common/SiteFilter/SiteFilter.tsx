import React, { ReactElement, useState, useEffect } from 'react';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';
import { useGetAllSiteList } from 'src/api/configureSiteList';

const { OptGroup, Option } = Select;

const getProductTypes = (sitesOptions: any) => {
  const newProductTypes: string[] = [];

  sitesOptions.forEach((site: any) => {
    if (site.productType && newProductTypes.indexOf(site.productType) === -1) {
      newProductTypes.push(site.productType);
    }
  });
  newProductTypes.sort();
  newProductTypes.push('No Product Type');

  return newProductTypes;
};

const onSearchFilter = (input: string, option: ReactElement) => {
  const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
  return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

const getOptions = (productType: string, sitesOptions: any) => {
  const sites = sitesOptions.filter((site: any) => {
    if (productType === 'No Product Type') {
      return !site.productType;
    }
    return site.productType === productType;
  });

  return sites.map(
    (option: any, i: number): React.ReactNode => {
      const optionName =
        !option.dataSource || option.dataSource === 'Scraped' ? option.name : `${option.name} ${option.dataSource}`;
      return (
        <Option style={{ whiteSpace: 'normal' }} value={option.ID} key={`site-name-${option.name}-${i}`}>
          {optionName}
        </Option>
      );
    }
  );
};

type SiteFilterProps = {
  setParams: (name: string, value: string) => void;
  schema: string | undefined;
  multiple?: boolean;
  selectedSites?: string[] | number[];
};

const SiteFilter: React.FC<SiteFilterProps> = ({ schema, setParams, multiple, selectedSites }) => {
  const [initialState, setInitialState] = useState<any>(false);
  const [productTypes, setProductTypes] = useState<any>([]);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [sitesOptions] = useGetAllSiteList(schema);

  useEffect(() => {
    setSelectedItems([]);
    setParams('site', '');
    if (sitesOptions.length > 0) {
      setProductTypes(getProductTypes(sitesOptions));
    }
    if (schema === '') {
      setProductTypes([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schema, sitesOptions]);

  useEffect(() => {
    if (sitesOptions.length > 0 && selectedSites && selectedSites.length > 0 && !initialState) {
      setInitialState(true);
      if (sitesOptions.filter((site: any) => site.ID === selectedSites.join()).length > 0) {
        setSelectedItems(selectedSites);
        setParams('site', selectedSites.toString());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sitesOptions, selectedSites]);

  const onSiteChange = (value: SelectValue) => {
    const newSite: string = value ? value.toString() : '';
    setParams('site', newSite);
    setSelectedItems(value);
  };

  return (
    <Select
      showArrow={true}
      mode={multiple ? 'multiple' : 'default'}
      placeholder="Select Site"
      onChange={onSiteChange}
      value={selectedItems}
      allowClear
      showSearch
      filterOption={onSearchFilter}
      maxTagCount={1}
    >
      {productTypes &&
        productTypes.map(
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

export default SiteFilter;
