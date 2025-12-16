
import axios from "axios"


// save or update user in db hooks
export const saveOrUpdateUsers = async (userData) => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        userData
    );
    return data;
};


export const getUser = async (email) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/users/${email}`
  );
  return data;
};


export const updateUserProfileDB = async (email, updatedData) => {
  const { data } = await axios.patch(
    `${import.meta.env.VITE_API_URL}/users/${email}`,
    updatedData
  );
  return data;
};

