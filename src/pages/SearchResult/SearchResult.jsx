import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import Card from "../../components/Shared/Card/Card";
import Spinner from "../../components/Spinner/Spinner";
import noResults from "../../assets/images/no-results.png";
import "./style.scss";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = useCallback(() => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=1`).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  }, [query]);

  const fetchNextPageData = useCallback(() => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...(data?.results ?? []), ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  }, [query, pageNum, data]);

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query, fetchInitialData]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <h3 className="pageTitle">{`Search ${
                data.total_results > 1 ? "results" : "result"
              } of ' ${query}' `}</h3>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <Card
                      key={index}
                      item={item}
                      endpoint={item.media_type}
                      fromSearch={true}
                    />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <div className="resultNotFound">
              <img src={noResults} alt="No Results" />
              <p>No Results Found</p>
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
