import VARIANCE_COLORS from 'src/enums/varianceColor';
/**
 * @function getVarianceColor
 * @param value - number positive or negative for getting color
 * @return {string} - return color from enum type
 * @description
 * Purple color is used for variance values greater than 2%
 * Yellow color is used for variance values less than -2%
 * Grey color is used for variance values from -2% - 2%
 */
const getVarianceColor = (value: number | string): string => {
  const getValue = Number(value);
  const color =
    !isNaN(getValue) && Math.abs(getValue) <= 2
      ? VARIANCE_COLORS.similar
      : getValue > 2
      ? VARIANCE_COLORS.positive
      : VARIANCE_COLORS.negative;
  return color;
};

export default getVarianceColor;
