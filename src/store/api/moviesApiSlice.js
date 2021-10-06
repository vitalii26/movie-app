import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = "b4092e659ce8a357e4a3fd2f0cbc515c";

export const moviesApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => `/discover/movie?api_key=${API_KEY}`,
    }),
    getMovieById: builder.query({
      query: (id) => `/movie/${id}?api_key=${API_KEY}`,
    }),
    searchMovie: builder.query({
      query: (query) => `/search/movie?query=${query}&api_key=${API_KEY}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetMovieByIdQuery, useSearchMovieQuery } =
  moviesApiSlice;
