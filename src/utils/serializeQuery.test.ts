import { serializeQuery } from 'src/utils';

describe('serializeQuery returns ', () => {
  it('serialized query string when "value" parameter of function is defined', () => {
    const query = serializeQuery({test: 'value'});
    expect(query).toEqual('test=value');
  });
  it('serialized empty string when "value" parameter of function is not defined', () => {
    const query = serializeQuery({});
    expect(query).toEqual('');
  });
  it('serialized query string when "value" parameter of function is array', () => {
    const query = serializeQuery({array: [1, 2, 3, 4, 5]});
    expect(query).toEqual('array=1%3B2%3B3%3B4%3B5');
  });
  it('serialized query string when "value" parameter of function is object of values', () => {
    const query = serializeQuery({
      test: 'value',
      array: [1,2,3]
    });
    expect(query).toEqual('test=value&array=1%3B2%3B3');
  });
});
