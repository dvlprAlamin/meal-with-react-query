import axios from "axios";
import { QueryClient } from "react-query";


const defaultQueryFn = async ({ queryKey }) => {
    console.log(queryKey);
    const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1${queryKey[0]}`);
    return data;
};
export const client = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            cacheTime: 1200000,
            queryFn: defaultQueryFn
        },
    },
})