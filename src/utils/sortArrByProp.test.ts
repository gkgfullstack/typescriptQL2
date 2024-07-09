import { sortArrByProp } from 'src/utils';

describe('sortArrByProp returns', () => {
  let arr: any[] = [];
  beforeEach(() => {
    arr = [
      { label: 'b', value: 2 },
      { label: 'a', value: 1 },
      { label: 'd', value: 4 },
      { label: 'c', value: 3 },
    ];
  });
  it('sorted array by label in asc order when sorting key is "label" and order is default value (asc) function parameter', () => {
    const filterArr = arr.sort(sortArrByProp('label'));
    expect(filterArr).toEqual([
      { label: 'a', value: 1 },
      { label: 'b', value: 2 },
      { label: 'c', value: 3 },
      { label: 'd', value: 4 },
    ]);
  });
  it('sorted array by label in desc order when sorting key is "label" and order value is "desc"', () => {
    const filterArr = arr.sort(sortArrByProp('label', 'desc'));
    expect(filterArr).toEqual([
      { label: 'd', value: 4 },
      { label: 'c', value: 3 },
      { label: 'b', value: 2 },
      { label: 'a', value: 1 },
    ]);
  });
  it('array as is not sorted when sorting key is not defined and order value is "asc"', () => {
    const filterArr = arr.sort(sortArrByProp('', 'asc'));
    expect(filterArr).toEqual(arr);
  });
  it('array as is not sorted when sorting key is not defined and order value is "desc"', () => {
    const filterArr = arr.sort(sortArrByProp('', 'desc'));
    expect(filterArr).toEqual(arr);
  });
  it('sorted array by value in desc order when sorting key is "value" and order value is "desc"', () => {
    const filterArr = arr.sort(sortArrByProp('value', 'desc'));
    expect(filterArr).toEqual([
      { label: 'd', value: 4 },
      { label: 'c', value: 3 },
      { label: 'b', value: 2 },
      { label: 'a', value: 1 }
    ]);
  });
  it('sorted array by value in asc order when sorting key is "value" and order value is "asc"', () => {
    const filterArr = arr.sort(sortArrByProp('value', 'asc'));
    expect(filterArr).toEqual([
      { label: 'a', value: 1 },
      { label: 'b', value: 2 },
      { label: 'c', value: 3 },
      { label: 'd', value: 4 }
    ]);
  });
  it('array as is not sorted when sorting key is not exist in array object and order value is defined', () => {
    const filterArr = arr.sort(sortArrByProp('test', 'asc'));
    expect(filterArr).toEqual(arr);
  });
});
