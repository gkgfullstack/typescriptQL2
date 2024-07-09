/**
 * @function sortArrByProp
 * @param key - property name in object
 * @param order - type of sorting arr by asc/desc
 * @return {number} - return color from enum type
 * @description
 * Function for sorting array with method sort() with objects by property in object
 */

const sortArrByProp = (key: string, order = 'asc') => (a: any, b: any): number => {
  if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
    return 0;
  }
  const varA = typeof a[key] === 'string' ? a[key].toLowerCase() : a[key];
  const varB = typeof b[key] === 'string' ? b[key].toLowerCase() : b[key];
 
  let comparison = 0;
  if (varA > varB) {
    comparison = 1;
  } else if (varA < varB) {
    comparison = -1;
  }
  return order === 'desc' ? comparison * -1 : comparison;
};
export default sortArrByProp;
