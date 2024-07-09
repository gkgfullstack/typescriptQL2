import React from 'react';
import CompareMatches from 'src/components/ProductDetails/CompareMatches';
import useProductDetails from 'src/components/ProductDetails/hooks/useProductDetails';
import { PRODUCT_DETAILS_ACTION_TYPES, ProductDetailsState } from 'src/stateProviders/productDetailsStateProvider';
import { useProductDetailsDispatchContext } from 'src/stateProviders/useProductDetailsStateContext';
import { useParams } from 'react-router';
import ProductSummary from 'src/components/ProductDetails/ProductSummary';
import MatchDetails from 'src/components/ProductDetails/MatchDetails/MatchDetails';
import Widget from 'src/components/common/Widget/Widget';
import { Alert, Icon, Spin, Button, Tooltip } from 'antd';
import SearchPanel from 'src/components/ProductFinder/SearchPanel';
import routes from 'src/routes';
import AlertsDetails from 'src/components/ProductDetails/AlertsDetails/AlertsDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ProductDetailsView.module.less';
import { useSearchProductsStateContext } from 'src/stateProviders/useSearchProductsStateContext';
import clsx from 'clsx';
import OptionsFiltersSider from 'src/components/ProductFinder/OptionsFiltersSider';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import { useApplicationProductFinderParams } from 'src/api/applicationParams';

type ProductDetailsViewProps = {};

const antIcon = <Icon type="loading" spin />;

const ProductDetailsView: React.FC<ProductDetailsViewProps> = () => {
  const { id }: any = useParams();
  const [{ data: productDetails, loading: loadingProduct, error: productError }] = useProductDetails();
  const productDetailsDispatch = useProductDetailsDispatchContext();
  const [{ isReadOnlyBenchmark, isReadOnlyMatch }] = useApplicationProductFinderParams('10047');
  const { matchTypeFilter, region, priceType } = useQueryUrlParams();
  const initialMatchTypeFilter: string = matchTypeFilter !== undefined ? matchTypeFilter : 'ALL';
  const initialRegion: string = region !== undefined ? region : '-1';
  const initialPriceType: string = priceType !== undefined ? priceType : '1';
  const [collapsed, setCollapsed] = React.useState(false);
  const [collapsedOptions, setCollapsedOptions] = React.useState(false);
  const [openClose, setOpenClose] = React.useState(false);
  const openCloseFunction = () => {
    if (openClose === false) {
      setOpenClose(true);
      setCollapsedOptions(true);
      setCollapsed(false);
    } else {
      setOpenClose(false);
      setCollapsedOptions(false);
    }
  };

  const { advancedFilters } = useSearchProductsStateContext();
  const isOpen = advancedFilters && advancedFilters.isOpen;

  React.useEffect(() => {
    if (id && productDetailsDispatch) {
      productDetailsDispatch({
        type: PRODUCT_DETAILS_ACTION_TYPES.setProductId,
        payload: { productId: id } as ProductDetailsState,
      });
    }
  }, [id, productDetailsDispatch]);

  React.useEffect(() => {
    if (productDetails && !loadingProduct && productDetailsDispatch) {
      productDetailsDispatch({
        type: PRODUCT_DETAILS_ACTION_TYPES.setProduct,
        payload: { product: productDetails } as ProductDetailsState,
      });
    }
  }, [productDetails, loadingProduct, productDetailsDispatch]);

  const sourceOwnerId = productDetails && productDetails.ownerID ? productDetails.ownerID : '';

  return (
    <>
      <div className={styles.searchBardetailsPage}>
        <div
          className={clsx(styles.search_panel, {
            [styles.without_filters]: !collapsedOptions || !collapsed,
            [styles.with_filters]: collapsedOptions || collapsed,
          })}
        >
          <SearchPanel pathname={routes.productFinder} ownerPathname={routes.qmatchDashboard} />
        </div>
        <div
          className={clsx(styles.openClose, {
            [styles.without_filters]: !collapsedOptions || !collapsed,
            [styles.with_filters]: collapsedOptions || collapsed,
          })}
        >
          {collapsedOptions ? (
            <Button block={collapsedOptions} type="primary" onClick={openCloseFunction}>
              <span>
                {collapsedOptions ? (
                  <FontAwesomeIcon icon={['far', 'chevron-right']} size={'lg'} />
                ) : (
                  <FontAwesomeIcon icon={['far', 'sliders-h']} size={'lg'} />
                )}
                <span>Options</span>
              </span>
            </Button>
          ) : (
            <Tooltip placement="topLeft" title="Options">
              <Button block={collapsedOptions} type="primary" onClick={openCloseFunction}>
                <span>
                  {collapsedOptions ? (
                    <FontAwesomeIcon icon={['far', 'chevron-right']} size={'lg'} />
                  ) : (
                    <FontAwesomeIcon icon={['far', 'sliders-h']} size={'lg'} />
                  )}
                  <span>Options</span>
                </span>
              </Button>
            </Tooltip>
          )}
        </div>
      </div>
      {productError && (
        <Alert
          message="Error"
          description="An error has occurred when trying to get product details! Please try again later!"
          type="error"
          showIcon
        />
      )}
      {loadingProduct && !productError ? (
        <div className={styles.matches_loader_container}>
          <Spin indicator={antIcon} size={'large'} spinning={loadingProduct} />
        </div>
      ) : null}
      {productDetails !== null && (
        <>
          <div className={styles.mainConteners}>
            <div
              className={clsx(styles.product_list_container, {
                [styles.with_filters]: isOpen,
                [styles.without_filters]: !collapsedOptions || !collapsed,
                [styles.with_filters]: collapsedOptions || collapsed,
              })}
            >
              <Widget>
                <ProductSummary isReadOnlyMatch={isReadOnlyMatch} data={productDetails} className={styles.summary} />
              </Widget>
            </div>
            {openClose ? (
              <OptionsFiltersSider className={styles.optionssLeft} collapsedOptions={collapsedOptions} />
            ) : null}
          </div>
          <MatchDetails isReadOnlyBenchmark={isReadOnlyBenchmark} isReadOnlyMatch={isReadOnlyMatch} />
        </>
      )}
      <AlertsDetails
        sourceOwnerId={sourceOwnerId}
        matchTypeFilter={initialMatchTypeFilter}
        region={initialRegion}
        priceType={initialPriceType}
      />
      {productDetails !== null && <CompareMatches isReadOnlyMatch={isReadOnlyMatch} />}
    </>
  );
};

export default ProductDetailsView;
