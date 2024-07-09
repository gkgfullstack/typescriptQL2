import React from 'react';
import { shallow } from 'enzyme';
import AuditHistory from './AuditHistory';

describe('AuditHistory component ', () => {
  it('render without crashing', () => {
    shallow(<AuditHistory />);
  });
});
