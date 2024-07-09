import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Checkbox, Form, Col, Row, Input, Button, Upload } from 'antd';
import styles from './SiteManagementEditSiteForm.module.less';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';
import { SiteManagementInfo } from 'src/types/SiteManagementInfo';
import { useGetAllSiteLogoList } from 'src/api/configureSiteList';

const { Option } = Select;

const dataSources: any = [
  {
    name: 'Feed File',
  },
  {
    name: 'Scraped',
  },
  {
    name: 'Whitelisted IP',
  },
];

const bookmarkCreatedOptions: any = [
  {
    name: 'Yes',
    id: 1,
  },
  {
    name: 'No',
    id: 0,
  },
];

type SiteManagementEditSiteFormProps = FormComponentProps & {
  onSave: (value: SiteManagementInfo) => void;
  site: SiteManagementInfo;
};

type FormConfig = {
  [field: string]: GetFieldDecoratorOptions;
};

const formConfig: FormConfig = {
  name: { rules: [{ required: true, message: 'Site name is required!' }], validateTrigger: 'onBlur' },
  dataSource: { rules: [{ required: true, message: 'Data Source is required!' }], validateTrigger: 'onBlur' },
};

export const SiteManagementEditSiteForm: React.FC<SiteManagementEditSiteFormProps> = ({
  form,
  onSave,
  site,
}: SiteManagementEditSiteFormProps) => {
  const { getFieldDecorator, getFieldsValue } = form;
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [ownerName, setOwnerName] = useState<any>(undefined);
  const [siteLogoList] = useGetAllSiteLogoList();

  useEffect(() => {
    if (site && form) {
      const newBookmarkCreated = site.bookmarkCreated ? 1 : 0;
      form.setFieldsValue({ bookmarkCreated: newBookmarkCreated });
      form.setFieldsValue({ name: site.name });
      form.setFieldsValue({ productType: site.productType });
      form.setFieldsValue({ enableMetadata: site.enableMetadata });
      form.setFieldsValue({ enableFingerprintName: site.enableFingerprintName });
      if (site.imageURL) {
        setImage(site.imageURL);
      }
      if (site.imageData) {
        form.setFieldsValue({ imageData: site.imageData });
      }
      if (dataSources.filter((source: { name: string }) => source.name === site.dataSource).length > 0) {
        form.setFieldsValue({ dataSource: site.dataSource });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [site]);

  const disableSubmit = () => {
    return (
      !getFieldsValue().name ||
      getFieldsValue().name === '' ||
      !getFieldsValue().dataSource ||
      getFieldsValue().dataSource === ''
    );
  };

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((err, values: SiteManagementInfo) => {
      if (!err) {
        let newSite: SiteManagementInfo = {
          ...values,
          active: site.active ? 1 : 0,
        };
        if (ownerName) {
          newSite.imageURL = ownerName.split('-logoURL-')[0];
          // eslint-disable-next-line
          newSite = { ...newSite, ['imageData']: undefined };
        }
        newSite.ID = site.ID;
        onSave(newSite);
      }
    });
    return false;
  };

  const onDataSourceChange = (value: SelectValue) => {
    form.setFieldsValue({ dataSource: value });
  };

  const onBookmarkCreatedChange = (value: SelectValue) => {
    form.setFieldsValue({ bookmarkCreated: value });
  };

  const onSiteLogoChange = (value: SelectValue) => {
    const imageUrl = value ? value.toString().split('-logoURL-')[0] : '';
    const logoValue = value ? value.toString() : undefined;
    setImage(imageUrl);
    setOwnerName(logoValue);
  };

  const onSearchFilter = (input: string, option: ReactElement) => {
    const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
    return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const onChangeLogo = (file: any) => {
    const isJPG = file.type === 'image/jpeg';
    setErrorMessage('');
    if (isJPG) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async (event: any) => {
        const _loadedImageUrl = event.target.result;
        const image = document.createElement('img');
        image.src = _loadedImageUrl;
        image.addEventListener('load', () => {
          const { width, height } = image;
          if ((width <= 118 && height <= 50) || (height <= 118 && width <= 50)) {
            form.setFieldsValue({ imageData: event.target.result.split(',')[1] });
            setImage(file.name);
            setOwnerName(undefined);
          } else {
            setErrorMessage('Image must be smaller than 118 x 50 px');
          }
        });
      };
    } else {
      setErrorMessage('Image format must be JPG');
    }
    return false;
  };

  const onMetadataChange = (e: any) => {
    form.setFieldsValue({ enableMetadata: e.target.checked });
  };

  const onFingerprintChange = (e: any) => {
    form.setFieldsValue({ enableFingerprintName: e.target.checked });
  };

  return (
    <div className={styles.create_new_site_form_wrapper}>
      <h1 className={styles.site_title}>Edit Site ID: {site.ID}</h1>
      <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
        <div>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Site Name:">
                {getFieldDecorator(
                  'name',
                  formConfig.SitetName
                )(<Input type="text" placeholder="Please enter Site Name" />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Data Source:">
                {getFieldDecorator(
                  'dataSource',
                  formConfig.DataSource
                )(
                  <Select placeholder="Select Data Source" onChange={onDataSourceChange} allowClear>
                    {dataSources.map(
                      (option: any, i: number): React.ReactNode => {
                        return (
                          <Option value={option.name} key={`data_source-${option.name}-${i}`}>
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
              <Form.Item label="Product Type:">
                {getFieldDecorator(
                  'productType',
                  formConfig.ProductType
                )(<Input type="text" placeholder="Please enter Product Type" />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Bookmark Created:">
                {getFieldDecorator(
                  'bookmarkCreated',
                  formConfig.BookmarkCreated
                )(
                  <Select
                    placeholder="Select Bookmark Created"
                    disabled={true}
                    onChange={onBookmarkCreatedChange}
                    allowClear
                  >
                    {bookmarkCreatedOptions.map(
                      (option: any, i: number): React.ReactNode => {
                        return (
                          <Option value={option.id} key={`bookmark-${option.name}-${i}`}>
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
              <Form.Item label="Logo:">
                <Select
                  placeholder="Select from existing site"
                  onChange={onSiteLogoChange}
                  allowClear
                  showSearch
                  filterOption={onSearchFilter}
                  value={ownerName}
                >
                  {siteLogoList.map(
                    (option: any, i: number): React.ReactNode => {
                      return (
                        <Option
                          value={`${option.logoUrl}-logoURL-${option.ownerName}-${i}`}
                          key={`logo-site-${option.ownerName}-${i}`}
                        >
                          {option.ownerName}
                        </Option>
                      );
                    }
                  )}
                </Select>
              </Form.Item>
              <Form.Item>
                {getFieldDecorator(
                  'imageData',
                  formConfig.Logo
                )(
                  <div className={styles.upload_wrapper}>
                    <Input type="text" disabled={true} placeholder="Please enter Logo" value={image} />
                    <Upload className={styles.upload_button} showUploadList={false} beforeUpload={onChangeLogo}>
                      <Button type="primary">Upload</Button>
                    </Upload>
                    <p className={styles.error_message}>{errorMessage}</p>
                  </div>
                )}
              </Form.Item>
            </Col>
            <Col span={24} className={styles.form_details_block}>
              <Form.Item>
                {getFieldDecorator('enableMetadata', {
                  valuePropName: 'checked',
                })(<Checkbox onChange={onMetadataChange}>Metadata</Checkbox>)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('enableFingerprintName', {
                  valuePropName: 'checked',
                })(<Checkbox onChange={onFingerprintChange}>Name As Fingerprint</Checkbox>)}
              </Form.Item>
            </Col>
            <Col span={24} className={styles.save_button_wrapper}>
              <Col span={24}>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  disabled={disableSubmit()}
                  className={styles.save_new_site}
                >
                  Save
                </Button>
              </Col>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

const WrappedSiteManagementEditSiteForm = Form.create<SiteManagementEditSiteFormProps>({ name: 'name' })(
  SiteManagementEditSiteForm
);
export default WrappedSiteManagementEditSiteForm;
