import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import useHotLinksMenu, { SiderMenuNode } from './useHotLinksMenu';
import UserInfo from 'src/types/UserInfo';
import AppPermissions from 'src/types/AppPermissions';
//import routes from 'src/routes';
// import { shallow } from 'enzyme';
// import * as React from 'react';

const userInfo: UserInfo = {
  userName: 'JohnSmit',
  userId: '1234',
  appPermissions: { enable_qmatch: true } as AppPermissions,
};
describe('useHotLinksMenu hook ', () => {
  it('renders without crashing', async () => {
    await act(async () => {
      renderHook((): [SiderMenuNode[], string[]] => useHotLinksMenu('', 0, userInfo));
    });
  });
  it('returns menu config', async () => {
    let renderHookResults = {} as RenderHookResult<{}, [SiderMenuNode[], string[]]>;
    await act(async () => {
      renderHookResults = renderHook((): [SiderMenuNode[], string[]] => useHotLinksMenu('', 0, userInfo));
    });
    const { result } = renderHookResults;
    expect(result.current[0]).toBeDefined();
    expect(result.current[0][0].label).toEqual('Help');
    //expect(result.current[0][0].path).toEqual('/help');
    // expect(result.current[0][1].label).toEqual('Alerts');
    // expect(result.current[0][1].onClick).toBeDefined();
    // expect(result.current[0][2].label).toEqual('Usage');
    // expect(result.current[0][2].path).toEqual(routes.usage);
    // expect(result.current[0][3].label).toEqual('Settings');
    // expect(result.current[0][3].path).toEqual(routes.settings);
    //expect(result.current[0][1].label).toEqual(userInfo.userName);
    //expect(result.current[0][1].path).not.toBeDefined();
    //expect(result.current[0][1].children).toBeDefined();
    //const usersMenu = shallow(<span>{result.current[0][1].children}</span>);
    //expect(usersMenu.find('UserDetailsMenu')).toHaveLength(1);
  });
  it('returns new menu config when user name is changed', async () => {
    let renderHookResults = {} as RenderHookResult<
      { pathname: string; alerts: number; user: UserInfo },
      [SiderMenuNode[], string[]]
    >;
    await act(async () => {
      renderHookResults = renderHook(
        ({ pathname, alerts, user }): [SiderMenuNode[], string[]] => useHotLinksMenu(pathname, alerts, user),
        { initialProps: { pathname: '', alerts: 0, user: userInfo } }
      );
    });
    // let { result, rerender } = renderHookResults;
    // expect(result.current[0][1].label).toEqual(userInfo.userName);
    // await act(async () => {
    //   rerender({ pathname: '', alerts: 0, user: { ...userInfo, userName: 'Admin' } });
    // });
    // result = renderHookResults.result;
    // expect(result.current[0][1].label).toEqual('Admin');
  });
  it('returns selected menu items when pathname is exact match with menu item path', async () => {
    let renderHookResults = {} as RenderHookResult<
      { pathname: string; alerts: number; user: UserInfo },
      [SiderMenuNode[], string[]]
    >;
    await act(async () => {
      renderHookResults = renderHook(
        ({ pathname, alerts, user }): [SiderMenuNode[], string[]] => useHotLinksMenu(pathname, alerts, user),
        { initialProps: { pathname: '', alerts: 0, user: userInfo } }
      );
    });
    let { result } = renderHookResults;
    expect(result.current[1]).toHaveLength(0);
    //!TODO uncomment when the hidden menu returns
    // await act(async () => {
    //   rerender({ pathname: routes.help, alerts: 0, user: userInfo });
    // });
    // result = renderHookResults.result;

    // expect(result.current[1]).toHaveLength(1);
    // await act(async () => {
    //   rerender({ pathname: routes.help + '/general', alerts: 0, user: userInfo });
    // });
    // result = renderHookResults.result;
    // expect(result.current[1]).toHaveLength(0);
  });
});
