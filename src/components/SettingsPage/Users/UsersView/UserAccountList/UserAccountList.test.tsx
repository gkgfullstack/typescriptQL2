import React from 'react';
import { shallow } from 'enzyme';
import UserAccountList from './UserAccountList';

it('renders without crashing', () => {
    const requestParams = {};

    shallow(<UserAccountList
        requestParams={requestParams}
        setRequestParams={jest.fn}
        loading={false}
        totalRecords={0}
        userAccountList={[]}
        isEnableAccount={false}
    />);
});
