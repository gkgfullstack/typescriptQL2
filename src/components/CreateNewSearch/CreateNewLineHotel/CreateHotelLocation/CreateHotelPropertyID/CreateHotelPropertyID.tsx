import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from '../CreateHotelLocation.module.less';
import { Button, Input, Tree } from 'antd';
import { useSearchByPropertyID } from 'src/api/searchByPropertyID';
import Spin from 'src/components/common/Spin';
import {
  CountryTooltip,
  LocationTooltip,
  PropertyNameTooltip,
  StateProvinceTooltip,
  StreetAddressTooltip,
  ZipTooltip,
} from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';
import TextArea from 'antd/lib/input/TextArea';
import { AntTreeNodeProps } from 'antd/lib/tree';
import { getChildrenByPropertyID } from 'src/api/getChildrenByProperty';

type CreateHotelPropertyIDProps = {
  onAdd: (values: any) => void;
};

interface DataNode {
  title: string | React.ReactElement;
  key: string;
  isLeaf?: boolean;
  parentId?: string;
  children?: DataNode[];
  isParent?: boolean;
}

const CreateHotelPropertyID: React.FC<CreateHotelPropertyIDProps> = ({ onAdd }: CreateHotelPropertyIDProps) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [locationData, setLocationData] = useState<any>(null);
  const [loading, searchResult] = useSearchByPropertyID(locationData);
  const [selectedNodeName, setSelectedNodeName] = useState<string>('');
  const [treeData, setTreeData] = useState(locationData);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

  useEffect(() => {
    const tree = searchResult.map((item: any) => {
      item.title = `${item.title}`;
      item.disabled = false;
      return item;
    });
    setTreeData(tree);
  }, [searchResult]);

  const onAddLocation = () => {
    setLocationData({
      id: '',
      name: name,
      address: address,
      city: city,
      state: province,
      zip: zip,
      country: country,
    });
  };

  const onHandleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAddLocation();
    }
  };

  const updateTreeData = (list: DataNode[], key: React.Key, children: DataNode[]): DataNode[] => {
    return list.map(node => {
      if (node.key === key) {
        return {
          ...node, 
          title:
            node.isParent && children.length === 0 ? (
              <>
                <div>{node.title}</div>
                <div>No linked properties were found</div>
              </>
            ) : (
              node.title
            ),         
          children: children.map(child => {
            child.title = `${child.title}`;
            child.parentId = node.key;
            return child;
          }),
          disabled: false,
        };
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
          disabled: false,
        };
      }

      return node;
    });
  };

  const onLoadData = (node: any) =>
    new Promise<void>(resolve => {
      if (node.props.children && node.props.children.length > 0) {
        resolve();
        return;
      }
      getChildrenByPropertyID(node.props.eventKey).then((result: any) => {
        setTreeData((origin: any) => updateTreeData(origin, node.props.eventKey, [...result]));
        resolve();
      });
    });

  const onCheck = (checkedKeysValue: any, event: AntTreeNodeProps) => {
    const tree = [...treeData].map((item: any) => {
      if (item.children && item.children.length > 0) {
        item.children = item.children.map((child: any) => {
          child.disabled = checkedKeysValue.indexOf(item.key) > -1;
          return child;
        });
      }
      return item;
    });
    const nodes = [...event.checkedNodes]
      .map(item => item.props)
      .filter(item => item.name !== 'No linked properties were found')
      .filter(item => !item.parentId || (item.parentId && checkedKeysValue.indexOf(item.parentId) === -1));
    const nodeNames: string = nodes
      .map(item => (!item.parentId ? `${item.id}` : `${item.id}`))
      .join(',');

    setCheckedKeys(nodes.map(item => item.id));
    setSelectedNodeName(nodeNames);
    setTreeData(tree);
    onAdd(nodeNames);
  };

  return (
    <Spin spinning={loading}>
      <div className={styles.create_hotel_location}>
        <div className={styles.create_hotel_location_item}>
          <label>
            <h6>
              Name:
              <PropertyNameTooltip />
            </h6>
          </label>
          <Input
            type="text"
            value={name}
            onKeyDown={onHandleKeyDown}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
            placeholder="Please enter Name"
          />
        </div>
        <div className={styles.create_hotel_location_item}>
          <label>
            <h6>
              Address:
              <StreetAddressTooltip />
            </h6>
          </label>
          <Input
            type="text"
            value={address}
            onKeyDown={onHandleKeyDown}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setAddress(event.target.value)}
            placeholder="Please enter Address"
          />
        </div>
        <div className={styles.create_hotel_location_item}>
          <label>
            <h6>
              City:
              <LocationTooltip />
            </h6>
          </label>
          <Input
            type="text"
            value={city}
            onKeyDown={onHandleKeyDown}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setCity(event.target.value)}
            placeholder="Please enter City"
          />
        </div>
        <div className={styles.create_hotel_location_item}>
          <label>
            <h6>
              State:
              <StateProvinceTooltip />
            </h6>
          </label>

          <Input
            type="text"
            value={province}
            onKeyDown={onHandleKeyDown}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setProvince(event.target.value)}
            placeholder="Please enter State"
          />
        </div>
        <div className={styles.create_hotel_location_item}>
          <label>
            <h6>
              Zip:
              <ZipTooltip />
            </h6>
          </label>
          <Input
            type="text"
            value={zip}
            onKeyDown={onHandleKeyDown}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setZip(event.target.value)}
            placeholder="Please enter Zip"
          />
        </div>
        <div className={styles.create_hotel_location_item}>
          <label>
            <h6>
              Country:
              <CountryTooltip />
            </h6>
          </label>
          <Input
            type="text"
            value={country}
            onKeyDown={onHandleKeyDown}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setCountry(event.target.value)}
            placeholder="Please enter Country"
          />
        </div>
        <div className={styles.create_hotel_property_button}>
          <Button type="primary" onClick={onAddLocation}>
            Search
          </Button>
        </div>
      </div>
      {searchResult.length > 0 && (
        <>
          <div className={styles.create_hotel_properties_wrapper}>
            <Tree onCheck={onCheck} checkedKeys={checkedKeys} checkable loadData={onLoadData} treeData={treeData} showLine={true} />
          </div>
          <TextArea
            rows={4}
            value={selectedNodeName}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              setSelectedNodeName(event.target.value)
              onAdd(event.target.value)
            }}
            placeholder={'Select Property'}
            disabled
          />
        </>
      )}
      {locationData && !loading && searchResult.length === 0 && (
        <div className={styles.create_hotel_properties_wrapper}>No results found</div>
      )}
    </Spin>
  );
};

export default CreateHotelPropertyID;


