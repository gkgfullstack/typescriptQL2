import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Col, Collapse, Input, Divider } from 'antd';
import styles from './CreateComSetPropertyName.module.less';
import { useSearchByPropertyID } from 'src/api/searchByPropertyID';
import Spin from 'src/components/common/Spin';
import { Tree } from 'antd';
import { getChildrenByPropertyID } from 'src/api/getChildrenByProperty';
import { AntTreeNodeProps } from 'antd/lib/tree';

const { Panel } = Collapse;
const { TextArea } = Input;
type CreateVacationPropertyNameProps = {
  label: React.ReactNode;
  onAdd: (values: any) => void;
  flexed?: boolean;
  editCompset?: boolean;
};

interface DataNode {
  title: string | React.ReactElement;
  key: string;
  isLeaf?: boolean;
  parentId?: string;
  children?: DataNode[];
  isParent?: boolean;
}

const CreateComSetPropertyName: React.FC<CreateVacationPropertyNameProps> = ({
  label,
  onAdd,
  flexed,
  editCompset,
}: CreateVacationPropertyNameProps) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [locationData, setLocationData] = useState<any>(null);
  const [loading, searchResult] = useSearchByPropertyID(locationData);
  const [treeData, setTreeData] = useState(locationData);
  const [selectedNodeName, setSelectedNodeName] = useState<string>('');
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  
  useEffect(() => {
    const tree = searchResult.map((item: any) => {
      item.title = `${item.title}: ${item.title}`;
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

  const onHandleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
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
        setTreeData((origin: any) => updateTreeData(origin, node.props.eventKey, result));
        resolve();
        return;
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
    <>
      <Col span={24} className={flexed ? styles.no_padding : ''}>
        <div className={['ant-row ant-form-item', flexed ? styles.flexed_container : ''].join(' ')}>
          <div className={['ant-col ant-col-9 ant-form-item-label', flexed ? styles.full_width : ''].join(' ')}>
            <label>{label}</label>
          </div>
          <div
            className={`ant-col ant-col-15 ant-form-item-control-wrapper ${[
              styles.create_vacation_property_names,
              flexed ? styles.full_width : '',
            ].join(' ')}`}
          >
            <Collapse defaultActiveKey={['0']} expandIconPosition="right">
              <Panel
                header={
                  <h6>
                    Choose property IDs <span className={styles.create_vacation_subtext}>(one per line)</span>
                  </h6>
                }
                key={'1'}
              >
                <Spin spinning={loading}>
                  <div className={styles.create_hotel_location}>
                    <div className={styles.create_hotel_location_item}>
                      <label>Name:</label>
                      <Input
                        type="text"
                        value={name}
                        onKeyDown={onHandleKeyDown}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                        placeholder="Please enter Name"
                      />
                    </div>
                    <div className={styles.create_hotel_location_item}>
                      <label>Address:</label>
                      <Input
                        type="text"
                        value={address}
                        onKeyDown={onHandleKeyDown}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setAddress(event.target.value)}
                        placeholder="Please enter Address"
                      />
                    </div>
                    <div className={styles.create_hotel_location_item}>
                      <label>City:</label>
                      <Input
                        type="text"
                        value={city}
                        onKeyDown={onHandleKeyDown}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setCity(event.target.value)}
                        placeholder="Please enter City"
                      />
                    </div>
                    <div className={styles.create_hotel_location_item}>
                      <label>State:</label>
                      <Input
                        type="text"
                        value={province}
                        onKeyDown={onHandleKeyDown}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setProvince(event.target.value)}
                        placeholder="Please enter State"
                      />
                    </div>
                    <div className={styles.create_hotel_location_item}>
                      <label>Zip:</label>
                      <Input
                        type="text"
                        value={zip}
                        onKeyDown={onHandleKeyDown}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setZip(event.target.value)}
                        placeholder="Please enter Zip"
                      />
                    </div>
                    <div className={styles.create_hotel_location_item}>
                      <label>Country:</label>
                      <Input
                        type="text"
                        value={country}
                        onKeyDown={onHandleKeyDown}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setCountry(event.target.value)}
                        placeholder="Please enter Country"
                      />
                    </div>
                    <div className={styles.create_vacation_property_button}>
                      <Button type="primary" onClick={onAddLocation}>
                        Search
                      </Button>
                    </div>
                  </div>
                  {searchResult.length > 0 && (
                    <>
                       <div className={styles.create_vacation_properties_wrapper}>
                        <Tree onCheck={onCheck} checkedKeys={checkedKeys} checkable loadData={onLoadData} treeData={treeData} showLine={true}/>
                      </div>
                      {!editCompset && (
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
                      )}
                    </>
                  )}
                  {locationData && !loading && searchResult.length === 0 && (
                    <div className={styles.create_vacation_properties_wrapper}>No results found</div>
                  )}
                </Spin>
              </Panel>
            </Collapse>
          </div>
        </div>
      </Col>
     {!editCompset && <Divider className="dividerCustom" />}
    </>
  );
};

export default CreateComSetPropertyName;
