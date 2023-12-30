import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTYyMTBiNWU5Mzk0MGQ4Mzc0NWMyNmY3NWZkODU2YyIsInN1YiI6IjYxYjg0YzgzMjc5MGJmMDA4YTgxOTAzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hWddLA96NUBx9lwINY9eDJlHp_bVKzGn9playCIwHd8";

const headers = {
  "Content-Type": "application/json;charset=utf-8",
  Authorization: `Bearer ${TMDB_TOKEN}`,
};

export const fecthDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(`${BASE_URL}${url}`, {
      params,
      headers,
    });
    return data;
  } catch (error) {
    toast.error(error.message);
    return error;
  }
};
