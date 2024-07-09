import React from 'react';
import { shallow } from 'enzyme';
import MatchAttributeDetailsTable from './MatchAttributeDetailsTable';

it('renders without crashing', () => {
    const requestParams={};

    shallow(<MatchAttributeDetailsTable
        requestParams={requestParams}
        setRequestParams={jest.fn}
        matchAttributeId={'1'}
        onEdit={jest.fn}
        onUpdate={jest.fn}
    />);
});