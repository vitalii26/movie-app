import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  transformMoviesResult,
  transformMovieByIdResult,
  transformMovieActorsResult,
  transformMovieReviewsResult,
  transformMovieRecommendationsResult,
  transformSearchMovieResults,
} from "./transformDataHelpers";

const API_KEY = "b4092e659ce8a357e4a3fd2f0cbc515c";

export const moviesApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: (page) => `/discover/movie?api_key=${API_KEY}&page=${page}`,
      transformResponse: transformMoviesResult,
    }),
    getMovieById: builder.query({
      query: (id) =>
        `/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=actors,reviews,recommendations`,
      transformResponse: transformMovieByIdResult,
    }),
    searchMovie: builder.query({
      query: ({ query, page }) =>
        `/search/movie?query=${query}&api_key=${API_KEY}&page=${page}`,
      transformResponse: transformSearchMovieResults,
    }),
    getMovieActors: builder.query({
      query: (id) => `/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
      transformResponse: transformMovieActorsResult,
    }),
    getMovieReviews: builder.query({
      query: (id) => `/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`,
      transformResponse: transformMovieReviewsResult,
    }),
    getMovieRecommendations: builder.query({
      query: (id) =>
        `/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US`,
      transformResponse: transformMovieRecommendationsResult,
    }),
    getMoviesByIdsArray: builder.query({
      async queryFn(ids, _queryApi, _extraOptions, fetchWithBQ) {
        const results = await Promise.all(
          ids.map((id) =>
            fetchWithBQ(`/movie/${id}?api_key=${API_KEY}&language=en-US`)
          )
        );

        const merged = [...results.map((result) => result.data)];
        const errors = [
          ...results
            .filter((result) => result.error != null)
            .map((result) => result.error),
        ];

        if (errors.length > 0) return { error: errors };

        return { data: merged.map((movie) => transformMovieByIdResult(movie)) };
      },
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieByIdQuery,
  useSearchMovieQuery,
  useLazySearchMovieQuery,
  useGetMovieActorsQuery,
  useGetMovieReviewsQuery,
  useGetMovieRecommendationsQuery,
  useGetMoviesByIdsArrayQuery,
} = moviesApiSlice;
