import axios from './axiosInstances/privateAxiosInstance';
import { useEffect, useState } from 'react';
import { Bookmark } from 'src/types/autoPartsBookmarks';

const API_URL = '/qs/common/help/getrabookmark';

export const useAutopartsBookmark = (site: string, vertical: string) => {
  const [bookmarksSet, setBookmarksSet] = useState<Array<Bookmark>>([]);
  useEffect(() => {
    if (site && vertical) {
      axios &&
        axios
          .get(API_URL, {
            params: {
              siteCode: site,
              appId: vertical,
            },
          })
          .then((response: any) => {
            if (response) {
              setBookmarksSet(
                response.bookMarkResponse.map((item: { [key: string]: string | number }) => {
                  return { id: item.bookmarkId, name: item.bookmarkName };
                })
              );
            }
          })
          .catch(error => {
            console.log(error);
          });
    } else {
      setBookmarksSet([]);
    }
  }, [site]);
  return [bookmarksSet];
};
