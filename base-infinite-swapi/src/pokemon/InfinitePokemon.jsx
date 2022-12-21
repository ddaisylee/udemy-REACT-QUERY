import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Pokemon } from "./Pokemon";

const initialUrl = "https://pokeapi.co/api/v2/pokemon";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePokemon() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery(
    "sw-people",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  if (isLoading) return <div className="loading">로딩중...</div>;
  if (isError) return <div>에러가 발생했습니다...{error.toString()}</div>;

  return (
    <>
      {isFetching && <div className="loading">로딩중...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) =>
          pageData.results.map((pokemon) => (
            <Pokemon name={pokemon.name} key={pokemon.name} />
          ))
        )}
      </InfiniteScroll>
    </>
  );
}
