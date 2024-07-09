import React from 'react';
import { shallow } from 'enzyme';
import DiagnosticStatistic from "./DiagnosticStatistic";

it('renders without crashing', () => {
    const statistic = {
        totalCount: 0,
        remainingRunCount: 0,
        cleansedRunCount: 0,
    };
    shallow(<DiagnosticStatistic statistic={statistic} />);
});