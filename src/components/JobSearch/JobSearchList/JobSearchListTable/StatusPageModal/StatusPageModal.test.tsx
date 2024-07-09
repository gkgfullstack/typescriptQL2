import React from 'react';
import { shallow } from 'enzyme';
import StatusPageModal from "./StatusPageModal";

it('renders without crashing', () => {
    shallow(<StatusPageModal runId={'22058627'} visible={true} setVisible={jest.fn()}/>);
});