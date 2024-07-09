import React, { ReactElement } from 'react';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';
import { useOptionsFiltersFetching } from '../hooks';
import Accordion from 'src/components/common/Accordion';
import styles from './RegionFilter.module.less';
import { Alert } from 'antd';
import Spin from 'src/components/common/Spin';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';

const { OptGroup, Option } = Select;

const onSearchFilter = (input: string, option: ReactElement) => {
  const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
  return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

type SiteFilterProps = {
  onChange: Function;
  sourceOwnerId: any;
  selectedSites: number;
  header?: string;
  selectedItems?:any;
  options?:any;
  defaultValue?: Array<SelectValue>;
};

const RegionFilter: React.FC<SiteFilterProps> = ({
  onChange,
  sourceOwnerId,
  selectedSites,
  header = 'Region',
  options,
}) => {
  const { data: dataRegionRes, loading, error } = useOptionsFiltersFetching(sourceOwnerId);
  const setQuery = useQueryUrlParamsDispatch();
  const responseLoaded = !loading && (dataRegionRes || error);
  const initialBrands = dataRegionRes && dataRegionRes.Regions;
  const sitesOptions = initialBrands ? (initialBrands || []).map((type) => ({ regionGroupName: type.regionGroupName, region: type.region })) : [];
  const [selectedItems, setSelectedItems] = React.useState<SelectValue>(options);
  React.useEffect(() => {
    if (JSON.stringify(selectedSites) !== JSON.stringify(selectedItems)) {
      setSelectedItems(selectedSites);
    }
  }, [selectedSites, selectedItems]);
  const onSiteChange = (value: SelectValue): void => { 
    setQuery({region: value})
    setSelectedItems(value);
    onChange('region', value);
  };

  return (
    <Accordion header={header}>
      <div className={styles.sort_by_wrapper}>
        {loading && (
          <div className={styles.filters_spinner}>
            <Spin spinning={loading} />
          </div>
        )}
        {responseLoaded &&
          (error ? (
            <div className={styles.filters_error}>
              <Alert
                message="An error has occurred when trying to get filter list! Please try again later!"
                type="error"
                showIcon
              />
            </div>
          ) : (
              <Select
                showArrow={true}
                placeholder="Select Region (Default All)"
                onChange={onSiteChange}
                value={selectedItems}
                allowClear
                showSearch
                filterOption={onSearchFilter}
                maxTagCount={1}
                style={{ width: "100%" }}
              >
                {sitesOptions && sitesOptions.length > 0 && sitesOptions.map((e, key) => {
                  return <OptGroup key={key+key+1} label={e.regionGroupName}>                   
                    {e.region.map((project: { value: string; label: React.ReactNode; title:string }) => {
                      return <Option key={`region_${project.value}`+key} value={project.value} title={project.title}>{project.label}</Option>
                    })}
                  </OptGroup>;
                })}
              </Select>))}
      </div>
    </Accordion>
  );
};

export default RegionFilter;
