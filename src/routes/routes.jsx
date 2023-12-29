import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";
import Details from "../pages/Details/Details";
import SearchResult from "../pages/SearchResult/SearchResult";
import Explore from "../pages/Explore/Explore";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/details/:mediaType/:id",
        element: <Details />,
      },
      {
        path: "/search/:query",
        element: <SearchResult />,
      },
      {
        path: "/explore/:mediaType",
        element: <Explore />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
