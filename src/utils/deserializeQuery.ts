/**
 * @function deserializeQuery
 * @param search - URL search string ?param=value
 * @return {object} - return object of parameters from search
 * @description
 * Function for parsing search query URL string to object with params
 */

const deserializeQuery = <T>(search: string): T => {
  if (search.includes('?')) {
    const hashes: any[] = search.slice(search.indexOf('?') + 1).split('&');
    return hashes.reduce((params, hash) => {
      const split = hash.indexOf('=');
      const key = hash.slice(0, split);
      const val = hash.slice(split + 1);
      const decodeValue = decodeURIComponent(val).split(';');
      const param = decodeValue.length > 1 ? decodeValue : decodeValue[0];
      return Object.assign(params, { [key]: param });
    }, {} as T);
  }
  return {} as T;
};
export default deserializeQuery;
