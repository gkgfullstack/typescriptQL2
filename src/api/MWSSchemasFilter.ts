import axios from './axiosInstances/privateAxiosInstance';
import { useEffect, useState } from "react";
import auth from 'src/services/auth';

const API_URL = '/oc/mwsschema/retrieveall';

export const useGetMWSSchemas = () => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const userId = auth.getUserId();
        axios && axios.get(API_URL, {
            params: {
                userId
            }
        })
            .then((response: any) => {
                setOptions(response.mwsSchemaResponse.mwsSchema);
            })
            .catch(error => {
                console.log(error);
            });
    }, [setOptions]);

    return [options];
};