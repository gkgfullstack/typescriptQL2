import React, { ChangeEvent, useState } from 'react';
import { Divider, Input } from 'antd';
import styles from './CreateAutopartRegion.module.less';
import { useGetRegionList } from 'src/api/regions';
import Spin from 'src/components/common/Spin';
import RegionSelectTree from './RegionSelectTree';

type CreateAutopartRegionProps = {
  site: string;
  vertical: string;
  onUpdate: (values: string) => void;
  searchType: string;
};

const { TextArea } = Input;

const CreateAutopartRegion: React.FC<CreateAutopartRegionProps> = ({
  vertical,
  site,
  onUpdate,
  searchType,
}: CreateAutopartRegionProps) => {
  const [regionValue, setRegionValue] = useState<string>('');
  const [loading, regionList] = useGetRegionList(vertical, site);

  const onRegionUpdate = (values: string) => {
    setRegionValue(values);
    onUpdate(values);
  };

  return (
    <>
      <div className={'ant-row ant-form-item'}>
        <div className="ant-col ant-col-9 ant-form-item-label">
          <label>
            <h6>Regions</h6>
          </label>
        </div>
        <div className={`ant-col ant-col-15 ant-form-item-control-wrapper ${styles.region_wrapper}`}>
          <Spin spinning={loading}>
            {regionList.length > 0 && (
              <>
                <RegionSelectTree searchType={searchType} data={regionList} onUpdate={onRegionUpdate} />
                <TextArea
                  rows={2}
                  value={regionValue}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onRegionUpdate(event.target.value)}
                  placeholder={'Select Region'}
                  disabled={true}
                />
              </>
            )}
            {site && regionList.length === 0 && <p>No Regions found</p>}
            {!site && <p>Select Site to see Regions</p>}
          </Spin>
        </div>
      </div>
      <Divider className="dividerCustom" />
    </>
  );
};

export default CreateAutopartRegion;
