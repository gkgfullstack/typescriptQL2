import React from 'react';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import { Select } from 'antd';
import styles from './VarianceFilter.module.less';
import { useCustomFilterMatches } from '../hooks';
import useSourceOwnerId from 'src/hooks/useSourceOwnerId';
import { useProductDetailsStateContext } from 'src/stateProviders/useProductDetailsStateContext';
import ProductFinderQueryParams from 'src/types/ProductFinderQueryParams';

const { Option } = Select;

export type SelectProps = {
  onOptionsSelected: Function;
  keyName: string;
  label?: string;
  short?: boolean;
  onChange: Function;
  options?: any;
  defaultOptions?: string;
};

const VarianceFilter: React.FC<SelectProps> = ({
  defaultOptions,
  //onChange,
  onOptionsSelected,
  keyName
}: SelectProps) => {
  const sourceOwnerId = useSourceOwnerId(); 
  const {productId}:any = useProductDetailsStateContext();
  const { data, loading, error } = useCustomFilterMatches(sourceOwnerId, productId);
  const setQuery = useQueryUrlParamsDispatch<ProductFinderQueryParams>();
  //const [option, setOption] = useState(defaultOptions);
  const responseLoaded = !loading && (data || error);
  // useEffect(() => {
  //   if (JSON.stringify(defaultOptions) !== JSON.stringify(option)) {
  //     setOption(defaultOptions);
  //   }
  // }, [defaultOptions, option]);
  // const handleOptionsChange = (option: string): void => {
  //   setOption(option);
  //   if(option){
  //     onChange('variance', option);
  //     setQuery({ variance: option });
  //   }else{
  //     onChange('variance', option);
  //     setQuery({ variance: option });
  //   }
  // }; 



  const handleOptionsChange = (option: string): void => {
    let currSelectedOptions = [] as Array<string>;    
    setQuery({
      [keyName]: option,
    } as ProductFinderQueryParams);
    onOptionsSelected(keyName, currSelectedOptions);
  };
  
  return (<div className={styles.matches_filter_wrapper}>dsafasdfdsaf
     {responseLoaded ?(      
      <Select 
      defaultValue={defaultOptions}
      placeholder="Select Site" 
      style={{ width: '100%', padding: '0px 5px' }} 
      onChange={handleOptionsChange}
      >
        {data &&
          data.variance.map(
            (competitorOwner: any): React.ReactNode => (
              <Option key={`owner_${competitorOwner.Id}`} value={competitorOwner.Id}>{competitorOwner.label}</Option>
            ))}
      </Select>
    ) : null}      
      </div>
  );
};
export default VarianceFilter;
