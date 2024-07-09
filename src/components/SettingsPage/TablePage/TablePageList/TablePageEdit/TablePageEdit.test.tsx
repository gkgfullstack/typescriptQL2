import React from 'react';
import { shallow } from 'enzyme';
import TablePageEdit from "./TablePageEdit";

it('renders without crashing', () => {
    const site = {
        id:"222",
        allowSharedEdit: 'name',
    };
    shallow(<TablePageEdit  
        site={site}
        visible={true}
        setVisible={jest.fn} onUpdateEditTable={undefined}  />);
});