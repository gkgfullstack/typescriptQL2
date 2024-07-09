import React from 'react';
import styles from './CustomFilterMatches.module.less';
import Spin from 'src/components/common/Spin';
import { Alert, Row, Col, Select, TreeSelect } from 'antd';
import { useCustomFilterMatches } from './hooks';
import useSourceOwnerId from 'src/hooks/useSourceOwnerId';
import { PRODUCT_DETAILS_ACTION_TYPES, ProductDetailsState } from 'src/stateProviders/productDetailsStateProvider';
import { MATCH_TYPE } from 'src/enums';
import { useProductDetailsDispatchContext, useProductDetailsStateContext } from 'src/stateProviders/useProductDetailsStateContext';

const { Option } = Select;
const { TreeNode } = TreeSelect;
const matchTypes: string[] = Object.keys(MATCH_TYPE);
export type AdvancedFilterSiderProps = {};

const CustomFilterMatches: React.FC<AdvancedFilterSiderProps> = () => {
  const sourceOwnerId = useSourceOwnerId();
  const { productId }: any = useProductDetailsStateContext();
  const { data, loading, error } = useCustomFilterMatches(sourceOwnerId, productId);
  const productDetailsDispatch = useProductDetailsDispatchContext();
  const responseLoaded = !loading && (data || error);

  const handleFiltersUpdateOwnerId = (key: string, value: any) => {
    if (key) {
      let setOwnerIds = key.split('-');
      key = setOwnerIds[0];
    }
    productDetailsDispatch({
      type: PRODUCT_DETAILS_ACTION_TYPES.setOwnerId,
      payload: { ownerId: key || value } as ProductDetailsState,
    });
  }
  const handleFiltersUpdateMatchType = (key: string, value: any) => {
    productDetailsDispatch({
      type: PRODUCT_DETAILS_ACTION_TYPES.setMatchType,
      payload: { matchTypeFilter: key || value } as ProductDetailsState,
    });
  }
  const handleFiltersUpdateVariance = (key: string, value: any) => {
    productDetailsDispatch({
      type: PRODUCT_DETAILS_ACTION_TYPES.setVariance,
      payload: { variance: key || value } as ProductDetailsState,
    });
  }
  return (
    <div className={styles.filters_wrapper}>
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
        ) : (<Row> <Col span={12} style={{ float: 'right', marginBottom: '0px' }}>
          <Col style={{ display: 'flex', float: 'right' }}>
            <TreeSelect
              style={{ width: '100%', maxWidth: '200px', minWidth: '180px', padding: '0px 5px' }}
              dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
              placeholder={'Site'}
              allowClear
              showSearch={true}
              treeDefaultExpandAll={false}
              treeCheckable={false}
              searchPlaceholder={'Site'}
              autoClearSearchValue
              treeIcon={false}
              treeCheckStrictly={false}
              onChange={handleFiltersUpdateOwnerId}
              dropdownClassName={styles.addmatchSearch}
            >{data &&
              data.owners.map(
                (competitorOwner: any): React.ReactNode => (
                  <TreeNode
                    key={`${competitorOwner.Id}`}
                    value={competitorOwner.Id + '-' + competitorOwner.label}
                    title={competitorOwner.label}
                  />
                ))}
            </TreeSelect>

            <Select
              placeholder="Match Type"
              style={{ width: '100%', maxWidth: '200px', minWidth: '150px', padding: '0px 5px', display: 'none' }}
              onChange={handleFiltersUpdateMatchType}
              allowClear
            >
              <Option value='-1' key='match_type_ALL'>
                All
              </Option>
              {matchTypes.map(
                (type: string): React.ReactNode => {
                  return (
                    <Option value={type} key={`match_type_${type}`}>
                      {MATCH_TYPE[type as keyof typeof MATCH_TYPE]}
                    </Option>
                  );
                }
              )}
            </Select>

            <Select
              //defaultValue={selectedSites}
              placeholder="Variance"
              style={{ width: '100%', maxWidth: '200px', minWidth: '150px', padding: '0px 5px' }}
              onChange={handleFiltersUpdateVariance}
              allowClear
            >
              {data &&
                data.variance.map(
                  (competitorOwner: any): React.ReactNode => (
                    <Option key={`variance_${competitorOwner.Id}`} value={competitorOwner.Id}>{competitorOwner.label}</Option>
                  ))}
            </Select>
          </Col>
        </Col>
        </Row>
        ))}
    </div>
  );
};

export default CustomFilterMatches;
