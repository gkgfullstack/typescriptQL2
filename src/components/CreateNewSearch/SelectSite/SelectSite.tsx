import React from 'react';
import { Divider, Form, Select } from 'antd';
import SiteCodeType from 'src/types/SiteCodeType';
import { useSiteCodeFetch } from '../SiteCode/hooks';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { SelectValue } from 'antd/lib/select';
import { SiteTooltip } from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';

const { Option } = Select;
const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 15 },
};

type SelectSiteProps = {
  isSingle?: boolean;
  name?: string;
  vertical: string;
  getFieldDecorator<T extends Record<string | number | symbol, string>>(
    id: keyof T,
    options?: GetFieldDecoratorOptions
  ): (node: React.ReactNode) => React.ReactNode;
  onSiteChange: (value: SelectValue) => void;
  appType?: string;
};

const SelectSite: React.FC<SelectSiteProps> = ({
  isSingle,
  name,
  vertical,
  getFieldDecorator,
  onSiteChange,
  appType,
}: SelectSiteProps) => {
  const [{ data }] = useSiteCodeFetch(vertical, appType);

  return (
    <>
      <Form.Item
        {...layout}
        label={
          <h6>
            Site Code
            <SiteTooltip />
            {!isSingle && <span>Site codes space delimited</span>}
          </h6>
        }
      >
        {getFieldDecorator(name ? name : 'sites', {
          rules: [{ required: true, message: 'Site Code is required!' }],
          validateTrigger: 'onBlur',
        })(
          <Select
            showArrow
            mode={isSingle ? undefined : 'multiple'}
            className="siteCodeSelect"
            placeholder="Select Site Code"
            onChange={onSiteChange}
            allowClear
          >
            {data &&
              data.map(
                (site: SiteCodeType): React.ReactNode => {
                  return (
                    <Option key={site.siteCode + '-' + site.siteName} value={site.siteCode}>
                      {site.siteCode} - {site.siteName}
                    </Option>
                  );
                }
              )}
          </Select>
        )}
      </Form.Item>{' '}
      <Divider className="dividerCustom" />
    </>
  );
};

export default SelectSite;
