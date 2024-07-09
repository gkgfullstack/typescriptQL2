import React, { 
  //useState 
} from 'react';
import { Row, Col, Layout, 
  //Drawer, Button 
} from 'antd';
//import styles from './QSDashboard.module.less';
import ActiveQueued from '../ActiveQueued'
import Scheduled from '../Scheduled'
//import LowQuality from '../LowQuality'
import RCSearchs from '../RCSearchs'
//import Reports from '../Reports'
import QualityIndex from '../QualityIndex'
import CreateNewSearch from 'src/components/CreateNewSearch';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


type QSDashboardViewProps = {};

const QSDashboardView: React.FC<QSDashboardViewProps> = () => {
  const onSubmit = () => {

  }
  // const [visible, setVisible] = useState(false);
  // const showDrawer = () => {
  //   setVisible(true);
  // };
  // const onClose = () => {
  //   setVisible(false);
  // };
  return (
    <Layout>
      <Row style={{ marginBottom: '24px' }}>
        <Col span={12} className="gutter-row">
          <CreateNewSearch onSubmit={onSubmit} />
        </Col>
        <Col span={12} className="gutter-row">
          {/* <div
            style={{
              float: 'right',
            }}
          >
            <>
              <span className={styles.avatarItem}>
                <Button type="link" onClick={showDrawer}>
                  <FontAwesomeIcon size={"lg"} icon={['fal', 'comment-dots']} /> &nbsp; What&#39;s New
                </Button>
                </span>
              <Drawer
                title="Basic Drawer"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
              >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Drawer>
            </>
          </div> */}
        </Col>
      </Row>

      <Row className="box" style={{ marginBottom: '24px' }}>
        <Col span={16} className="gutter-row">
          <ActiveQueued />
        </Col>
        <Col span={8} className="gutter-row">
          <Scheduled />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={14} className="gutter-row">
          <div className="box" style={{ minHeight: '480px' }}>
            <RCSearchs />
          </div>
        </Col>
        <Col span={10} className="gutter-row">
          <div className="box"  >
            <h2>Quality Index</h2>
            <div className="box" style={{ minHeight: '347px', padding: '0px 0px 0px 5px' }}>
              <QualityIndex />
            </div>
          </div>
        </Col>
  
      </Row>
    </Layout>
  );
};
export default QSDashboardView;
