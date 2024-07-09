import React from 'react';
import { shallow } from 'enzyme';
import CompetitiveSetsList from "./CompetitiveSetsList";

it('renders without crashing', () => {
    const requestParams = {};

    shallow(<CompetitiveSetsList
        requestParams={requestParams}
        setRequestParams={jest.fn}
        loading={false}
        totalRecords={0}
        competitiveSetsList={[]}
    />);
});
