import { Option } from '../reducers/optionsDropdownReducer';
import { getExpandedOptions, getSelectedOptions } from './optionsService';

const optionsInfo: Option[] = [
  {
    value: '1234',
    label: 'Auto',
    hasChildren: true,
  },
  {
    value: '3456',
    label: 'Accessories',
    hasChildren: true,
    children: [
      {
        value: '987',
        label: 'Accessories 1',
        hasChildren: true,
        children: [
          {
            value: '3928',
            label: 'Accessories 2',
            hasChildren: true,
          },
        ],
      },
    ],
  },
];

describe('optionsService service getSelectedOptions method ', () => {
  it('returns empty value when initial setup is not finished', () => {
    const selected = getSelectedOptions(optionsInfo[0], [optionsInfo], [optionsInfo[1]], false);
    expect(selected).toHaveLength(0);
  });
  it('returns empty value when initial setup is finished but there is no displayed options', () => {
    const selected = getSelectedOptions(optionsInfo[0], [], [optionsInfo[1]], true);
    expect(selected).toHaveLength(0);
  });
  it('returns selected value when initial setup is finished and displayed options are defined and expanded options are defined', () => {
    let selected = getSelectedOptions(optionsInfo[0], [optionsInfo], [optionsInfo[1]], true);
    expect(selected).toHaveLength(1);
    expect(selected[0]).toEqual(optionsInfo[0]);

    selected = getSelectedOptions(optionsInfo[0], [optionsInfo], [], true);
    expect(selected).toHaveLength(1);
    expect(selected[0]).toEqual(optionsInfo[0]);

    selected = getSelectedOptions(
      optionsInfo[1].children![0],
      [optionsInfo, optionsInfo[1].children || []],
      [optionsInfo[1]],
      true
    );
    expect(selected).toHaveLength(2);
    expect(selected[0]).toEqual(optionsInfo[1]);
    expect(selected[1]).toEqual(optionsInfo[1].children![0]);
  });
});

describe('optionsService service getExpandedOptions method ', () => {
  it('returns empty value when there is no displayed options', () => {
    const expanded = getExpandedOptions(optionsInfo[0], [], [optionsInfo[1]]);
    expect(expanded).toHaveLength(0);
  });
  it('returns expanded value when initial setup is finished and displayed options are defined and expanded options are defined', () => {
    let expanded = getExpandedOptions(optionsInfo[0], [optionsInfo], []);
    expect(expanded).toHaveLength(1);
    expect([optionsInfo[0]]);

    expanded = getExpandedOptions(optionsInfo[0], [optionsInfo], [optionsInfo[1]]);
    expect(expanded).toHaveLength(1);
    expect(expanded[0]).toEqual(optionsInfo[0]);

    expanded = getExpandedOptions(
      optionsInfo[1].children![0],
      [optionsInfo, optionsInfo[1].children || []],
      [optionsInfo[1]]
    );
    expect(expanded).toHaveLength(2);
    expect(expanded[0]).toEqual(optionsInfo[1]);
    expect(expanded[1]).toEqual(optionsInfo[1].children![0]);
  });
});
