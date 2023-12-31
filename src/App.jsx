import { useEffect, useCallback } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes.jsx";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch } from "react-redux";
import {
  getApiConfigurations,
  getGenres,
} from "./store/features/home/homeSlice.js";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const fetchApiConfig = useCallback(async () => {
    fetchDataFromApi("/movie/popular").then((res) => {
      dispatch(getApiConfigurations(res));
    });
  }, [dispatch]); // include dependencies here

  const genresCall = useCallback(async () => {
    let promises = [];
    let endPoints = ["movie", "tv"];
    let allGenres = {};

    endPoints.forEach((endPoint) => {
      promises.push(fetchDataFromApi(`/genre/${endPoint}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  }, [dispatch]); // include dependencies here

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, [fetchApiConfig, genresCall]); // genresCall is now memoized and won't change on every render

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
