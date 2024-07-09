import React, { useState } from 'react';
import { Button, Checkbox, message, Popconfirm } from 'antd';
import Modal from 'src/components/common/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useJobActionFetch from './hooks/useJobActionFetch';
import { JobActionInputs } from 'src/api/jobSearchAction';
import styles from './JobAction.module.less';
import JobSearchInfo from 'src/types/JobSearchInfo';
import AddSchedule from 'src/components/JobSearchDetails/AddSchedule';
import UserContex from 'src/services/UserContex';

const MESSAGE_DURATION = 2;

export type JobActionProps = {
  useJobActionFetch: (val: string) => void;
  selectedRowKeyVal?: JobSearchInfo[];
  isPageType?: any;
  disabled: boolean;
};
const JobAction: React.FC<JobActionProps> = ({ selectedRowKeyVal, isPageType, disabled }) => {
  const isAdminMode: boolean = localStorage.getItem('bAdminMode') === 'true';
  const [, { jobaction }] = useJobActionFetch('');
  const [disableArc, setDisableArc] = useState<boolean>(false);
  let names = '';
  let userId = '';
  let runIds = '';
  let jobides = '';
  React.useEffect(() => {
    const formActive = document.getElementById('active');
    const formStar = document.getElementById('star');
    const formArchive = document.getElementById('archive');
    if (formActive !== null && isPageType === 'Active') formActive.style.display = 'None';
    if (formStar !== null && isPageType === 'Starred') formStar.style.display = 'None';
    if (formArchive !== null && isPageType === 'Archive') {
      setDisableArc(true);
    } else {
      if (formActive !== null && isPageType === undefined) formActive.style.display = 'inline-block';
      if (formActive !== null && isPageType === 'Schedule') formActive.style.display = 'inline-block';
      setDisableArc(false);
    }
  }, [isPageType]);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [priority, setPriority] = useState(false);
  const [softabort, setSoftAbort] = useState(true);
  const [reassign, setReassign] = useState('');

  const handleClick = () => setSoftAbort(!softabort);
  const handleClickPriority = () => setPriority(!priority);

  if (selectedRowKeyVal !== undefined) {
    for (let i = 0; i < selectedRowKeyVal.length; i++) {
      names = selectedRowKeyVal[i].name + ' , ' + names;

      runIds = selectedRowKeyVal[i].runId + ',' + runIds;
      userId = selectedRowKeyVal[i].owner;
      jobides = selectedRowKeyVal[i].id + ',' + jobides;
    }
    names = names.substring(0, names.length - 2);
    runIds = runIds.substring(0, runIds.length - 2);
  }

  function jobActionBtn(jobAction: string) {
    if (selectedRowKeyVal !== undefined) {
      let jobIds = '';
      let runIds = '';

      for (let i = 0; i < selectedRowKeyVal.length; i++) {
        jobIds = selectedRowKeyVal[i].id + ',' + jobIds;
        runIds = selectedRowKeyVal[i].runId + ',' + runIds;
      }
      if (selectedRowKeyVal.length < 1) {
        message.warning('Please select at least one ', MESSAGE_DURATION);
        return;
      }
      const jobActionInputs: JobActionInputs = {
        jobIds: jobIds,
        jobAction: jobAction,
        runIds: runIds,
        softAbort: String(softabort),
        highPriority: String(priority),
        reAssignName: reassign,
      };
      let r;
      if (jobAction === 'start') {
        setVisible(false);
        r = true;
      }
      if (jobAction === 'end') {
        setVisible1(false);
        r = true;
      }
      if (jobAction === 'archive') {
        r = true;
      }
      if (jobAction === 'star') {
        r = true;
      }
      if (jobAction === 'unstar') {
        r = true;
      }
      if (jobAction === 'DelSchedule') {
        r = true;
      }
      if (jobAction === 'ReAssign') {
        if (reassign.trim() === '') {
          message.warning('Please enter user name', MESSAGE_DURATION);
          return;
        }
        setVisible2(false);
        r = true;
      }
      if (r === true) {
        jobaction(jobActionInputs);
      }
    }
  }
  function cancel() {}
  const onSubmit = () => {};

  const ButtonGroup = Button.Group;

  return (
    <span className={disabled ? styles.disabled : ''}>
      {disableArc === false && (
        <>
          <ButtonGroup className="btngroups">
            <Button
              id="active"
              type="link"
              onClick={(): void => {
                setVisible(true);
              }}
              disabled={disabled}
            >
              <FontAwesomeIcon icon={['fal', 'play-circle']} /> Start
            </Button>
            <Button
              id="end"
              type="link"
              onClick={() => {
                setVisible1(true);
              }}
              disabled={disabled}
            >
              <FontAwesomeIcon icon={['fal', 'stop-circle']} /> End
            </Button>
            <Popconfirm
              placement="rightTop"
              title="Are you sure you want to delete the selected search from the list ?"
              onConfirm={() => {
                jobActionBtn('archive');
              }}
              onCancel={() => {
                cancel();
              }}
              okText="Yes"
              cancelText="No"
              icon={null}
              className="deleteBTN"
              disabled={disabled}
            >
              <Button id="archive" type="link" disabled={disabled} style={disabled ? { marginLeft: 8 } : {}}>
                <FontAwesomeIcon icon={['fal', 'archive']} /> Archive
              </Button>
            </Popconfirm>
            <AddSchedule
              onSubmit={onSubmit}
              timeZone={UserContex.getTimeZone()}
              searchId={jobides}
              fromPage="jobpage"
              disabled={disabled}
            />
            <Popconfirm
            placement="rightTop"
              title="Are you sure you want to clear the schedule?"
              cancelText="No, keep it for now"
              okText="Yes, I am sure"
              icon={null}
              onConfirm={() => {
                jobActionBtn('DelSchedule');
              }}
              onCancel={() => {
                cancel();
              }}
              //onCancel={handleDeleteConfirm}
              disabled={disabled}
            >
              <Button id="DelSchedule" type="link" disabled={disabled} style={disabled ? { marginLeft: 8 } : {}}>
                <FontAwesomeIcon icon={['fal', 'trash-alt']} /> Remove Schedule{' '}
              </Button>
            </Popconfirm>
            {isAdminMode && (
              <Button
                type="link"
                onClick={() => {
                  setVisible2(true);
                }}
                disabled={disabled}
              >
                <FontAwesomeIcon icon={['fal', 'user']} /> Reassign
              </Button>
            )}
            <Popconfirm
              placement="rightTop"
              title="Do you  want to star now ?"
              disabled={disabled}
              onConfirm={() => {
                jobActionBtn('star');
              }}
              onCancel={() => {
                cancel();
              }}
              okText="Yes"
              cancelText="No"
              icon={null}
            >
              <Button id="star" type="link" disabled={disabled} style={disabled ? { marginLeft: 8 } : {}}>
                <FontAwesomeIcon icon={['fal', 'star']} /> Star{' '}
              </Button>
            </Popconfirm>
            <Popconfirm
              placement="rightTop"
              title="Do you  want to unstar now ?"
              disabled={disabled}
              onConfirm={() => {
                jobActionBtn('unstar');
              }}
              onCancel={() => {
                cancel();
              }}
              okText="Yes"
              cancelText="No"
              icon={null}
            >
              <Button id="unstar" type="link" disabled={disabled} style={disabled ? { marginLeft: 8 } : {}}>
                <FontAwesomeIcon icon={['fal', 'star']} /> Unstar{' '}
              </Button>
            </Popconfirm>
          </ButtonGroup>
          <Modal
            title="Start Search"
            visible={visible}
            onCancel={(): void => {
              setVisible(false);
            }}
            okText="Start"
            onOk={() => {
              jobActionBtn('start');
            }}
          >
            <p>Start the following search(es)?</p>
            <p>{names}</p>
            <div>
              <Checkbox name="priority" onClick={handleClickPriority}>
                High Priority{' '}
              </Checkbox>
            </div>
          </Modal>
          <Modal
            title="Please Confirm"
            visible={visible1}
            onCancel={(): void => {
              setVisible1(false);
            }}
            okText="OK"
            onOk={() => {
              jobActionBtn('end');
            }}
          >
            <p>
              You are about to abort run ID <b> {runIds} </b>. This run is for jobs <b>{names}</b>, owned by{' '}
              <b>{userId}</b>.
            </p>
            <p>Proceed?</p>
            <div>
              <Checkbox name="softabort" defaultChecked onClick={handleClick}>
                Soft Abort{' '}
              </Checkbox>
            </div>
          </Modal>
          {isAdminMode && (
            <Modal
              title="Reassign"
              visible={visible2}
              onCancel={(): void => {
                setVisible2(false);
              }}
              okText="OK"
              onOk={() => {
                jobActionBtn('ReAssign');
              }}
            >
              <div>
                <label className="labels">User : </label>
                <input id="reassign" type="text" className="inputs" onChange={e => setReassign(e.target.value)} />
              </div>
            </Modal>
          )}
        </>
      )}
    </span>
  );
};
export default JobAction;
