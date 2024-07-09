import React from 'react';
import { shallow } from 'enzyme';
import CreateDrugInputValues from "./CreateDrugInputValues";

describe('CreateDrugInputValues component ', () => {
    it('renders without crashing', () => {
        shallow(<CreateDrugInputValues
            fields={[]}
        />);
    });
});