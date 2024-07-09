import React from 'react';
import { shallow } from 'enzyme';
import AuditTable from "./UploadTable";

it('renders without crashing', () => {
    const site = {
        id:"222",
        allowSharedEdit: 'name',
    };
    shallow(<AuditTable site={site} visible={false} setVisible={jest.fn} onSubmit={jest.fn} uploadId={undefined} formatVal={undefined} onUpdateUploadTable={undefined}  />);
});