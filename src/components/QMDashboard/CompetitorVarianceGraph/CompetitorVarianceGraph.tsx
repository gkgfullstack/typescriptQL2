import React, { useState } from 'react';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import { MirrorChart } from 'src/components/common/MirrorChart';
import styles from './CompetitorVarianceGraph.module.less';
import { useCompetitorVarianceFetch } from './hooks';
import { Alert } from 'antd';
import Spin from 'src/components/common/Spin';
import routes from 'src/routes';
import useSourceOwnerId from 'src/hooks/useSourceOwnerId';
import { Button } from 'antd';
import VARIANCE_COLORS from 'src/enums/varianceColor';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
export type CompetitorVarianceChart = {
  id: number;
  competitorName: string;
  value: number;
  image:string;
  start: string;
};

const belowColor = VARIANCE_COLORS.negative;
const similarColor = VARIANCE_COLORS.similar;
const aboveColor = VARIANCE_COLORS.positive;


let loadMoreLabel =  'Show More';
let default_length= 15;

type CompetitorVarianceGraphProps = {};

const CompetitorVarianceGraph: React.FC<CompetitorVarianceGraphProps> = (): JSX.Element => {
  const sourceOwnerId = useSourceOwnerId();
  const { matchTypeFilter, region, priceType} = useQueryUrlParams();
  let initialMatchTypeFilterIds:string = matchTypeFilter  !== undefined ? matchTypeFilter :"ALL";
  let initialRegionIds:string = region  !== undefined ? region :"-1";
  let initialPriceTypeIds:string = priceType  !== undefined ? priceType :"1";
  const setSearch = useQueryUrlParamsDispatch();
  const { data, loading, error } = useCompetitorVarianceFetch(sourceOwnerId, initialMatchTypeFilterIds, initialRegionIds, initialPriceTypeIds);
  let [pdata, setPdata] = useState<CompetitorVarianceChart[] | null>(data); 
  const onClick = (elem: CompetitorVarianceChart): void => { 
    setSearch(
      {
        site: [elem.id],
        sourceOwnerId: sourceOwnerId,
      },
      routes.productFinder
    );
  };
  React.useEffect(() => {
    if (data!== null ) {
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
    <div className={styles.competitor_variance_wrapper}>
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
        <div className={styles.competitor_variance_loader}>
          <Spin spinning={loading} />
        </div>
      ) : (
        data !== null && (          
            <div className={styles.competitor_variance_chart}>
             <MirrorChart data={pdata} id={'competitor_variance_chart'}  onChange={onClick}/>             
            <div className={styles.buttons_bar}>
              <Button type={'link'} onClick={showMore} style = {{margin:'0px auto',display:'table'}}>
                {loadMoreLabel}
              </Button>
            </div>            
          </div>)
          )}
          { default_length && (
               <div className={styles.legend}>
               <span className={styles.legend_item} style={{ color: belowColor }}>
                 Priced Below
               </span>
               <span className={styles.legend_item} style={{ color: similarColor }}>
                 Similar Price
               </span>
               <span className={styles.legend_item} style={{ color: aboveColor }}>
                 Priced Above
               </span>
             </div>               
             )}
    </div>
    
  );
};

export default CompetitorVarianceGraph;
