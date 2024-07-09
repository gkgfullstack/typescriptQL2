import React from 'react';
import { shallow } from 'enzyme';
import SiteList from './SiteList';
let mapss:Map<string, object>
it('renders without crashing', () => {
    shallow(<SiteList
        application={'106'}
        dataList={true}
        onUpdate={''}
        keyId={'1'}
        disabled={false}
        setCheckedValues={undefined}
        setCheckedValuesAllList={false}
        map={mapss}
        setCheckedValuesAgin={undefined}
        setIndeterminateDefault={undefined}          />);
});
