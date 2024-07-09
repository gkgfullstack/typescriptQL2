import React, { useEffect, useState } from 'react';
import ProductList from '../ProductList';
import ProductFinderInfo from 'src/types/ProductFinderInfo';
import { Sorting } from 'src/types/Sorting';
import SearchPanel from '../SearchPanel';
import AdvancedFilterSider from '../AdvancedFiltersSider/AdvancedFilterSider';
import OptionsFiltersSider from '../OptionsFiltersSider/OptionsFiltersSider';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import ProductFinderQueryParams from 'src/types/ProductFinderQueryParams';
import { Button, Tooltip } from 'antd';
import styles from './ProductFinderView.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

type ProductFinderViewProps = {};

const ProductFinderView: React.FC<ProductFinderViewProps> = () => {
  const setQuery = useQueryUrlParamsDispatch<ProductFinderQueryParams>();
  const { sortingorder, sortingcolumn } = useQueryUrlParams();
  const [currColumn, setSortingColumn] = useState(sortingcolumn || 'name');
  const [currOrder, setSortingOrder] = useState(sortingorder || 'ascend');
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedOptions, setCollapsedOptions] = useState(false);
  const [ openClose, setOpenClose]  = useState(false);
  const [ openCloseF, setOpenCloseF]  = useState(false);
  const openCloseFunction = () => {  
    if(openClose=== false){
      setOpenClose(true)
      setOpenCloseF(false)
      setCollapsedOptions(true);
      setCollapsed(false);
    }else{
      setOpenClose(false)
      setCollapsedOptions(false);
    }
  }
  const openCloseFunctionF = () => {  
    if(openCloseF=== false){
      setOpenCloseF(true)
      setOpenClose(false)
      setCollapsed(true);
      setCollapsedOptions(false);
    }else{
      setOpenCloseF(false)
      setCollapsed(false);
    }
  }
  useEffect(() => {
    if (sortingcolumn && sortingorder && (sortingcolumn !== currColumn || sortingorder !== currOrder)) {
      setSortingColumn(sortingcolumn);
      setSortingOrder(sortingorder);
      setQuery({
        sortingorder: sortingorder,
        sortingcolumn: sortingcolumn,
      });
    }
    if (!sortingcolumn && !sortingorder) {
      setSortingColumn('name');
      setSortingOrder('ascend');
    }
  }, [setQuery, currColumn, currOrder, sortingcolumn, sortingorder]);

  const onSortingChange = (sorting: Sorting<ProductFinderInfo>): void => {
    setQuery({
      sortingorder: sorting.order,
      sortingcolumn: sorting.field,
    });
  };
  const sorting = {
    field: currColumn,
    order: currOrder,
  } as Sorting<ProductFinderInfo>;
  return (<>
  <div className={styles.searchBardetailsPage}>
      <div
        className={clsx(styles.search_panel, { 
          [styles.without_filters]: !collapsedOptions || !collapsed,
          [styles.with_filters]: collapsedOptions || collapsed
        })}
      >
        <SearchPanel />
      </div>
      <div className={clsx(styles.openClose, { 
          [styles.without_filters]: !collapsedOptions || !collapsed,
          [styles.with_filters]: collapsedOptions || collapsed
        })}>
      {collapsedOptions ? <Button block={collapsedOptions} type="primary" onClick={openCloseFunction} ><span>{collapsedOptions ? <FontAwesomeIcon icon={['far', 'chevron-right']} size={'lg'} /> : <FontAwesomeIcon icon={['far', 'sliders-h']} size={'lg'} />}<span>Options</span></span></Button>: <Tooltip placement="topLeft" title="Options"><Button block={collapsedOptions} type="primary" onClick={openCloseFunction} ><span>{collapsedOptions ? <FontAwesomeIcon icon={['far', 'chevron-right']} size={'lg'} /> : <FontAwesomeIcon icon={['far', 'sliders-h']} size={'lg'} />}<span>Options</span></span></Button></Tooltip>}
      {collapsed ? <Button block={collapsed} type="primary" onClick={openCloseFunctionF} ><span>{collapsed ? <FontAwesomeIcon icon={['far', 'chevron-right']} size={'lg'} /> : <FontAwesomeIcon icon={['fal', 'filter']} size={'lg'} />}<span>Filters</span></span></Button> :<Tooltip placement="topLeft" title="Filters"><Button block={collapsed} type="primary" onClick={openCloseFunctionF} ><span>{collapsed ? <FontAwesomeIcon icon={['far', 'chevron-right']} size={'lg'} /> : <FontAwesomeIcon icon={['fal', 'filter']} size={'lg'} />}<span>Filters</span></span></Button></Tooltip>}
      </div>
      </div> 
      <div className={styles.mainConteners}>  
      <ProductList sorting={sorting} onSortingChange={onSortingChange} />
      {openClose ? <OptionsFiltersSider className={styles.optionssLeft} collapsedOptions={collapsedOptions}/> : null}
      {openCloseF ? <AdvancedFilterSider className={styles.advancedLeft} collapsed={collapsed}/> : null}
      </div> 
      
    </>
  );
};

export default ProductFinderView;
