import axios from 'src/api/axiosInstances/privateAxiosInstance';
import { useEffect, useState } from 'react';
import { Category } from 'src/types/autoPartsCategory';

const API_URL = '/qs/common/help/racategory';
const API_URL_SEARCH = '/qs/common/help/getracategorysearch';

const transformStringToHex = (string: string) => {
  const bytes = [];
  const length = string.length;

  for (let i = 0; i < length; i++) {
    const hex = Number(string.charCodeAt(i)).toString(16);
    bytes.push(hex);
  }
  return bytes.join('').toUpperCase();
};

export const useAutopartsCategory = (site: string, parentId?: string) => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<Array<Category>>([]);

  useEffect(() => {
    if (site) {
      setLoading(true);
      axios &&
        axios
          .get(API_URL, {
            params: {
              siteCode: site,
              appId: '163',
              parentId,
            },
          })
          .then((response: any) => {
            if (response) {
              const transformedData = response.categoryCC.map((category: Category) => {
                return {
                  key: category.ID,
                  title: `${category.name}: ${category.name}`,
                  isLeaf: category.hasChild === 'N',
                  ID: category.ID,
                  disabled: category.hasChild !== 'N',
                  categoryPath: category.name,
                };
              });
              setLoading(false);
              setCategory(transformedData);
            }
          })
          .catch(error => {
            setLoading(false);
            console.log(error);
          });
    } else {
      setCategory([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [site]);

  return [loading, category];
};

const transformSearchData = (response: any) => {
  if (response.categoryResponseCC._data) {
    return response.categoryResponseCC._data;
  }

  return [];
};

export const useSearchAutopartsCategory = (site: string, vertical: string, search: string) => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<Array<Category>>([]);

  useEffect(() => {
    if (site && search && vertical) {
      setLoading(true);
      axios &&
        axios
          .get(API_URL_SEARCH, {
            params: {
              siteCode: site,
              appId: vertical,
              searchName: transformStringToHex(search),
            },
          })
          .then((response: any) => {
            if (response && response.categoryResponseCC) {
              setCategory(transformSearchData(response));
            }
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
            console.log(error);
          });
    } else {
      setCategory([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [site, search, vertical]);

  return [loading, category];
};

export const getAutopartsCategory = (site: string, parentId: string): Promise<any> => {
  return axios.get(API_URL, {
    params: {
      siteCode: site,
      appId: '163',
      parentId: parentId,
    },
  });
};
