import React from 'react';
import { shallow } from 'enzyme';
import BackLink from './BackLink';

it('renders without crashing', () => {
    const url = 'http://google.com';
    const text = 'some link';

    shallow(<BackLink url={url} text={text} />);
});