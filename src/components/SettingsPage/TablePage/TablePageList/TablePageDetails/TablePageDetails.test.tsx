import React from 'react';
import { shallow } from 'enzyme';
import TablePageEdit from "./TablePageDetails";

it('renders without crashing', () => {
    const site = {
        id:"222",
        allowSharedEdit: 'name',
    };
    shallow(<TablePageEdit  
        site={site}
        visible={true}
        setVisible={jest.fn} editedVisible={false} deleteVisible={false} auditVisible={false} uploadVisible={false} clearVisible={false} onUpdateDeleted={undefined} onUpdateClear={undefined} onUpdateEditTable={undefined} />);
});