import React from 'react';
import { shallow } from 'enzyme';
import AuditTable from "./AuditTable";

it('renders without crashing', () => {
    const site = {
        id:"222",
        allowSharedEdit: 'name',
    };
    shallow(<AuditTable  
        site={site}
        visible ={true}
        setVisible={jest.fn} 
        />);
});