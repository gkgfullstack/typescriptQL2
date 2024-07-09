import React from 'react';
import { shallow } from 'enzyme';
import SiteNotificationsForm from "./SiteNotificationsForm";

it('renders without crashing', () => {
    shallow(<SiteNotificationsForm onUpdate={jest.fn} />);
});