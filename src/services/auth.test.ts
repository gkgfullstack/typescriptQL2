import auth, { TOKEN_KEY } from './auth';

describe('auth service ', () => {
  const { location } = window;

  it('stores user id as private value when setUserId was called', () => {
    auth.setUserId('123');
    expect(auth.getUserId()).toEqual('123');
  });
  it('stores token in local storage when setToken was called', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    auth.setToken('skdjskjd135');
    expect(setItemSpy).toHaveBeenCalled();
    expect(setItemSpy).toHaveBeenCalledWith(TOKEN_KEY, 'skdjskjd135');
  });
  it('returns stored token from local storage when getToken was called', () => {
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    auth.getToken();
    expect(getItemSpy).toHaveBeenCalled();
    expect(getItemSpy).toHaveBeenCalledWith(TOKEN_KEY);
  });
  it('cleans up stored token from local storage and user id when cleanup was called', () => {
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
    auth.setUserId('123');
    auth.cleanup();
    expect(auth.getUserId()).toEqual('');
    expect(removeItemSpy).toHaveBeenCalled();
    expect(removeItemSpy).toHaveBeenCalledWith(TOKEN_KEY);
  });
  it('cleans up stored token from local storage and user id and redirect user to login page when logout was called', () => {
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
    Object.defineProperty(window.location, 'replace', {
      writable: true,
      value: jest.fn(),
    });
    const replaceSpy = jest.spyOn(window.location, 'replace');
    auth.setUserId('123');
    auth.logout();
    expect(auth.getUserId()).toEqual('');
    expect(removeItemSpy).toHaveBeenCalled();
    expect(removeItemSpy).toHaveBeenCalledWith(TOKEN_KEY);
    expect(replaceSpy).toHaveBeenCalled();
    expect(replaceSpy).toHaveBeenCalledWith(`${process.env.REACT_APP_CC_APP_DOMAIN}/d/home/logout/`);
    Object.defineProperty(window.location, 'replace', {
      writable: true,
      value: location,
    });
  });
});
