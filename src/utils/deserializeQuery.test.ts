import { deserializeQuery } from 'src/utils';

const search = '?test=value&test2=value2';
const badSearch = 'test=value&test2=value2';

describe('deserializeQuery returns', () => {
  it('deserialized query params as object when "search" parameter of function is defined', () => {
    const query = deserializeQuery(search);
    expect(query).toEqual({
      test: 'value',
      test2: 'value2',
    });
  });
  it('empty object when "search" parameter of function is not defined', () => {
    const query = deserializeQuery('');
    expect(query).toEqual({});
  });
  it('empty object when "search" parameter of function is not correct', () => {
    const query = deserializeQuery(badSearch);
    expect(query).toEqual({});
  });
  it('deserialized query params as object when "search" parameter of function is array of values', () => {
    const query = deserializeQuery('?brands=1%3B2%3B3%3B4');
    expect(query).toEqual({
      brands: ['1', '2', '3', '4'],
    });
  });
});
