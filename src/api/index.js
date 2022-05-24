import axios from "axios";

const BASE_URL = "https://frontend-test-assignment-api.abz.agency/api/v1";

export const getUsers = async (count) =>  {
  try {
    const response = await axios.get(`${BASE_URL}/users?count=${count}`);
      if (response && response.data) {
        return response.data?.users;
      }
  } catch (error) {
      console.error(error);
  }
}

export const getToken = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/token`);
    if (response && response.data) {
      return response.data?.token;
    }
  } catch (error) {
      console.error(error);
  }
}

export const getPositions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/positions`);
    if (response && response.data) {
      return response.data?.positions;
    }
  } catch (error) {
      console.error(error);
  }
}

export async function postUserData(formdata, token) {
    try {
      return await axios.post(`${BASE_URL}/users`, formdata, {
        headers: {
          "Content-Type": "application/json",
          "Token": token
        },
      });
    } catch (error) {
        console.error(error);
    }
}
