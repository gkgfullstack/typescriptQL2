import React from 'react';
import { shallow } from 'enzyme';
import CreateNewSiteForm from "./CreateNewSiteForm";

it('renders without crashing', () => {
    shallow(<CreateNewSiteForm onSave={jest.fn} />);
});