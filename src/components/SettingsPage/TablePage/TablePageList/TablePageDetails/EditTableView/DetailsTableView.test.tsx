import React from 'react';
import { shallow } from 'enzyme';
import DetailsTableView from "./DetailsTableView";

it('renders without crashing', () => {
    shallow(<DetailsTableView requestParams={{
        visibility: '',
        columnNames: '',
        columns: [],
        delimiter: undefined,
        downloadUrl: undefined,
        accountID: undefined,
        columnCount: undefined,
        storeTableDataAsFile: undefined,
        appId: undefined,
        delimiterDescription: undefined,
        created: undefined,
        updated: undefined,
        name: undefined,
        id: undefined,
        type: undefined,
        size: undefined,
        owner: undefined,
        shared: undefined,
        description: undefined,
        editable: '',
        isOwner: '',
        rowSummary: [[]]
    }} setVisible={undefined} onUpdateDeleted={undefined} onUpdateClear={undefined} editedVisible={undefined} deleteVisible={undefined} auditVisible={undefined} uploadVisible={undefined} clearVisible={undefined} onUpdateEditTable={undefined}         />);
});
