import React from 'react';
import { shallow } from 'enzyme';
import CreateComSetPropertyName from './CreateComSetPropertyName';

describe('CreateVacationPropertyName component', () => {
    it('renders without crashing', () => {
        const label = (<h6>label</h6>);
        shallow(<CreateComSetPropertyName label={label} onAdd={jest.fn} />);
    });
});
