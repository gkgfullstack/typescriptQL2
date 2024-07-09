import { getVarianceColor } from 'src/utils';
import VARIANCE_COLORS from 'src/enums/varianceColor';

describe('getVarianceColor returns ', () => {
  it('similar color when "value" parameter of function is greater than or equal to 2', () => {
    const color = getVarianceColor(1);
    expect(color).toEqual(VARIANCE_COLORS.similar);
  });
  it('positive color when "value" parameter of function is greater than 2', () => {
    const color = getVarianceColor(3);
    expect(color).toEqual(VARIANCE_COLORS.positive);
  });
  it('negative color when "value" parameter of function is less than -2', () => {
    const color = getVarianceColor(-3);
    expect(color).toEqual(VARIANCE_COLORS.negative);
  });
  it('similar color when "value" parameter of function is not defined', () => {
    const color = getVarianceColor('');
    expect(color).toEqual(VARIANCE_COLORS.similar);
  });
});
