import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../SiteManagementList.module.less';
import { faToggleOn } from '@fortawesome/pro-light-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Popconfirm } from 'antd';
import Spin from 'src/components/common/Spin';
import axios from 'src/api/axiosInstances/privateAxiosInstance';
import { Link } from 'react-router-dom';
import routes from 'src/routes';

type SiteClientsProps = {
  siteId: string;
};

type SiteManagementConfirmationProps = {
  record: {
    ID: string;
  };
  onAction: any;
};

const faToggleOnIcon = faToggleOn as IconProp;
const warningText = 'Setting this to Inactive will remove the site for the Clients';

const SiteClients: React.FC<SiteClientsProps> = ({ siteId }: SiteClientsProps): React.ReactElement => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const schema = urlParams.get('schema') ? urlParams.get('schema')?.toString() : undefined;
  const [loading, setLoading] = useState<boolean>(false);
  const [clientList, setClientList] = useState<any>([]);

  useEffect(() => {
    if (siteId) {
      setLoading(true);
      axios &&
        axios
          .get(`/oc/owner/retrieveall/${siteId}/clients`, {
            params: {
              verticalName: schema,
            },
          })
          .then((response: any) => {
            if (response) {
              setClientList(response.clientResponse.client);
            }
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
    } else {
      setClientList([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteId]);

  return (
    <>
      {warningText}
      <div style={{ textAlign: 'left', margin: '10px 0' }}>
        <Spin spinning={loading}>
          <ul style={{ margin: '0', padding: '0 0 0 20px' }}>
            {!loading &&
              clientList.map((item: any, i: string) => {
                return (
                  <li key={`site-client-text-${i}`}>
                    <Link
                      key={`site-client-link-${i}`}
                      to={`${routes.configureClient}?clientId=${item.ID}&name=${item.name}&status=${item.active}&schema=${item.mwsSchema}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </Spin>
      </div>
    </>
  );
};

const SiteManagementConfirmation: React.FC<SiteManagementConfirmationProps> = ({
  record,
  onAction,
}: SiteManagementConfirmationProps): React.ReactElement => {
  const [title, setTitle] = useState<any>(warningText);

  const getRecords = () => {
    setTitle(<SiteClients siteId={record.ID} />);
  };

  return (
    <Popconfirm placement="top" title={title} onConfirm={onAction(record)} okText="Yes" cancelText="No" icon={null}>
      <FontAwesomeIcon icon={faToggleOnIcon} className={styles.status_active_icon} onClick={getRecords} size="lg" />
    </Popconfirm>
  );
};

export default SiteManagementConfirmation;
