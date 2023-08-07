import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import axios from 'axios';
import { API_KEY_TMDB, SERVER_URL, TMBF_BASE_URL } from '../utils/constants';

const initialState = {
  movies: [],
  moviesLoaded: false,
  genresLoaded: false,
  genres: [],
  likedMovies: [],
  searchedMovies: {
    length: 0,
    movies: [],
  },
};

export const getGenres = createAsyncThunk('netflix/genres', async () => {
  const {
    data: { genres },
  } = await axios.get(
    `${TMBF_BASE_URL}/genre/movie/list?api_key=${API_KEY_TMDB}`
  );
  return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) {
        movieGenres.push(name.name);
      }
    });
    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie.original_name || movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; i < 10 && moviesArray.length < 60; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ''}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchMovies = createAsyncThunk(
  'netflix/trending',
  async ({ type }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();
    const data = getRawData(
      `${TMBF_BASE_URL}/trending/${type}/week?api_key=${API_KEY_TMDB}`,
      genres,
      true
    );
    return data;
  }
);

export const fetchDataByGenre = createAsyncThunk(
  'netflix/genre',
  async ({ genre, type }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();
    const data = getRawData(
      `${TMBF_BASE_URL}/discover/${type}?api_key=${API_KEY_TMDB}&with_genres=${genre}`,
      genres
    );
    return data;
  }
);

export const getUserLikedMovies = createAsyncThunk(
  'netflix/addLikedMovies',
  async (email) => {
    const { data } = await axios.get(
      `${SERVER_URL}/api/user/likedMovies/${email}`
    );
    if (data.msg === 'success') {
      return data.likedMovies;
    }
  }
);

export const removeFromLikedMovies = createAsyncThunk(
  'netflix/removeLikedMovies',
  async ({ email, movieId }) => {
    const { data } = await axios.put(
      `${SERVER_URL}/api/user/likedMovies/remove`,
      {
        email,
        movieId,
      }
    );
    return data.likedMovies;
  }
);

export const searchMovies = createAsyncThunk(
  'netflix/searchMovies',
  async ({ term }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();
    const { data } = await axios.get(
      `${TMBF_BASE_URL}/search/movie?query=${term}&api_key=${API_KEY_TMDB}`
    );
    const searchedMovies = [];
    createArrayFromRawData(data.results, searchedMovies, genres);
    return searchedMovies;
  }
);

const netflixSlice = createSlice({
  name: 'netflix',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.genresLoaded = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      })
      .addCase(fetchDataByGenre.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.moviesLoaded = true;
      })
      .addCase(getUserLikedMovies.fulfilled, (state, action) => {
        state.likedMovies = action.payload;
      })
      .addCase(removeFromLikedMovies.fulfilled, (state, action) => {
        state.likedMovies = action.payload;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.searchedMovies.movies = action.payload;
        state.searchedMovies.length = action.payload.length;
      });
  },
});

export const store = configureStore({
  reducer: {
    netflix: netflixSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
