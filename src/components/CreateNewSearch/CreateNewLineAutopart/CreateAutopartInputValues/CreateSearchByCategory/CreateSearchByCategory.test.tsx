import React from 'react';
import { shallow } from 'enzyme';
import { FormComponentProps } from 'antd/lib/form';
import { Form } from 'antd';
import categoryOptions from './CreateSearchByCategory.config';
import CreateSearchByCategory from './CreateSearchByCategory';

describe('component CreateSearchByCategory', () => {
  type CreateSearchByCategoryProps = FormComponentProps & {};

  it('renders without crashing', () => {
    const testComponent: React.FC<CreateSearchByCategoryProps> = ({ form }: CreateSearchByCategoryProps) => {
      const { getFieldDecorator } = form;
      return <CreateSearchByCategory
          getFieldDecorator={getFieldDecorator}
          site={''}
          category={''}
          setCategory={jest.fn}
          checkedKeys={[]}
          setCheckedKeys={jest.fn}
      />;
    };
    const WrappedCreateSearchByCategory = Form.create<CreateSearchByCategoryProps>({ name: 'name' })(testComponent);

    shallow(<WrappedCreateSearchByCategory />);
  });

  it('Should have correct names of fields for CreateSearchByCategory', () => {
    const inputOptions = categoryOptions;
    expect(inputOptions[0].name).toBe('zipCode');
    expect(inputOptions[1].name).toBe('reference');
  });
});
