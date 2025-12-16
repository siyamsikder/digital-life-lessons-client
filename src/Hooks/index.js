
import axios from "axios"


// save or update user in db hooks
export const saveOrUpdateUsers = async (userData) => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        userData
    );
    return data;
};