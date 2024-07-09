import React from 'react';
import { shallow } from 'enzyme';
import CreateVacationPropertyName from './CreateVacationPropertyName';

describe('CreateVacationPropertyName component', () => {
    it('renders without crashing', () => {
        const label = (<h6>label</h6>);
        shallow(<CreateVacationPropertyName label={label} onAdd={jest.fn} />);
    });
});
