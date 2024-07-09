import axios from './axiosInstances/privateAxiosInstance';

const API_URL = '/qs/common/help/hotelpropertysearch';

export const getChildrenByPropertyID = (parentId: string) => {
  return axios
    .post(API_URL, {
      hotelPropertySearchData: { id: parentId.replace("^QL:","")},
    })
    .then((response: any) => {
      if (response) {
        const result = response.length > 0 ? response : [];
        return result.map((child: { name: string; id: string }) => {
          return { title: child.name, name: child.name, key: child.id, isLeaf: true, id: child.id };
        });
      }
    })
    .catch(error => {
      console.log(error);
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
};
