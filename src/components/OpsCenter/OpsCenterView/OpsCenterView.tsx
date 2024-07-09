import React, { useEffect, useState } from 'react';
import styles from './OpsCenterView.module.less';
import routes from 'src/routes';
import { Tabs } from 'antd';
import {
  faHome,
  faQuidditch,
  faPenSquare,
  faTasks,
  faSlidersV,
  faProjectDiagram,
  faSitemap,
  faExchangeAlt,
  faCrosshairs,
  faTriangle,
  faSpiderBlackWidow,
  faSolarSystem,
  faSignal,
  faSignalStream,
  faAlienMonster,
} from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

const faHomePropIcon = faHome as IconProp;
const faQuidditchPropIcon = faQuidditch as IconProp;
const faPenSquarePropIcon = faPenSquare as IconProp;
const faTasksPropIcon = faTasks as IconProp;
const faSlidersVPropIcon = faSlidersV as IconProp;
const faProjectDiagramPropIcon = faProjectDiagram as IconProp;
const faSitemapPropIcon = faSitemap as IconProp;
const faExchangeAltPropIcon = faExchangeAlt as IconProp;
const faCrosshairsPropIcon = faCrosshairs as IconProp;
const faTrianglePropIcon = faTriangle as IconProp;
const faSpiderBlackWidowPropIcon = faSpiderBlackWidow as IconProp;
const faSolarSystemPropIcon = faSolarSystem as IconProp;
const faSignalPropIcon = faSignal as IconProp;
const faSignalStreamPropIcon = faSignalStream as IconProp;
const faAlienMonsterPropIcon = faAlienMonster as IconProp;

const { TabPane } = Tabs;

type OpsCenterViewProps = {};

const OpsCenterView: React.FC<OpsCenterViewProps> = () => {
  const history = useHistory();
  const [activeKey, setActiveKey] = useState<any>('home');
  const location = window.location.pathname ? window.location.pathname : '/nucleus/home';

  useEffect(() => {
    if (location === '' || location === '/nucleus') {
      history.push({
        pathname: `/nucleus/home`,
      });
    }
    setActiveKey(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const callback = (key: any) => {
    history.push({
      pathname: key,
    });
  };

  return (
    <Tabs activeKey={activeKey} className={styles.ops_center_tabs} onChange={callback}>
      <TabPane
        tab={
          <>
            <FontAwesomeIcon icon={faHomePropIcon} /> Home
          </>
        }
        key="/nucleus/home"
      >
        <Link to={routes.retailDiagnostic} className={styles.ops_center_link}>
          <span className={styles.ops_center_icon_wrapper}>
            <FontAwesomeIcon icon={faTasksPropIcon} className={styles.ops_center_icon} size={'lg'} />
          </span>
          <br />
          Retail Diagnostics
        </Link>
      </TabPane>
      <TabPane
        tab={
          <>
            <FontAwesomeIcon icon={faSlidersVPropIcon} /> Configuration
          </>
        }
        key="/nucleus/configuration"
      >
        <Link to={routes.configureClient} className={styles.ops_center_link}>
          <span className={styles.ops_center_icon_wrapper}>
            <FontAwesomeIcon icon={faProjectDiagramPropIcon} className={styles.ops_center_icon} size={'lg'} />
          </span>
          <br />
          Client Management
        </Link>
        <Link to={routes.configureSite} className={styles.ops_center_link}>
          <span className={styles.ops_center_icon_wrapper}>
            <FontAwesomeIcon icon={faSitemapPropIcon} className={styles.ops_center_icon} size={'lg'} />
          </span>
          <br />
          Site Management
        </Link>
        <Link to={routes.matchAttribute} className={styles.ops_center_link}>
          <span className={styles.ops_center_icon_wrapper}>
            <FontAwesomeIcon icon={faAlienMonsterPropIcon} className={styles.ops_center_icon} size={'lg'} />
          </span>
          <br />
          Match Attribute <br />
          Management
        </Link>
      </TabPane>
      <TabPane
        tab={
          <>
            <FontAwesomeIcon icon={faQuidditchPropIcon} /> Data Cleansing
          </>
        }
        key="/nucleus/dataCleansing"
      >
        <Link to={routes.spiderCleanUp} className={styles.ops_center_link}>
          <span className={styles.ops_center_icon_wrapper}>
            <FontAwesomeIcon icon={faSpiderBlackWidowPropIcon} className={styles.ops_center_icon} size={'lg'} />
          </span>
          <br />
          Spider Cleanup
        </Link>
        <Link to={routes.shallowCleanUp} className={styles.ops_center_link}>
          <span className={styles.ops_center_icon_wrapper}>
            <FontAwesomeIcon
              icon={faTrianglePropIcon}
              className={`${styles.ops_center_icon} ${styles.ops_center_shallow_icon}`}
              size={'lg'}
            />
          </span>
          <br />
          Shallow Cleanup
        </Link>
        <Link to={routes.productCleanUp} className={styles.ops_center_link}>
          <span className={styles.ops_center_icon_wrapper}>
            <FontAwesomeIcon icon={faCrosshairsPropIcon} className={styles.ops_center_icon} size={'lg'} />
          </span>
          <br />
          Product Cleanup
        </Link>
        <Link to={routes.dataCleanUp} className={styles.ops_center_link}>
          <span className={styles.ops_center_icon_wrapper}>
            <FontAwesomeIcon icon={faExchangeAltPropIcon} className={styles.ops_center_icon} size={'lg'} />
          </span>
          <br />
          Data Cleanup
        </Link>
      </TabPane>
      <TabPane
        tab={
          <>
            <FontAwesomeIcon icon={faPenSquarePropIcon} /> Data Editor
          </>
        }
        key="/nucleus/dataEditor"
      >
        <Link to={routes.dataEditor} className={styles.ops_center_link}>
          <span className={styles.ops_center_icon_wrapper}>
            <FontAwesomeIcon icon={faPenSquarePropIcon} className={styles.ops_center_icon} size={'lg'} />
          </span>
          <br />
          Data Editor
        </Link>
      </TabPane>
      <TabPane
        tab={
          <>
            <FontAwesomeIcon icon={faSolarSystemPropIcon} /> Status
          </>
        }
        key="/nucleus/status"
      >
        <Link to={routes.configureStatus} className={styles.ops_center_link}>
          <span className={styles.ops_center_icon_wrapper}>
            <FontAwesomeIcon icon={faSignalStreamPropIcon} className={styles.ops_center_icon} size={'lg'} />
          </span>
          <br />
          Streaming Tools
        </Link>
        <Link to={routes.configureStatus} className={styles.ops_center_link}>
          <span className={styles.ops_center_icon_wrapper}>
            <FontAwesomeIcon icon={faSignalPropIcon} className={styles.ops_center_icon} size={'lg'} />
          </span>
          <br />
          System Status
        </Link>
      </TabPane>
    </Tabs>
  );
};

export default OpsCenterView;
