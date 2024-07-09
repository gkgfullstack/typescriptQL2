import React, { SyntheticEvent } from 'react';
import styles from './ConfigurationClientInfoView.module.less';
import { Link, useHistory } from 'react-router-dom';
import routes from 'src/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ConfigurationClientSites from './ConfigurationClientSites';
import ConfigurationClientDetails from './ConfigurationClientDetails';

type ConfigurationClientInfoViewProps = {};

const getClientStatus = (clientStatus: string | undefined) => {
  if (clientStatus === 'true') {
    return (
      <>
        <span className={styles.client_active_status}></span>Active
      </>
    );
  } else {
    return (
      <>
        <span className={styles.client_inactive_status}></span>Inactive
      </>
    );
  }
};

const ConfigurationClientInfoView: React.FC<ConfigurationClientInfoViewProps> = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const clientId = urlParams.get('clientId')?.toString();
  const clientName = urlParams.get('name')?.toString();
  const clientStatus = urlParams.get('status')?.toString();
  const clientSchema = urlParams.get('schema')?.toString();

  const history = useHistory();

  const onBackClick = () => {
    return (event: SyntheticEvent) => {
      if (window.history.state && window.history.state.key) {
        event.preventDefault();
        history.goBack();
      }
    };
  };

  return (
    <>
      <div className={styles.actions_container}>
        <Link className={styles.back_link} to={routes.configureClient} onClick={onBackClick}>
          <FontAwesomeIcon icon={['far', 'chevron-left']} size={'xs'} className={styles.back_icon} />
          <span className={styles.back_link_text}>Back to Client Management</span>
        </Link>
      </div>
      <h2 className={styles.client_name}>{clientName}</h2>
      <dl className={styles.client_status_list}>
        <dt>ID:</dt>
        <dd>{clientId}</dd>
        <dt>Vertical:</dt>
        <dd>{clientSchema}</dd>
        <dt>Status:</dt>
        <dd>{getClientStatus(clientStatus)}</dd>
      </dl>
      <div className={styles.configuration_client_info_wrapper}>
        <ConfigurationClientSites clientId={clientId} />
        <ConfigurationClientDetails clientId={clientId} />
      </div>
    </>
  );
};

export default ConfigurationClientInfoView;
