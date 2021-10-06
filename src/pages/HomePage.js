import SearchPanel from "../components/SearchPanel";
import PageContainer from "../components/containers/PageContainer";
// import { useSearchMovieQuery } from "../store/api/moviesApiSlice";

const HomePage = () => {
  // const { data: movies, isLoading } = useSearchMovieQuery("Planet");
  // console.log(movies);
  return (
    <PageContainer>
      <h1>Welcome.</h1>
      <h2>Millions of movies, TV shows and people to discover. Explore now.</h2>
      <SearchPanel />
    </PageContainer>
  );
};

export default HomePage;
