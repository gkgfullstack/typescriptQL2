import React from 'react';
import { shallow } from 'enzyme';
import CreateAutopartCategory from './CreateAutopartCategory';

describe('component CreateAutopartCategory', () => {
  it('renders without crashing', () => {
    shallow(<CreateAutopartCategory
        site={'site'}
        setCategory={jest.fn}
        category={'category'}
        checkedKeys={[]}
        setCheckedKeys={jest.fn}
    />);
  });
});
