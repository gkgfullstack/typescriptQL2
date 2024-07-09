import axios from './axiosInstances/privateAxiosInstance';
import { useEffect, useState } from "react";

const API_URL = '/qs/account/user/vertical';
export const useVarticalTableFilter = () => {
    const [options, setOptions] = useState([]);
    let enableAdminMode = localStorage.getItem("bAdminMode")?.toString() === undefined ? false : localStorage.getItem("bAdminMode")?.toString();
    useEffect(() => {
        
        const enableAdmin:any = enableAdminMode;
        axios && axios.get(API_URL, {
            params: {
                ...(enableAdmin && { enableAdmin }),
            }
        })
            .then((response: any) => {
                setOptions(response.vertical);
            })
            .catch(error => {
                console.log(error);
            });
    }, [setOptions, enableAdminMode]);

    return [options];
};
