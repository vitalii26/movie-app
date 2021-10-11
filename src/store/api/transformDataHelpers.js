const IMG_PATH = "https://image.tmdb.org/t/p/original";

export const transformMoviesResult = (response) => {
  const transformedData = response.results.map((movie) => ({
    backdrop: `${IMG_PATH}${movie.backdrop_path}`,
    poster: `${IMG_PATH}${movie.poster_path}`,
    release: transformDateStringToUsFormat(movie.release_date),
    title: movie.title,
    id: movie.id,
    rating: movie.vote_average,
    genres: movie.genre_ids,
  }));

  return {
    results: transformedData,
    totalPages: response.total_pages,
    totalResults: response.total_results,
  };
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
    release: transformDateStringToYear(response.release_date),
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

export const transformMovieActorsResult = (response) => {
  const transformedData = response.cast.map((actor) => ({
    character: actor.character,
    id: actor.credit_id,
    name: actor.name,
    img: actor.profile_path
      ? `${IMG_PATH}${actor.profile_path}`
      : "https://image.shutterstock.com/image-vector/avatar-vector-male-profile-gray-260nw-538707355.jpg",
  }));

  return transformedData;
};

export const transformMovieRecommendationsResult = (response) => {
  const transformedData = response.results.map((recommendation) => ({
    backdrop: `${IMG_PATH}${recommendation.backdrop_path}`,
    poster: `${IMG_PATH}${recommendation.poster_path}`,
    title: recommendation.title,
    id: recommendation.id,
    release: transformDateStringToYear(recommendation.release_date),
  }));

  return transformedData;
};

export const transformMovieReviewsResult = (response) => {
  const transformedData = response.results.map((review) => ({
    author: review.author,
    avatar:
      review.author_details.avatar_path.slice(1) ||
      "https://www.libarts.colostate.edu/wp-content/uploads/2018/02/userphoto.png",
    content: review.content,
    date: transformDateStringToUsFormat(review.created_at),
    url: review.url,
    id: review.id,
  }));

  return transformedData;
};

export const transformSearchMovieResults = (response) => {
  const transformedData = response.results.map((movie) => ({
    backdrop: `${IMG_PATH}${movie.backdrop_path}`,
    poster: movie.poster_path
      ? `${IMG_PATH}${movie.poster_path}`
      : "https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png",
    release: transformDateStringToYear(movie.release_date),
    title: movie.title,
    id: movie.id,
    rating: movie.vote_average,
    genres: movie.genre_ids,
  }));

  return {
    results: transformedData,
    totalPages: response.total_pages,
    totalResults: response.total_results,
  };
};

const transformDateStringToUsFormat = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const transformDateStringToYear = (date) => {
  return new Date(date).getFullYear().toString();
};
