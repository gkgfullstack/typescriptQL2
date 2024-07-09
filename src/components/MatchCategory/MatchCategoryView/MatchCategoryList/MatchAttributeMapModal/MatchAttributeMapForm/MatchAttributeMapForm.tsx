import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Col, Row, Input, Button } from 'antd';
import styles from './MatchAttributeMapForm.module.less';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Collapse } from 'antd';
import {
  useGetMatchAttributeOwners,
  useGetMatchAttributeLocations,
  useGetRawAttributeNames,
} from 'src/api/matchAttributeMap';
import { faSyncAlt } from '@fortawesome/pro-duotone-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
const faSyncAltPropIcon = faSyncAlt as IconProp;

const { Panel } = Collapse;
const { Option } = Select;

type MatchAttributeMapFormProps = FormComponentProps & {
  matchAttribute: any;
  matchAttributeMap?: any;
  onSave: (values: any) => void;
};

type FormConfig = {
  [field: string]: GetFieldDecoratorOptions;
};

const isJSONInvalid = (json: string) => {
  if (!json || json.trim() === '') {
    return false;
  }
  try {
    return !JSON.parse(json);
  } catch (e) {
    return true;
  }
};

const formConfig: FormConfig = {
  ownerId: { rules: [{ required: true, message: 'Site is required!' }], validateTrigger: 'onBlur' },
};

export const MatchAttributeMapForm: React.FC<MatchAttributeMapFormProps> = ({
  form,
  matchAttribute,
  matchAttributeMap,
  onSave,
}: MatchAttributeMapFormProps) => {
  const [sitesOptions] = useGetMatchAttributeOwners(matchAttribute.ID);
  const [locationsOptions] = useGetMatchAttributeLocations();
  const { getFieldDecorator, getFieldsValue } = form;
  const [selectedSite, setSelectedSite] = useState<any>(undefined);
  const [selectedLocation, setSelectedLocation] = useState<any>(undefined);
  const [rawAttributeNamesRequest, setRawAttributeNamesRequest] = useState<any>({});
  const [rawAttributeNamesOptions] = useGetRawAttributeNames(selectedLocation, rawAttributeNamesRequest);
  const [selectedRawAttributeName, setSelectedRawAttributeName] = useState<any>(undefined);
  const [attributeDefinitions, setAttributeDefinitions] = useState<any>([]);
  const [normalizationsAfter, setNormalizationsAfter] = useState<string>('');
  const [normalizationsBefore, setNormalizationsBefore] = useState<string>('');

  useEffect(() => {
    if (matchAttributeMap && form) {
      if (matchAttributeMap.ownerId) {
        form.setFieldsValue({ ownerId: matchAttributeMap.ownerId.toString() });
        setSelectedSite(matchAttributeMap.ownerId.toString());
      }
      if (matchAttributeMap.matchAttributeLocation) {
        if (
          matchAttributeMap.matchAttributeLocation === 'product_property' ||
          matchAttributeMap.matchAttributeLocation === 'product_specifications'
        ) {
          setRawAttributeNamesRequest({
            matchAttributeDefinition: {
              matchAttributeId: Number(matchAttribute.ID),
              ownerId: Number(matchAttributeMap.ownerId),
              items: [],
            },
          });
        }
        form.setFieldsValue({ matchAttributeLocation: matchAttributeMap.matchAttributeLocation });
        setSelectedLocation(matchAttributeMap.matchAttributeLocation);
      }
      if (matchAttributeMap.rawAttributeName) {
        form.setFieldsValue({ rawAttributeName: matchAttributeMap.rawAttributeName });
        setSelectedRawAttributeName(matchAttributeMap.rawAttributeName);
      }
      if (matchAttributeMap.regexParse) {
        form.setFieldsValue({ regexParse: matchAttributeMap.regexParse });
      }
      if (matchAttributeMap.defaultValue) {
        form.setFieldsValue({ defaultValue: matchAttributeMap.defaultValue });
      }
      if (matchAttributeMap.defaultMeasurementUnit) {
        form.setFieldsValue({ defaultMeasurementUnit: matchAttributeMap.defaultMeasurementUnit });
      }
      if (matchAttributeMap.normalizationsAfterRegexParse) {
        form.setFieldsValue({ normalizationsAfterRegexParse: matchAttributeMap.normalizationsAfterRegexParse });
        setNormalizationsAfter(matchAttributeMap.normalizationsAfterRegexParse);
      }
      if (matchAttributeMap.normalizationsBeforeRegexParse) {
        form.setFieldsValue({ normalizationsBeforeRegexParse: matchAttributeMap.normalizationsBeforeRegexParse });
        setNormalizationsBefore(matchAttributeMap.normalizationsBeforeRegexParse);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchAttributeMap]);

  const disableSubmit = () => {
    return (
      !getFieldsValue().ownerId ||
      getFieldsValue().ownerId === '' ||
      !getFieldsValue().matchAttributeLocation ||
      getFieldsValue().matchAttributeLocation === '' ||
      !getFieldsValue().rawAttributeName ||
      getFieldsValue().rawAttributeName === '' ||
      isJSONInvalid(getFieldsValue().normalizationsAfterRegexParse) ||
      isJSONInvalid(getFieldsValue().normalizationsBeforeRegexParse)
    );
  };

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((err, values: any) => {
      if (!err) {
        const newMatchAttributeMap: any = {
          ownerId: Number(values.ownerId),
          matchAttributeLocation: values.matchAttributeLocation,
          rawAttributeName: values.rawAttributeName,
          regexParse: values.regexParse,
          defaultValue: values.defaultValue,
          defaultMeasurementUnit: values.defaultMeasurementUnit,
        };
        if (values.normalizationsAfterRegexParse) {
          newMatchAttributeMap.normalizationsAfterRegexParse = values.normalizationsAfterRegexParse;
        }
        if (values.normalizationsBeforeRegexParse) {
          newMatchAttributeMap.normalizationsBeforeRegexParse = values.normalizationsBeforeRegexParse;
        }
        if (matchAttribute.ID) {
          newMatchAttributeMap.matchAttributeId = Number(matchAttribute.ID);
        }
        if (matchAttributeMap) {
          newMatchAttributeMap.ID = matchAttributeMap.matchAttributeMapId;
        }
        onSave(newMatchAttributeMap);
      }
    });
    return false;
  };

  const onSiteChange = (value: SelectValue) => {
    form.setFieldsValue({ ownerId: value });
    setSelectedSite(value);
  };

  const onLocationChange = (value: SelectValue) => {
    form.setFieldsValue({ matchAttributeLocation: value });
    setSelectedLocation(value);
    setSelectedRawAttributeName(undefined);
    if (value === 'product_property' || value === 'product_specifications') {
      setRawAttributeNamesRequest({
        matchAttributeDefinition: {
          matchAttributeId: Number(matchAttribute.ID),
          ownerId: Number(selectedSite),
          items: [],
        },
      });
    }
  };

  const onRawAttributeNameChange = (value: SelectValue) => {
    form.setFieldsValue({ rawAttributeName: value });
    setSelectedRawAttributeName(value);
  };

  const onSearchFilter = (input: string, option: ReactElement) => {
    const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
    return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const onAddAttributeDefinition = () => {
    const newAttributeDefinitions = [...attributeDefinitions];
    newAttributeDefinitions.push([
      {
        visible: true,
        id: 'productName',
        label: 'Product Name',
        value: '',
      },
      {
        visible: true,
        id: 'category',
        label: 'Category',
        value: '',
      },
      {
        visible: true,
        id: 'propertyName',
        label: 'Property Name',
        value: '',
      },
    ]);
    setAttributeDefinitions(newAttributeDefinitions);
  };

  const onRemoveAttributeDefinition = (index: number, definition: any) => {
    return () => {
      const newAttributeDefinitions = [...attributeDefinitions];
      newAttributeDefinitions[index] = newAttributeDefinitions[index].map((item: any) => {
        if (item.label === definition.label) {
          item.visible = false;
        }
        return item;
      });
      setAttributeDefinitions(newAttributeDefinitions);
    };
  };

  const onChangeAttributeDefinition = (index: any, definition: any) => {
    return (event: any) => {
      const newAttributeDefinitions = [...attributeDefinitions];
      newAttributeDefinitions[index] = newAttributeDefinitions[index].map((item: any) => {
        if (item.label === definition.label) {
          item.value = event.target.value;
        }
        return item;
      });
      setAttributeDefinitions(newAttributeDefinitions);
    };
  };

  const isAttributeDefinitionsVisible = () => {
    return selectedLocation === 'product_property' || selectedLocation === 'product_specifications';
  };

  const getErrorMessage = (value: string) => {
    return isJSONInvalid(value) ? 'JSON is not valid' : '';
  };

  const onNormalizationsAfterChange = (event: any) => {
    form.setFieldsValue({ normalizationsAfterRegexParse: event.target.value });
    setNormalizationsAfter(event.target.value);
  };

  const onNormalizationsBeforeChange = (event: any) => {
    form.setFieldsValue({ normalizationsBeforeRegexParse: event.target.value });
    setNormalizationsBefore(event.target.value);
  };

  const getTitle = () => {
    return matchAttributeMap ? 'Edit Match Attribute Map' : 'Create Match Attribute Map';
  };

  const getSubmitLabel = () => {
    return matchAttributeMap ? 'Save Match Attribute Map' : 'Create Match Attribute Map';
  };

  const getAttributeDefinitions = () => {
    const items: any = [];

    attributeDefinitions.forEach((item: any) => {
      const attributeDefinition: any = {};
      let isPropertyExisted = false;

      item.forEach((property: any) => {
        if (property.value && property.visible) {
          attributeDefinition[property.id] = property.value;
          isPropertyExisted = true;
        }
      });

      if (isPropertyExisted) {
        items.push(attributeDefinition);
      }
    });

    return items;
  };

  const onRawAttributeNamesRefresh = () => {
    const newRequest = {
      matchAttributeDefinition: {
        matchAttributeId: Number(matchAttribute.ID),
        ownerId: Number(selectedSite),
        items: getAttributeDefinitions(),
      },
    };
    setRawAttributeNamesRequest(newRequest);
  };

  return (
    <div className={styles.create_form_wrapper}>
      <h1 className={styles.create_title}>{getTitle()}</h1>
      <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
        <div>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Site:">
                {getFieldDecorator('ownerId', {
                  valuePropName: 'any',
                })(
                  <Select
                    placeholder="Select Site"
                    onChange={onSiteChange}
                    allowClear
                    showSearch
                    value={selectedSite}
                    filterOption={onSearchFilter}
                    disabled={!!matchAttributeMap}
                  >
                    {sitesOptions.map(
                      (option: any, i: number): React.ReactNode => {
                        return (
                          <Option value={option.ID} key={`match-attribute-map-site-${option.name}-${i}`}>
                            {option.name}
                          </Option>
                        );
                      }
                    )}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Match Attribute Location:">
                {getFieldDecorator('matchAttributeLocation', {
                  valuePropName: 'any',
                })(
                  <Select
                    placeholder="Select Match Attribute Location"
                    onChange={onLocationChange}
                    allowClear
                    showSearch
                    value={selectedLocation}
                    filterOption={onSearchFilter}
                  >
                    {locationsOptions.map(
                      (option: any, i: number): React.ReactNode => {
                        return (
                          <Option value={option.name} key={`match-attribute-location-${option.name}-${i}`}>
                            {option.name}
                          </Option>
                        );
                      }
                    )}
                  </Select>
                )}
              </Form.Item>
            </Col>
            {isAttributeDefinitionsVisible() && (
              <Col span={24}>
                <div className={styles.add_attribute_definition_wrapper}>
                  <label>Attribute Definition:</label>
                  <div>
                    {attributeDefinitions.map((item: any, index: number) => {
                      return item.map((definition: any) => {
                        if (!definition.visible) {
                          return false;
                        }
                        return (
                          <div
                            className={styles.add_attribute_definition_item}
                            key={`attribute-definition-${definition.label}`}
                          >
                            <label>{definition.label}</label>
                            <Input
                              type="text"
                              placeholder={`Please enter ${definition.label}`}
                              onChange={onChangeAttributeDefinition(index, definition)}
                            />
                            <span
                              onClick={onRemoveAttributeDefinition(index, definition)}
                              title={'Remove this Attribute Definition'}
                            >
                              <FontAwesomeIcon
                                icon={['fal', 'minus']}
                                className={styles.add_attribute_definition_icon}
                                size="lg"
                              />
                            </span>
                          </div>
                        );
                      });
                    })}
                  </div>
                  <div className={styles.add_button_wrapper}>
                    <Button
                      type="primary"
                      className={styles.add_attribute_definition}
                      onClick={onRawAttributeNamesRefresh}
                      title={'Refresh Raw Attribute Name'}
                    >
                      <FontAwesomeIcon
                        icon={faSyncAltPropIcon}
                        className={styles.add_attribute_definition_icon}
                        size="lg"
                      />
                      Refresh
                    </Button>
                    <Button
                      type="primary"
                      className={styles.add_attribute_definition}
                      onClick={onAddAttributeDefinition}
                      title={'Add More Attribute Definitions'}
                    >
                      <FontAwesomeIcon
                        icon={['fal', 'plus']}
                        className={styles.add_attribute_definition_icon}
                        size="lg"
                      />
                      Add
                    </Button>
                  </div>
                </div>
              </Col>
            )}
            <Col span={24}>
              <Form.Item label="Raw Attribute Name:">
                {getFieldDecorator('rawAttributeName', {
                  valuePropName: 'any',
                })(
                  <Select
                    placeholder="Select Site and Location to see Raw Attribute Names"
                    onChange={onRawAttributeNameChange}
                    allowClear
                    showSearch
                    value={selectedRawAttributeName}
                    filterOption={onSearchFilter}
                    disabled={!(selectedSite && selectedLocation)}
                  >
                    {rawAttributeNamesOptions.map(
                      (option: any, i: number): React.ReactNode => {
                        return (
                          <Option value={option.name} key={`raw-attribute-name-${option.name}-${i}`}>
                            {option.name}
                          </Option>
                        );
                      }
                    )}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Collapse>
            <Panel header="Match Attribute Map Details" key="1">
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label="Regex Parse:">
                    {getFieldDecorator(
                      'regexParse',
                      formConfig.name
                    )(<Input type="text" placeholder="Please enter Regex Parse" />)}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Normalizations After Regex Parse:">
                    {getFieldDecorator(
                      'normalizationsAfterRegexParse',
                      formConfig.name
                    )(
                      <>
                        <Input
                          type="text"
                          placeholder="Please enter Normalizations After Regex Parse"
                          onChange={onNormalizationsAfterChange}
                          value={normalizationsAfter}
                        />
                        {getErrorMessage(normalizationsAfter) && (
                          <p className={styles.error_message}>{getErrorMessage(normalizationsAfter)}</p>
                        )}
                      </>
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Normalizations Before Regex Parse:">
                    {getFieldDecorator(
                      'normalizationsBeforeRegexParse',
                      formConfig.name
                    )(
                      <>
                        <Input
                          type="text"
                          placeholder="Please enter Normalizations Before Regex Parse"
                          onChange={onNormalizationsBeforeChange}
                          value={normalizationsBefore}
                        />
                        {getErrorMessage(normalizationsBefore) && (
                          <p className={styles.error_message}>{getErrorMessage(normalizationsBefore)}</p>
                        )}
                      </>
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Default Value:">
                    {getFieldDecorator(
                      'defaultValue',
                      formConfig.name
                    )(<Input type="text" placeholder="Default Value" />)}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Default Measurement Unit:">
                    {getFieldDecorator(
                      'defaultMeasurementUnit',
                      formConfig.name
                    )(<Input type="text" placeholder="Please enter Default Measurement Unit" />)}
                  </Form.Item>
                </Col>
              </Row>
            </Panel>
          </Collapse>
          <Row gutter={24}>
            <Col span={24} style={{ marginTop: '30px' }}>
              <Col span={24}>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  disabled={disableSubmit()}
                  className={styles.save_button}
                >
                  {getSubmitLabel()}
                </Button>
              </Col>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

const WrappedMatchAttributeMapForm = Form.create<MatchAttributeMapFormProps>({ name: 'name' })(MatchAttributeMapForm);
export default WrappedMatchAttributeMapForm;
