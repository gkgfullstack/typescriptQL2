import React, { useState } from 'react';
import styles from './MatchAttributeDetailsList.module.less';
import MatchAttributeDetailsTable from './MatchAttributeDetailsTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import MatchAttributeMapModal from '../../MatchAttributeMapModal';
import EditLocationPriorityModal from '../../EditLocationPriorityModal';

type MatchAttributeDetailsListProps = {
  matchAttribute: any;
};

const MatchAttributeDetailsList: React.FC<MatchAttributeDetailsListProps> = ({ matchAttribute }) => {
  const [requestParams, setRequestParams] = useState<any>({});
  const [matchAttributeMapVisible, setMatchAttributeMapVisible] = useState<boolean>(false);
  const [editLocationVisible, setEditLocationVisible] = useState<boolean>(false);
  const [selectedAttributeMatchMap, setSelectedAttributeMatchMap] = useState(null);

  const onUpdateList = () => {
    setRequestParams({
      ...requestParams,
    });
  };

  const onAddAttributeMatchMap = () => {
    setMatchAttributeMapVisible(true);
  };

  const onEditAttributeMatchMap = (attributeMatchMap: any) => {
    setMatchAttributeMapVisible(true);
    setSelectedAttributeMatchMap(attributeMatchMap);
  };

  const onEditLocation = (attributeMatchMap: any) => {
    setEditLocationVisible(true);
    setSelectedAttributeMatchMap(attributeMatchMap);
  };

  return (
    <>
      <h1 className={styles.match_attribute_details_title}>View Match Attribute Details</h1>
      <div className={styles.match_attribute_details_wrapper}>
        <h2 className={styles.match_attribute_details_name}>{matchAttribute.name}</h2>
        <dl className={styles.match_attribute_details_list}>
          <dt>ID:</dt>
          <dd>{matchAttribute.ID}</dd>
          <dt>Category:</dt>
          <dd>{matchAttribute.category}</dd>
        </dl>
      </div>
      <div className={styles.add_button_wrapper}>
        <Button type={'default'} onClick={onAddAttributeMatchMap} className={styles.add_button}>
          <FontAwesomeIcon icon={['fal', 'plus-circle']} size="lg" className={styles.icon_plus} />
          Add Match Attribute Map
        </Button>
      </div>
      <MatchAttributeDetailsTable
        requestParams={requestParams}
        setRequestParams={setRequestParams}
        matchAttributeId={matchAttribute.ID}
        onEdit={onEditAttributeMatchMap}
        onEditLocation={onEditLocation}
      />
      <MatchAttributeMapModal
        matchAttribute={matchAttribute}
        matchAttributeMap={selectedAttributeMatchMap}
        visible={matchAttributeMapVisible}
        setVisible={setMatchAttributeMapVisible}
        onUpdate={onUpdateList}
        setSelectedAttributeMatchMap={setSelectedAttributeMatchMap}
      />
      <EditLocationPriorityModal
        visible={editLocationVisible}
        setVisible={setEditLocationVisible}
        matchAttributeMap={selectedAttributeMatchMap}
        onUpdate={onUpdateList}
        setSelectedAttributeMatchMap={setSelectedAttributeMatchMap}
      />
    </>
  );
};

export default MatchAttributeDetailsList;
