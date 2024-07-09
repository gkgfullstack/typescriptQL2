import React from 'react';
import { shallow } from 'enzyme';
import AuditHistoryFilter from "./AuditHistoryFilter";

describe('AuditHistoryFilter component ', () => {
    it('render without crashing', () => {
        const options: any = [
            {
                id: 'id'
            }
        ];

        shallow(<AuditHistoryFilter
            id={'id'}
            label={'label'}
            options={options}
            onUpdate={jest.fn}
            selection={options[0].id}
        />);
    });
});
