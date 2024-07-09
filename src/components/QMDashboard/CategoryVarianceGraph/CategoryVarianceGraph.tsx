import React , { useState } from 'react';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import { MirrorChart } from 'src/components/common/MirrorChart';
import styles from './CategoryVarianceGraph.module.less';
import { useCategoryVarianceFetch } from './hooks';
import { Alert } from 'antd';
import Spin from 'src/components/common/Spin';
import routes from 'src/routes';
import { Button } from 'antd';

import useSourceOwnerId from 'src/hooks/useSourceOwnerId';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
export type CategoryVarianceChart = {
  id: number;
  categoryName: string;
  value: number;
  start: string;
};
let loadMoreLabel =  'Show More';
let default_length= 15;


type CategoryVarianceGraphProps = {};

const CategoryVarianceGraph: React.FC<CategoryVarianceGraphProps> = (): JSX.Element => {
  const sourceOwnerId = useSourceOwnerId();
  const { matchTypeFilter, region, priceType} = useQueryUrlParams();

  let initialMatchTypeFilterIds:string = matchTypeFilter  !== undefined ? matchTypeFilter :"ALL";
  let initialRegionIds:string = region  !== undefined ? region :"-1";
  let initialPriceTypeIds:string = priceType  !== undefined ? priceType :"1";
  const setSearch = useQueryUrlParamsDispatch();
  let { data, loading, error } = useCategoryVarianceFetch(sourceOwnerId, initialMatchTypeFilterIds, initialRegionIds, initialPriceTypeIds);
  let [pdata, setPdata] = useState<CategoryVarianceChart[] | null>(data);
  const onClick = (elem: CategoryVarianceChart): void => {
    setSearch(
      {
        category: [elem.id],
        sourceOwnerId: sourceOwnerId,
      },
      routes.productFinder
    );
    
  };
  React.useEffect(() => {
    if (data !== null ) {
      setPdata(data.slice(0,default_length));
    }
    loadMoreLabel = 'Show More';
  }, [data]);
  
  const showMore = (): void => {
    if (data!== null ) {
      if(pdata?.length===default_length){
        setPdata(data);
        loadMoreLabel = 'Show Less';
      }else{
        setPdata(data.slice(0,default_length));
        loadMoreLabel = 'Show More';
      }
    }
    
  };
  //data.length
  const fetchLoading = loading && data === null;
  return (
    <div className={styles.category_variance_wrapper}>
      {error && (
        <Alert
          message="Error"
          description="An error
          has occurred when trying to get price distribution! Please try again later!"
          type="error"
          showIcon
        />
      )}
      {fetchLoading ? (
        <div className={styles.category_variance_loader}>
          <Spin spinning={loading} />
        </div>
      ) : (
        data !== null && (
          
            <div className={styles.category_variance_chart}>
             <MirrorChart data={pdata} id={'category_variance_chart'}  onChange={onClick}/>
             {data.length > default_length && (
            <div className={styles.buttons_bar}>
              <Button type={'link'} onClick={showMore} style = {{margin:'0px auto',display:'table'}}>
                {loadMoreLabel}
              </Button>
            </div>
             )}
            </div>
            
        )
      )}
    </div>
  );
};

export default CategoryVarianceGraph;
