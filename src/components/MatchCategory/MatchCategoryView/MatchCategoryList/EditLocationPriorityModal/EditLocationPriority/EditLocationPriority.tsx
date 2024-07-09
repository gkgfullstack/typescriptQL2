import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Table } from 'antd';
import styles from './EditLocationPriority.module.less';
import { useGetMatchAttributeDetails } from 'src/api/matchAttribute';
import Spin from 'src/components/common/Spin';
import { faArrowUp, faArrowDown } from '@fortawesome/pro-light-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type EditLocationPriorityProps = {
  matchAttributeMap: any;
  onSave: (values: any) => void;
};

const faArrowUpIcon = faArrowUp as IconProp;
const faArrowDownIcon = faArrowDown as IconProp;

const getColumns = (onAction: any) => {
  return [
    {
      title: 'Match Attribute Location',
      key: 'matchAttributeLocation',
      render: (record: any) => <span>{record.matchAttributeLocation}</span>,
    },
    {
      title: 'Raw Attribute Name',
      key: 'rawAttributeName',
      render: (record: any) => <span>{record.rawAttributeName}</span>,
    },
    {
      title: 'Location Priority',
      key: 'locationPriority',
      render: (record: any) => <span>{record.locationPriority}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <span>
          <FontAwesomeIcon
            onClick={onAction('up', record)}
            title={'Increase Location priority'}
            icon={faArrowUpIcon}
            className={styles.location_icon}
          />
          <FontAwesomeIcon
            onClick={onAction('down', record)}
            title={'Reduce Location priority'}
            icon={faArrowDownIcon}
            className={styles.location_icon}
          />
        </span>
      ),
    },
  ];
};

export const EditLocationPriority: React.FC<EditLocationPriorityProps> = ({
                                                                            matchAttributeMap,
  onSave,
}: EditLocationPriorityProps) => {
  const emptyText: React.ReactNode = <p className={styles.no_results}>No results found</p>;
  const [requestParams, setRequestParams] = useState<any>({});
  const [loading, totalCount, clientList] = useGetMatchAttributeDetails(matchAttributeMap.matchAttributeId, requestParams);
  const [data, setData] = useState<any>([]);

  const onChangeLocation = (type: string, record: any) => {
    return () => {
      const updatedData = [...data];
      let locationIndex = 0;

      updatedData.forEach((item: any, index: number) => {
        if (item.matchAttributeMapId === record.matchAttributeMapId) {
          locationIndex = index;
        }
      });
      if (!((type === 'up' && locationIndex === 0) || (type === 'down' && locationIndex === updatedData.length - 1))) {
        const insertedIndex = type === 'up' ? locationIndex - 1 : locationIndex + 2;
        const deletedIndex = locationIndex > insertedIndex ? locationIndex + 1 : locationIndex;
        updatedData.splice(insertedIndex, 0, updatedData[locationIndex]);
        updatedData.splice(deletedIndex, 1);
        updatedData.forEach((item: any, index: number) => {
          item.locationPriority = index + 1;
        });
        setData(updatedData);
      }
    };
  };

  const columns = getColumns(onChangeLocation);

  useEffect(() => {
    if (matchAttributeMap && matchAttributeMap.matchAttributeId && totalCount === 0) {
      setRequestParams({
        ownerId: matchAttributeMap.ownerId,
        sortingcolumn: 'locationPriority',
      });
    }
    if (totalCount > 0) {
      setData(clientList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchAttributeMap, totalCount]);

  const onSaveLocation = () => {
    const updatedData = [...data].map((item: any) => {
      const updatedItem: any = {
        ownerId: Number(item.ownerId),
        matchAttributeLocation: item.matchAttributeLocation,
        rawAttributeName: item.rawAttributeName,
        regexParse: item.regexParse,
        defaultValue: item.defaultValue,
        defaultMeasurementUnit: item.defaultMeasurementUnit,
        locationPriority: Number(item.locationPriority),
        ID: item.matchAttributeMapId,
        matchAttributeId: Number(item.matchAttributeId),
      };
      if (item.normalizationsAfterRegexParse) {
        updatedItem.normalizationsAfterRegexParse = item.normalizationsAfterRegexParse;
      }
      if (item.normalizationsBeforeRegexParse) {
        updatedItem.normalizationsBeforeRegexParse = item.normalizationsBeforeRegexParse;
      }

      return updatedItem;
    });

    onSave(updatedData);
  };

  return (
    <div className={styles.location_priority_wrapper}>
      <h1 className={styles.location_priority_title}>Edit Location Priority</h1>
      <div className={styles.match_attribute_details_wrapper}>
        <h2 className={styles.match_attribute_details_name}>{matchAttributeMap.matchAttributeName}</h2>
        <dl className={styles.match_attribute_details_list}>
          <dt>Owner Name:</dt>
          <dd>{matchAttributeMap.ownerName}</dd>
          <dt>Owner Id:</dt>
          <dd>{matchAttributeMap.ownerId}</dd>
        </dl>
      </div>
      <Spin spinning={loading}>
        <Table
          className={styles.location_priority_table}
          rowKey={(_, index: number): string => index.toString()}
          columns={columns}
          dataSource={data}
          locale={{ emptyText: emptyText }}
        />
      </Spin>
      <div>
        <Row gutter={24}>
          <Col span={24} style={{ marginTop: '30px' }}>
            <Col span={24}>
              <Button type="primary" className={styles.save_button} onClick={onSaveLocation}>
                Save
              </Button>
            </Col>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default EditLocationPriority;
