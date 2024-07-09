import React, { useState, SyntheticEvent, useEffect } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import styles from './JobProperties.module.less';
import Spin from 'src/components/common/Spin';
import { Alert, Input, Radio, Checkbox, Form, Button} from 'antd';
import { useJobPropertiesFetching } from './hooks';
import { useSearchDetailsStateContext } from 'src/stateProviders/useSearchDetailsStateContext';
import Select from 'src/components/common/Select';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { SelectValue } from "antd/lib/select";
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { RadioChangeEvent } from 'antd/lib/radio';
const { Option } = Select;

export type UpdateFormProps = FormComponentProps & {
  onUpdate: (values: any, form: any) => void;
  jobId: any;
  setVisibleJobPro:(visibleJobPro:any) => void;
};

type FormFields = {
  [field: string]: any;
};

type FormConfig = {
  [field: string]: GetFieldDecoratorOptions;
};

const hasErrors = (fieldsError: Record<string, string[] | undefined>): boolean => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};

const formConfig: FormConfig = {
  id: { rules: [{ required: true, message: 'Job ID is required!' }], validateTrigger: 'onBlur' },
  acc_id: { rules: [{ required: true, message: 'Account ID is required!' }], validateTrigger: 'onBlur' },
  choice: { rules: [{ required: true, message: 'Update Settings!' }], validateTrigger: 'onBlur' },
  name: { rules: [{ required: false, message: 'Name is required!' }], validateTrigger: 'onBlur' },
  crawl_style: { rules: [{ required: false, message: 'crawl style change is required!' }], validateTrigger: 'onBlur' },
  crawl_delay: { rules: [{ required: false, message: 'crawl delay change is required!' }], validateTrigger: 'onBlur' },
  crawl_nonstop: {
    rules: [{ required: false, message: 'crawl nonstop change is required!' }],
    validateTrigger: 'onBlur',
  },
};

const hasNoSetupRequiredFields = (fields: FormFields): boolean => {
  return Object.keys(fields).some(
    field =>
      fields[field] === undefined &&
      formConfig[field] !== undefined &&
      formConfig[field].rules !== undefined &&
      formConfig[field].rules!.some(rule => rule.required !== undefined && rule.required)
  );
};

const JobProperties: React.FC<UpdateFormProps> = ({
  onUpdate,
  setVisibleJobPro,
  form }: UpdateFormProps) => {
  const {
    getFieldDecorator,
    getFieldsError,
    getFieldsValue,
    isFieldsTouched,
  } = form;
  const { searchId } = useSearchDetailsStateContext();
  let jobId = searchId;
  const { data, loading, error } = useJobPropertiesFetching(jobId);
  const disableSubmit =
    hasErrors(getFieldsError()) ||
    (isFieldsTouched() && hasNoSetupRequiredFields(getFieldsValue())) ||
    !isFieldsTouched() ||
    loading;


  const onDurHoursChange = (value: SelectValue) => {
    form.setFieldsValue({ job_stop_dur_hour: value });
    return;
  };

  const initialJobPropertiesExecution = data
    ? (data.execution || []).map(type => ({
        activeType: type.activeType,
        label: type.label,
        types: type.types,
      }))
    : [];

  const initialJobPropertiesApps = data
    ? (data.app || []).map(type => ({
        id: type.id,
        name: type.name,
        type: type.type,
        value: type.value,
        details: type.details,
        default: type.default,
        pname: type.pname,
        pval: type.pval,
        activeTable: type.activeTable,
        tables: type.tables,
      }))
    : [];


  const responseLoaded = !loading && (data || error);

  const userId = data?.userId === undefined || "" ? "13278042" : data?.userId;

  const disablededChecked = initialJobPropertiesApps.map(types => (types.pval));
  const disablededCheckedValue = initialJobPropertiesApps.map(types => (types.value));
  const disablededCheckedPname = initialJobPropertiesApps.map(types => (types.pname));

  let initialChecked:boolean = false;
  for (let i = 0; i < disablededChecked.length; i++) {
    if (
      disablededChecked[i] === 'No conversion' &&
      disablededCheckedValue[i] === 'No conversion' &&
      disablededCheckedPname[i] === 'CHANGE_CURRENCY'
    ) {
      initialChecked = true;
    }
  }

  const [conversion, setConversion] = useState<boolean>(initialChecked);
  useEffect(() => {
    setConversion(initialChecked);
  }, [initialChecked]);

  const onChangeINR = (e: CheckboxChangeEvent) => {
    form.setFieldsValue({ noconversion: e.target.checked === true ? 'No conversion' : false });
    setConversion(e.target.checked);
    return;
  };

  const childrensss: any = [];
  childrensss.push(
    data &&
      data.hours.map(sites => {
        return <Option key={sites.value}>{sites.label}</Option>;
      })
  );

  const stopAtSelected = data && data.stopAt.map(types => (types.activeType)).toString();
  const initialRun = stopAtSelected === "1" ? "dur" : "none";
  const [runUpdate, setRunUpdate] = useState<string>(initialRun);
  useEffect(() => {
    setRunUpdate(initialRun);
    if (initialRun === 'none') {
      form.setFieldsValue({ job_stop_calc_type: 'job' });
      form.setFieldsValue({ job_stop_dur_min: '' });
      form.setFieldsValue({ job_stop_dur_hour: '' });
      form.setFieldsValue({ job_stop_abs_min: '' });
      form.setFieldsValue({ job_stop_abs_hour: '' });
    }
  }, [initialRun]);

  const onChangetypes = (e: RadioChangeEvent) => {
    setRunUpdate(e.target.value);
    if (e.target.value === 'none') {
      form.setFieldsValue({ job_stop_calc_type: 'job' });
      form.setFieldsValue({ job_stop_dur_min: '' });
      form.setFieldsValue({ job_stop_dur_hour: '' });
      form.setFieldsValue({ job_stop_abs_min: '' });
      form.setFieldsValue({ job_stop_abs_hour: '' });
    }
  };

  const minutesAPI = data && data.minutes.map(types => (types.minute));
  const initialminutes: any = minutesAPI;
  const [minutechange, setMinutechange] = useState<number>(initialminutes);

  useEffect(() => {
    setMinutechange(initialminutes);
  }, [minutechange]);

  const onChangeNonStop = (e: CheckboxChangeEvent) => {
    form.setFieldsValue({ crawl_nonstop: e.target.checked });
  };

  function executionChange(e: any) {
    form.setFieldsValue({ crawl_style: e.target.value });
  }

  const onJobTableChange = (value: SelectValue) => {
    form.setFieldsValue({ value });
    return;
  };

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((err, values: any) => {
      if (!err) {
        const newSite: any = {
          ...values,
          crawl_nonstop: true ? 'y' : false,
        };
        if (jobId) {
          newSite.ID = jobId;
        }
        onUpdate(newSite, form);
        setVisibleJobPro(false);
      }
    });
    return false;
  };

  return (
    <>
    
          <>
          <h4>Properties for this search.</h4>
          {loading && (
            <div className={styles.filters_spinner}>
              <Spin spinning={loading} />
            </div>
          )}
          {responseLoaded &&
            (error ? (
              <div className={styles.filters_error}>
                <Alert
                  message="An error
            has occurred when trying to get filter list! Please try again later!"
                  type="error"
                  showIcon
                />
              </div>
            ) : (<Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
              {error && <Alert message={error} type="error" showIcon />}
              <table className={styles.jobPropertiesTable}>
                <thead>
                  <tr data-row-key="1200">
                    <th style={{ width: '40%' }}>Option</th>
                    <th style={{ width: '10%' }}>Default Value</th>
                    <th style={{ width: '50%' }}>Setting</th>
                  </tr>
                </thead>
                <tbody className={styles.tobodydiv}>
                  {data && data.name.map((types: any, i: number) => (
                    <tr key={`index-${types.id + i + 1}`}>
                      <td style={{ width: '40%' }}>{types.label === "null Name" ? "Search Name" : types.label}
                        <Form.Item label="" className={styles.hiddenFilds}>
                          {getFieldDecorator(
                            'id', (formConfig.Id, {
                              initialValue: jobId,
                            }))(<Input type="hidden" />)}
                        </Form.Item>
                        <Form.Item label="" className={styles.hiddenFilds}>
                          {getFieldDecorator(
                            'acc_id', (
                            formConfig.Acc_id, {
                              initialValue: userId,
                              rules: [{ required: true, message: '' }],
                            }))(<Input type="hidden" />)}
                        </Form.Item>
                        <Form.Item label="" className={styles.hiddenFilds} >
                          {getFieldDecorator(
                            'choice', (
                            formConfig.SChoices, {
                              initialValue: "Update Settings",
                            }))(<Input type="hidden" />)}
                        </Form.Item>
                      </td>
                      <td style={{ width: '10%' }}>{types.default}</td>
                      <td style={{ width: '50%' }}>
                        <Form.Item label="">
                          {getFieldDecorator(
                            'name', (formConfig.Names, {
                              initialValue: types.value,
                            }))(<Input />)}
                        </Form.Item>
                      </td>
                    </tr>
                  ))}
                  {data && data.hours
                    && data && data.unknown
                    && data && data.stopAt.map((types: any, i: number) => (
                      <tr data-row-key={`index-${types.id + i + 1}`}>
                        <td style={{ width: '40%' }}>{types.label === "Stop null At" ? "Stop Search At" : types.label}</td>
                        <td style={{ width: '10%' }}><span>Never</span>
                        </td>
                        <td style={{ width: '50%' }}>
                          <Form.Item label="" className={styles.stopAtOne}>
                            {getFieldDecorator(
                              'job_stop_type', (formConfig.SSChoice, {
                                initialValue: types.activeType === "-1" ? "none"
                                  : types.activeType === "0" ? "abs"
                                    : types.activeType === "1" ? "dur"
                                      : "(blank)"
                              }))(
                                <Radio.Group name={'jobStopType'} onChange={onChangetypes}>
                                  <Radio value="none" >Never - allow it to complete normally</Radio><br />
                                  <Radio value="abs">Abort at</Radio>
                                  {data && data.absolute.map(typesss => (
                                    <div className={styles.stopAtTwo}>
                                      <span style={{ display: 'inline-flex' }} >
                                        <Form.Item label="" className={styles.stopAtOne}>
                                          {getFieldDecorator(
                                            'job_stop_abs_hour', (formConfig.Csshoice, {
                                              initialValue: types.activeType === '0' ? typesss.hour : '12 midnight',
                                            }))(<Select
                                              onChange={onDurHoursChange}
                                              className={styles.widthinput}
                                            >{childrensss}
                                            </Select>
                                            )} and
                                    </Form.Item>
                                        <Form.Item label="" className={styles.stopAtOne}>
                                          {getFieldDecorator(
                                            "job_stop_abs_min", (formConfig.Chossice, {
                                              initialValue: types.activeType === '0' ? typesss.minute : '',
                                            }))(<Input type="text" maxLength={2} className={styles.widthinput} />)} minutes.</Form.Item></span>
                                    </div>
                                  ))}
                                  <Radio value="dur" style={{ float: 'left', clear: 'both' }}>Abort after</Radio>
                                  <div className={styles.stopAtTwo}>
                                    {data && data.minutes.map(typesss => (<div>
                                      <Form.Item label="" className={styles.stopAtOne}>
                                        {getFieldDecorator(
                                          "job_stop_dur_hour", (formConfig.Choicsse, {
                                            initialValue: typesss.hour,
                                          }))(<Input type="text" maxLength={3} className={styles.widthinput} />)} hours and
                                  </Form.Item>
                                      <Form.Item label="" className={styles.stopAtOne}>
                                        {getFieldDecorator(
                                          "job_stop_dur_min", (formConfig.Choicessss, {
                                            initialValue: typesss.minute,
                                          }))(<Input type="text"  maxLength={2} className={styles.widthinput} />
                                          )} minutes. </Form.Item></div>))}
                                    <Form.Item label={'Abort after : '} className={styles.stopAtTwo}>
                                      {getFieldDecorator(
                                        'job_stop_calc_type', (formConfig.AbortAfter, {
                                          initialValue: types.calcType,
                                        }))(<Radio.Group disabled={runUpdate === 'dur' ? false : true} >
                                          <Radio value="job">Run start time </Radio><br />
                                          <Radio value="wu">Actual start time</Radio>
                                        </Radio.Group>
                                        )}
                                    </Form.Item>
                                  </div>
                                </Radio.Group>)}
                          </Form.Item>
                        </td>
                      </tr>
                    ))}

                  {initialJobPropertiesApps && initialJobPropertiesApps.map((types: any, i: number): React.ReactNode => (types.pname === "JOB_TABLE" ?
                    initialJobPropertiesExecution && initialJobPropertiesExecution.map((typesss: any): React.ReactNode => (typesss.activeType !== undefined ?
                      <tr data-row-key={`index-${types.id + i}` + 2}>
                        <td style={{ width: '40%' }}>{typesss.label}<br />
                          <h6>{typesss.details}</h6>
                        </td>
                        <td style={{ width: '10%' }}>{typesss.activeType}</td>
                        <td style={{ width: '50%' }}>
                          <Form.Item label="">{getFieldDecorator(
                            'crawl_style', (formConfig.JobTable, {
                              initialValue: typesss.activeType,
                            }))(<Radio.Group onChange={executionChange}>
                              <Radio value="normal">Normal (continuous execution)</Radio><br />
                              <Radio value="crawl" >Pause {getFieldDecorator(
                                'crawl_delay', (formConfig.ExecutionDelay, {
                                  initialValue: typesss.types.crawl.delay.value,
                                }))(<Input className={styles.widthinput} />)}
                                {typesss.types.crawl.delay.units} between search items.<br />
                                {getFieldDecorator(
                                  'crawl_nonstop', (formConfig.ExecutionNonStop, {
                                    initialValue: `${typesss.types.crawl.delay.nonStop}`,
                                  }))(<Checkbox onChange={onChangeNonStop}  defaultChecked={typesss.types.crawl.delay.nonStop}>Restart when finished</Checkbox>)}
                              </Radio><br />
                            </Radio.Group>)}
                          </Form.Item>
                        </td>
                      </tr>
                    : '')) : ''
                  ))}
                  {initialJobPropertiesApps && initialJobPropertiesApps.map((types: any, i: number): React.ReactNode => (
                    <tr data-row-key={`index-${types.id + i}` + 1}>
                      <td style={{ width: '40%' }}><div className={styles.lineBreke}>{types.pname === 'CHANGE_CURRENCY' ? types.name.slice(0, 41)+'\n'+types.name.slice(41, 10000000) 
                      : types.pname === 'LOWESTFARE' ? types.name.slice(0, 45)+'\n'+types.name.slice(47, 10000000) 
                      : types.pname === 'ONEWAYS' ? types.name.slice(0, 37)+'\n'+types.name.slice(38, 10000000) 
                      :  types.name}</div>
                        <h6>{types.details}</h6>
                      </td>
                      <td style={{ width: '10%' }}>{types.default === "" ? "(blank)" : types.default}</td>
                      <td style={{ width: '50%' }}>
                        {types.type === "boolean" ?
                          <Form.Item label="">{getFieldDecorator(
                            `${types.id}`, (formConfig.AppsRadios, {
                              initialValue: types.value,
                            }))(<Radio.Group name={'appsRadio'}>
                              <Radio value="0">No </Radio>
                              <Radio value="1">Yes</Radio>
                              <Radio value="">User Account Setting</Radio>
                            </Radio.Group>)}
                          </Form.Item>
                          : types.type === "number" ?
                            <Form.Item label="">{getFieldDecorator(
                              `${types.id}`, (formConfig.AppsRadioss, {
                                initialValue: types.value,
                              }))(<Input type="text" />)}
                            </Form.Item>
                            : types.pname === "JOB_TABLE" ?
                              <Form.Item label="">{getFieldDecorator(
                                `${types.id}`, (formConfig.JobTable, {
                                  initialValue: types.activeTable,
                                }))(<Select onChange={onJobTableChange}  className={styles.widthinputTwo} >
                                  {types.tables && types.tables.map((jobTable: { value: React.Key | undefined; label: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
                                    return (<Option value={jobTable.value} key={jobTable.value}>{jobTable.label}</Option >);
                                  }
                                  )}
                                </Select>)}
                              </Form.Item>
                              : types.pname === "CHANGE_CURRENCY" ?
                                <><Form.Item label="" className={styles.pmBottom}>
                                  {getFieldDecorator(
                                    `${types.id}`, (formConfig.AppsCheckboxINR, {
                                      initialValue: types.value === 'No conversion' ? '' : types.value,
                                    }))(<Input type="text" disabled={conversion} className={styles.pmBottom} />)}
                                </Form.Item>
                                  <Form.Item>
                                    {getFieldDecorator('noconversion', {
                                      initialValue: initialChecked,
                                    })(<Checkbox onChange={onChangeINR} checked={conversion}>No conversion</Checkbox>)}
                                    {getFieldDecorator(
                                      'id_curr_val', (formConfig.IdCurrVal, {
                                        initialValue: types.id,
                                      }))(<Input type="hidden" />)}
                                  </Form.Item>
                                </>
                                : types.pname === "email" ?
                                  <>
                                    <Form.Item label="">{getFieldDecorator(
                                      `${types.id}`, (formConfig.Changevalue, {
                                        initialValue: types.value,
                                      }))(<Input type="text" />)}
                                    </Form.Item></>
                                  : <Form.Item label="">{getFieldDecorator(
                                    `${types.id}`, (formConfig.ChangevalueOther, {
                                      initialValue: types.value,
                                    }))(<Input type="text" />)}
                                  </Form.Item>}
                        <Form.Item label="" className={styles.hiddenFilds}>
                          {getFieldDecorator(
                            `pname_${types.id}`, (formConfig.Pnames, {
                              initialValue: types.pname,
                            }))(<Input type="hidden" />)}
                        </Form.Item>
                        <Form.Item label="" className={styles.hiddenFilds}>
                          {getFieldDecorator(
                            `pval_${types.id}`, (formConfig.Pvals, {
                              initialValue: types.pval,
                            }))(<Input type="hidden" />)}
                        </Form.Item>
                      </td>
                    </tr>
                  ))}

                  <tr className={styles.bordernone} data-row-key={`index2_${110}`}>
                    <td style={{ width: '40%' }}></td>
                    <td style={{ width: '10%' }}></td>
                    <td style={{ width: '50%' }}>
                      <Button type="primary" htmlType="submit" disabled={disableSubmit} className={styles.save_new_client}> Update</Button>
                      <Button type="primary" onClick={setVisibleJobPro}> Close</Button>
                    </td></tr>
                </tbody>
              </table>
            </Form>))}
            </>
           
  </>);
};
const WrappedJobPropertiesForm = Form.create<UpdateFormProps>({ name: 'jobPropeties' })(JobProperties);
export default WrappedJobPropertiesForm;
