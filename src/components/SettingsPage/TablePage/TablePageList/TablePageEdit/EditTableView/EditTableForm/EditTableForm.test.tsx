import React from 'react';
import { shallow } from 'enzyme';
import SiteNotificationsForm from "./EditTableForm";

it('renders without crashing', () => {
    shallow(<SiteNotificationsForm editTableData={jest.fn} setVisible={false}  />);
});