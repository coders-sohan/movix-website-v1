import { useEffect, useState } from "react";
import { fecthDataFromApi } from "../utils/api";

const useFetch = (url) => {
  const [data, setdata] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setdata(null);
    setError(null);

    fecthDataFromApi(url)
      .then((res) => {
        setLoading(false);
        setdata(res);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
