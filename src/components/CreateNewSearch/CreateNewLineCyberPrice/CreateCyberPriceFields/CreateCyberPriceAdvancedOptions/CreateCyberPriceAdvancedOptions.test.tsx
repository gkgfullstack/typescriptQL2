import React from 'react';
import { shallow } from 'enzyme';
import CreateCyberPriceAdvancedOptions from './CreateCyberPriceAdvancedOptions';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { options } from './CreateCyberPriceAdvancedOptions.config';

describe('CreateCyberPriceAdvancedOptions component ', () => {
  type CreateCyberPriceAdvancedOptionsProps = FormComponentProps & {};

  it('renders without crashing', () => {
    const testComponent: React.FC<CreateCyberPriceAdvancedOptionsProps> = ({ form }: CreateCyberPriceAdvancedOptionsProps) => {
      const {getFieldDecorator, setFieldsValue} = form;
      return <CreateCyberPriceAdvancedOptions
          getFieldDecorator={getFieldDecorator}
          onAdd={jest.fn}
          setFieldsValue={setFieldsValue}
      />
    };
    const WrappedCreateCyberPriceAdvancedOptions = Form.create<CreateCyberPriceAdvancedOptionsProps>({ name: 'name' })(
        testComponent
    );

    shallow(<WrappedCreateCyberPriceAdvancedOptions />);
  });

  it('Should be correct labels of fields for Input Value Options of CyberPrice widget', () => {
    const advancedOptions = options;
    expect(JSON.stringify(advancedOptions[0].label).includes('Site Username')).toBe(true);
    expect(JSON.stringify(advancedOptions[1].label).includes('Site Password')).toBe(true);
    expect(JSON.stringify(advancedOptions[2].label).includes('Second Password')).toBe(true);
  });

  it('Should be correct names of fields of Advanced options', () => {
    const advancedOptions = options;
    expect(advancedOptions[0].name).toBe('siteUsername');
    expect(advancedOptions[1].name).toBe('sitePassword');
    expect(advancedOptions[2].name).toBe('secondPassword');
  });
});
