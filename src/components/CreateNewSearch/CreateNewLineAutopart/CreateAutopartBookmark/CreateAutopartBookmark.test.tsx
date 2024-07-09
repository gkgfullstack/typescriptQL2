import React from 'react';
import { shallow } from 'enzyme';
import CreateAutopartBookmark from './CreateAutopartBookmark';
import { FormComponentProps } from 'antd/lib/form';
import { Form } from 'antd';

describe('CreateAutopartBookmark component ', () => {
  type CreateAutopartBookmarkProps = FormComponentProps & {};

  it('renders without crashing', () => {
    const testComponent: React.FC<CreateAutopartBookmarkProps> = ({ form }: CreateAutopartBookmarkProps) => {
      const { getFieldDecorator } = form;
      return <CreateAutopartBookmark getFieldDecorator={getFieldDecorator}/>;
    };

    const WrappedCreateAutopartBookmark = Form.create<CreateAutopartBookmarkProps>({ name: 'name' })(testComponent);

    shallow(<WrappedCreateAutopartBookmark />);
  });
});
