import { useEffect, useCallback } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes.jsx";
import { fecthDataFromApi } from "./utils/api";
import { useDispatch } from "react-redux";
import { getApiConfigurations } from "./store/features/home/homeSlice.js";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const fetchApiConfig = useCallback(async () => {
    fecthDataFromApi("/movie/popular").then((res) => {
      dispatch(getApiConfigurations(res));
    });
  }, [dispatch]); // include dependencies here

  useEffect(() => {
    fetchApiConfig();
  }, [fetchApiConfig]); // include fetchApiConfig in the dependency array

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
