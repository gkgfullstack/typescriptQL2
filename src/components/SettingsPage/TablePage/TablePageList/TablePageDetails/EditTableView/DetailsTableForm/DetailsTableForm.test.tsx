import React from 'react';
import { shallow } from 'enzyme';
import DetailsTableForm from "./DetailsTableForm";

it('renders without crashing', () => {
    shallow(<DetailsTableForm setVisible={undefined}  />);
});