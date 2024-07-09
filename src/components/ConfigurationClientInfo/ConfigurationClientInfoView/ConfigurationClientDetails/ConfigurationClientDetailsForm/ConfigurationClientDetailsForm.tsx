import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react';
import { Button, Col, Form, Row, Input, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';
import styles from '../ConfigurationClientDetails.module.less';
import { useGetIndustries } from 'src/api/industriesFilter';
import { useGetSiteDetails, useSaveSiteDetails } from 'src/api/configureSiteDetails';
import moment from 'moment';
import AddIndustry from 'src/components/common/AddIndustry';

const { Option } = Select;
const { TextArea } = Input;

const dataSources: any = [
  {
    name: 'Feed File',
  },
  {
    name: 'Scraped',
  },
];

const frequencyOptions: any = [
  {
    name: 'Monthly',
  },
  {
    name: 'Quarterly',
  },
  {
    name: 'Yearly',
  },
];

const clientIdentifierOptions: any = [
  {
    name: 'M1',
  },
  {
    name: 'M2',
  },
  {
    name: 'M3',
  },
  {
    name: 'M4',
  },
  {
    name: 'M5',
  },
  {
    name: 'M6',
  },
  {
    name: 'M7',
  },
  {
    name: 'M8',
  },
  {
    name: 'M9',
  },
  {
    name: 'M10',
  },
];

type ConfigurationClientDetailsFormProps = FormComponentProps & {
  clientId: string | undefined;
  updateIndustry: any;
};

const numberFormatter = (value: string | undefined) => {
  let numberValue: number | string = Number(value);
  if (isNaN(numberValue)) {
    numberValue = '';
  }
  return numberValue ? numberValue.toLocaleString('en') : '';
};

const numberParser = (event: any) => (event.target.value ? numberFormatter(event.target.value.replace(/,/g, '')) : '');
const integerNumberParser = (value: string) => (value ? parseInt(value.replace(/,/g, '')) : undefined);
const floatNumberParser = (value: string) => (value ? parseFloat(value.replace(/,/g, '')) : undefined);

const ConfigurationClientDetailsForm: React.FC<ConfigurationClientDetailsFormProps> = ({
  form,
  clientId,
  updateIndustry,
}: ConfigurationClientDetailsFormProps) => {
  const { getFieldDecorator } = form;
  const [siteDetails] = useGetSiteDetails(clientId);
  const [industries] = useGetIndustries();
  const [savedSiteDetails, setSavedSiteDetails] = useState(null);
  const [siteDetailsEdited, setSiteDetailsEdited] = useState(false);
  const [industryList, setIndustryList] = useState<any>([]);
  const [baselineSkuCount, setBaselineSkuCount] = useState<string>('');
  const [contractedSkuGrowth, setContractedSkuGrowth] = useState<string>('');
  const [totalContractedSkus, setTotalContractedSkus] = useState<string>('');
  const [totalActiveSkusAllowed, setTotalActiveSkusAllowed] = useState<string>('');

  useSaveSiteDetails(clientId, savedSiteDetails, updateIndustry);

  useEffect(() => {
    if (siteDetails) {
      form.setFieldsValue({ industry: siteDetails.industry });
      form.setFieldsValue({ accountManager: siteDetails.accountManager });
      form.setFieldsValue({ contact: siteDetails.contact });
      form.setFieldsValue({ termOfContract: siteDetails.termOfContract });
      form.setFieldsValue({ notes: siteDetails.notes });
      form.setFieldsValue({ uniqueIdentifier: siteDetails.uniqueIdentifier });
      form.setFieldsValue({ skuGrowthType: siteDetails.skuGrowthType });
      form.setFieldsValue({ skuGrowthFrequency: siteDetails.skuGrowthFrequency });
      setBaselineSkuCount(numberFormatter(siteDetails.baselineSkuCount));
      setContractedSkuGrowth(numberFormatter(siteDetails.contractedSkuGrowth));
      setTotalContractedSkus(numberFormatter(siteDetails.totalContractedSkus));
      setTotalActiveSkusAllowed(numberFormatter(siteDetails.totalActiveSkusAllowed));
      if (siteDetails.contractEndDate) {
        form.setFieldsValue({ contractEndDate: moment(siteDetails.contractEndDate) });
      }
      if (siteDetails.contractStartDate) {
        form.setFieldsValue({ contractStartDate: moment(siteDetails.contractStartDate) });
      }
      if (dataSources.filter((source: { name: string }) => source.name === siteDetails.dataSource).length > 0) {
        form.setFieldsValue({ dataSource: siteDetails.dataSource });
      }
    }
    if (industries && industries.length > 0) {
      setIndustryList(industries);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteDetails, industries]);

  const onIndustryChange = (value: SelectValue) => {
    form.setFieldsValue({ industry: value });
    return;
  };

  const onClientDataSourceChange = (value: SelectValue) => {
    form.setFieldsValue({ dataSource: value });
    return;
  };

  const onClientIdentifierChange = (value: SelectValue) => {
    form.setFieldsValue({ uniqueIdentifier: value });
    return;
  };

  const onSKUGrowthFrequencyChange = (value: SelectValue) => {
    form.setFieldsValue({ skuGrowthFrequency: value });
    return;
  };

  const onStartDateChange = (value: any) => {
    form.setFieldsValue({ contractStartDate: value });
  };

  const onEndDateChange = (value: any) => {
    form.setFieldsValue({ contractEndDate: value });
  };

  const onNoteChange = (value: any) => {
    form.setFieldsValue({ notes: value });
  };

  const onSave = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((err, values: any) => {
      if (!err) {
        const newForm: any = {
          industry: values.industry,
          dataSource: values.dataSource || '',
          accountManager: values.accountManager || '',
          contact: values.contact || '',
          termOfContract: values.termOfContract || '',
          baselineSkuCount: integerNumberParser(baselineSkuCount),
          contractedSkuGrowth: floatNumberParser(contractedSkuGrowth),
          notes: values.notes || '',
          contractEndDate: values.contractEndDate ? moment(values.contractEndDate).format('YYYY-MM-DD') : '',
          contractStartDate: values.contractStartDate ? moment(values.contractStartDate).format('YYYY-MM-DD') : '',
          uniqueIdentifier: values.uniqueIdentifier || '',
          skuGrowthFrequency: values.skuGrowthFrequency || '',
          skuGrowthType: values.skuGrowthType || '',
          totalContractedSkus: integerNumberParser(totalContractedSkus),
          totalActiveSkusAllowed: integerNumberParser(totalActiveSkusAllowed),
        };
        setSavedSiteDetails(newForm);
        setSiteDetailsEdited(false);
      }
    });
    return false;
  };

  const onEditClientDetails = () => {
    setSiteDetailsEdited(true);
  };

  const onSearchFilter = (input: string, option: ReactElement) => {
    const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
    return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const onAddIndustry = (industryName: string) => {
    const newList = industryList;
    if (!newList.includes(industryName)) {
      newList.push({
        name: industryName,
      });
      newList.sort((a: any, b: any) => a.name.localeCompare(b.name));
      setIndustryList(newList);
    }
    form.setFieldsValue({ industry: industryName });
  };

  return (
    <Form className={styles.configuration_client_panel_form} layout="vertical" hideRequiredMark onSubmit={onSave}>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item label="Industry:">
            {getFieldDecorator('industry')(
              <Select
                placeholder="Select Industry"
                onChange={onIndustryChange}
                allowClear
                disabled={!siteDetailsEdited}
                showSearch
                filterOption={onSearchFilter}
              >
                {industryList &&
                  industryList.map(
                    (option: any, i: number): React.ReactNode => {
                      return (
                        <Option value={option.name} key={`client-industry-${option.name}-${i}`}>
                          {option.name}
                        </Option>
                      );
                    }
                  )}
              </Select>
            )}
          </Form.Item>
          <div className={styles.add_industry_container}>
            <AddIndustry disabled={!siteDetailsEdited} onUpdateIndustry={onAddIndustry} />
          </div>
        </Col>
        <Col span={24}>
          <Form.Item label="Account Manager:">
            {getFieldDecorator('accountManager')(
              <Input type="text" placeholder="Please enter Account Manager" disabled={!siteDetailsEdited} />
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Client Contact:">
            {getFieldDecorator('contact')(
              <Input type="text" placeholder="Please enter Client Contact" disabled={!siteDetailsEdited} />
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Client Data Source:">
            {getFieldDecorator('dataSource')(
              <Select
                placeholder="Select Client Data Source"
                onChange={onClientDataSourceChange}
                allowClear
                disabled={!siteDetailsEdited}
              >
                {dataSources.map(
                  (option: any, i: number): React.ReactNode => {
                    return (
                      <Option value={option.name} key={`data-source-${option.name}-${i}`}>
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
          <Form.Item label="Client Unique Identifier:">
            {getFieldDecorator('uniqueIdentifier')(
              <Select
                placeholder="Select Client Unique Identifier"
                onChange={onClientIdentifierChange}
                allowClear
                disabled={!siteDetailsEdited}
              >
                {clientIdentifierOptions.map(
                  (option: any, i: number): React.ReactNode => {
                    return (
                      <Option value={option.name} key={`client-identifier-${option.name}-${i}`}>
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
          <Form.Item label="Term of Contract:">
            {getFieldDecorator('termOfContract')(
              <Input type="text" placeholder="Please enter Term of Contract" disabled={!siteDetailsEdited} />
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Contract Start Date:">
            {getFieldDecorator('contractStartDate')(
              <DatePicker
                onChange={onStartDateChange}
                placeholder="Select Contract Start Date"
                style={{ width: '100%' }}
                format={'YYYY-MM-DD'}
                disabled={!siteDetailsEdited}
              />
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Contract End Date:">
            {getFieldDecorator('contractEndDate')(
              <DatePicker
                onChange={onEndDateChange}
                placeholder="Select Contract End Date"
                style={{ width: '100%' }}
                format={'YYYY-MM-DD'}
                disabled={!siteDetailsEdited}
              />
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Baseline SKU Count:">
            <Input
              type="text"
              value={baselineSkuCount}
              onChange={(e: any) => setBaselineSkuCount(numberParser(e))}
              placeholder="Please enter Baseline SKU Count"
              disabled={!siteDetailsEdited}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Contracted SKU Growth:">
            <Input
              type="text"
              value={contractedSkuGrowth}
              onChange={(e: any) => setContractedSkuGrowth(numberParser(e))}
              placeholder="Please enter Contracted SKU Growth"
              disabled={!siteDetailsEdited}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="SKU Growth Frequency:">
            {getFieldDecorator('skuGrowthFrequency')(
              <Select
                placeholder="Select SKU Growth Frequency"
                onChange={onSKUGrowthFrequencyChange}
                allowClear
                disabled={!siteDetailsEdited}
              >
                {frequencyOptions.map(
                  (option: any, i: number): React.ReactNode => {
                    return (
                      <Option value={option.name} key={`data-source-${option.name}-${i}`}>
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
          <Form.Item label="SKU Growth Type:">
            {getFieldDecorator('skuGrowthType')(
              <Input type="text" placeholder="Please enter SKU Growth Type" disabled={!siteDetailsEdited} />
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Total Contracted SKUs:">
            <Input
              type="text"
              value={totalContractedSkus}
              onChange={(e: any) => setTotalContractedSkus(numberParser(e))}
              placeholder="Please enter Total Contracted SKUs"
              disabled={!siteDetailsEdited}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Total Active SKUs Allowed:">
            <Input
              type="text"
              value={totalActiveSkusAllowed}
              onChange={(e: any) => setTotalActiveSkusAllowed(numberParser(e))}
              placeholder="Please enter Total Active SKUs Allowed"
              disabled={!siteDetailsEdited}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Additional Notes:">
            {getFieldDecorator('notes')(
              <TextArea
                rows={3}
                onChange={onNoteChange}
                placeholder="Please enter Additional Notes"
                disabled={!siteDetailsEdited}
              />
            )}
          </Form.Item>
        </Col>
      </Row>
      {!siteDetailsEdited && (
        <Button block type="primary" onClick={onEditClientDetails} className={styles.configuration_client_button}>
          Edit Client Details
        </Button>
      )}
      {siteDetailsEdited && (
        <Button block type="primary" htmlType="submit" className={styles.configuration_client_button}>
          Save Client Details
        </Button>
      )}
    </Form>
  );
};

const WrappedConfigurationClientDetailsForm = Form.create<ConfigurationClientDetailsFormProps>({ name: 'name' })(
  ConfigurationClientDetailsForm
);
export default WrappedConfigurationClientDetailsForm;
