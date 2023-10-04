

import axios from "axios";

export const authenticateUser = async(payload) => {
    try {
        const response = await axios.post(`http://localhost:1145/authentication`, payload);
        return response
       
    } catch (e) {
        console.log({e});
        throw new Error(e.message)
    }
 
};