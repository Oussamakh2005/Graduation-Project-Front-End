import {config} from "./config.js";
export const handelFetch = async (uri,info) => {
    try{
        const response = await fetch(`${config.API_URL + uri}`,info);
        const data = await response.json();
        return data;
    }catch(err){
        return;
    }
}