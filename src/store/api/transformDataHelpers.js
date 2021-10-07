const IMG_PATH = "https://image.tmdb.org/t/p/original/";

export const transformMoviesResult = (response) => {
  const transformedData = response.results.map((movie) => ({
    backdrop: `${IMG_PATH}${movie.backdrop_path}`,
    poster: `${IMG_PATH}${movie.poster_path}`,
    release: new Date(movie.release_date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    title: movie.title,
    id: movie.id,
    rating: movie.vote_average,
    genres: movie.genre_ids,
  }));

  return { results: transformedData };
};

export const transformMovieByIdResult = (response) => {
  return {
    backdrop: `${IMG_PATH}${response.backdrop_path}`,
    poster: `${IMG_PATH}${response.poster_path}`,
    runtime: `${Math.floor(response.runtime / 60)}h ${response.runtime % 60}m`,
    genres: response.genres.map((genre) => genre.name).join(", "),
    id: response.id,
    title: response.original_title,
    overview: response.overview,
    tagline: response.tagline,
    release: new Date(response.release_date).getFullYear().toString(),
    video: response.video,
    voteAverage: response.vote_average,
    voteCount: response.vote_count,
    languages: response.spoken_languages.map((language) => language.name),
    companies: response.production_companies.map((company) => {
      return company.logo_path
        ? {
            logo: `${IMG_PATH}${company.logo_path}`,
            name: company.name,
          }
        : { name: company.name };
    }),
    imdbId: response.imdb_id,
  };
};
