import React from 'react';
import { shallow } from 'enzyme';
import DiagnosticStatisticItem from "./DiagnosticStatisticItem";

it('renders without crashing', () => {
    const title = 'title';
    const count = 0;
    const tooltip = 'tooltip';

    shallow(<DiagnosticStatisticItem   title={title} count={count} tooltip={tooltip} />);
});