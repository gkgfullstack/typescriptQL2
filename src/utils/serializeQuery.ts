/**
 * @function serializeQuery
 * @param obj - object of params for search query
 * @return {string} - return search string for URL
 * @description
 * Function for decoding object of params to query search string
 */

const serializeQuery = <T extends object>(obj: T): string => {
  const query = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value) {
        const param = (Array.isArray(value) ? value.join(';') : value) as string;
        if (param) {
          query.push(encodeURIComponent(key) + '=' + encodeURIComponent(param));
        }
      }
    }
  }
  return query.join('&');
};

export default serializeQuery;
