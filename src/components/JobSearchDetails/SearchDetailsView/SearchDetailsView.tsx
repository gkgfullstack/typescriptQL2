import React from 'react';
import { useParams } from 'react-router';
import { Row, Col, Layout, Button, Modal } from 'antd';
import {
  useSearchDetailsDispatchContext,
  useSearchDetailsStateContext,
} from 'src/stateProviders/useSearchDetailsStateContext';
import { SEARCH_DETAILS_ACTION_TYPES, SearchDetailsState } from 'src/stateProviders/searchDetailsStateProvider';
import SearchDetailList from '../SearchDetailList/SearchDeatilsList';
import SearchDtlSummary from '../SearchDetailSummary/SearchDetailSummary';
import ScheduleDetailList from '../ScheduleDetailList/ScheduleDeatilsList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PreviewTable from '../PreviewTable';
import UploadSearch from '../UploadSearch';
import AddLineItemBtn from '../AddLineItemBtn/AddLineItemBtn';
import AddSchedule from '../AddSchedule';
import UserContex from 'src/services/UserContex';

type SearchDetailsViewProps = {
  form?: any;
};

const SearchDetailsView: React.FC<SearchDetailsViewProps> = ({ form }) => {
  const { id }: any = useParams();
  const { seachDtlSummary } = useSearchDetailsStateContext();
  const searchDetailsDispatch = useSearchDetailsDispatchContext(); 
 
  React.useEffect(() => {
    if (id && searchDetailsDispatch) {
      searchDetailsDispatch({
        type: SEARCH_DETAILS_ACTION_TYPES.setSearchId,
        payload: { searchId: id } as SearchDetailsState,
      });
    }
  }, [id, searchDetailsDispatch]);
  const basURL = UserContex.getBaseUrl();
  const url = basURL + '/rest/lines/' + id + '/' + seachDtlSummary?.jobName + seachDtlSummary?.dwnLdType;
  const [visible, setVisible] = React.useState<any>(false);
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible({
      visible: false,
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onSubmit = () => {};

  return (
    <Layout>
      <Row style={{ marginBottom: '10px' }}>
        <Col span={24} className="gutter-row">
          <SearchDtlSummary />
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <div className="box" style={{ minHeight: '200px' }}>
            <Row style={{ marginBottom: '0px' }}>
              <Col span={4}>
                <h2 style={{ fontWeight: 600, lineHeight: '12px' }}>Inputs</h2>
              </Col>
              <Col span={13}>
                <div className="downlbl"></div>
              </Col>
              <Col span={4}>
                <AddLineItemBtn
                  vertical={seachDtlSummary?.applicationName}
                  searchName={seachDtlSummary?.jobName}
                  jobId={id !== undefined ? id : 0}
                  form={form}
                />
              </Col>
              <Col span={3}>
                <UploadSearch />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <SearchDetailList />
              </Col>
            </Row>
            <Row
              style={{
                borderTop: '1px solid #f5f5f5',
                padding: '10px 5px 0px 10px',
                margin: '-1px ?0px 0px',
                lineHeight: '10px',
              }}
            >
              <Col span={9}>
                <div className="downlbl">
                  <h4>Total Estimated Inputs:</h4> {seachDtlSummary?.totalInput}
                </div>
              </Col>
              <Col span={8}>
                <div className="downlbl"></div>
              </Col>
              <Col span={7}>
                <div className="downlbl">
                  <h4>Compiled Inputs:</h4>
                  <Button
                    type="link"
                    className="btn"
                    onClick={showModal}
                    style={{ padding: '0px', minWidth: 'auto', lineHeight: '10px', marginTop: '-5px', height: 'auto' }}
                  >
                    <FontAwesomeIcon icon={['fal', 'eye']} color={'gray'} />
                  </Button>
                  <Modal
                    title={[
                      <div className="modalHeadershow" key={'search_details_view_modal'}>
                        <div style={{ float: 'right' }}>
                          <a
                            href={url}
                            className="item"
                            rel="noopener noreferrer"
                            style={{
                              marginLeft: '10px',
                              marginTop: '2px',
                              fontSize: '12px',
                              marginBottom: '10px',
                              display: 'inline-block',
                            }}
                          >
                            <FontAwesomeIcon
                              icon={['fal', 'download']}
                              color={'gray'}
                              style={{ marginRight: '10px' }}
                            />{' '}
                            Download
                          </a>
                        </div>
                      </div>,
                    ]}
                    style={{ top: 20 }}
                    visible={visible}
                    footer={false}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    className="modalshowfull"
                  >
                    <PreviewTable />
                  </Modal>
                  <a
                    href={url}
                    className="item"
                    rel="noopener noreferrer"
                    style={{ marginLeft: '10px', marginTop: '-1px' }}
                  >
                    <FontAwesomeIcon icon={['fal', 'download']} color={'gray'} />
                  </a>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={8}>
          <div className="box" style={{ minHeight: '252px', marginLeft: '10px', maxHeight: '252px' }}>
            <Row style={{ marginBottom: '0px' }}>
              <Col span={18}>
                <h2>Schedule</h2>
              </Col>
              <Col span={6} style={{ textAlign: 'right' }}>
                <AddSchedule onSubmit={onSubmit} timeZone={seachDtlSummary?.timeZone} fromPage="jobdetail" />{' '}
              </Col>
            </Row>
            <ScheduleDetailList />
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default SearchDetailsView;
