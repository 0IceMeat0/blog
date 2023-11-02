import { createAction, createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import * as yup from "yup";
import { v4 as uuidv4 } from 'uuid';

import api from "../service/api";

export const createAccount = createAsyncThunk('account/createAccount', async (newUser, { rejectWithValue }) => {
    try {
        const data = await api.createNewUserAccount(newUser);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const loginAccount = createAsyncThunk('account/loginAccount', async (loginData, { dispatch }) => {
  try {
      const data = await api.login(loginData);
      await dispatch(clearError());
      window.location.href = "/";
      return data;
  } catch (error) {
      return await dispatch(setError(error));
  }
});

export const getCurrentUser = createAsyncThunk('account/getCurrentUser', async (_, { rejectWithValue }) => {
  try {
      const data = await api.getCurrentUser();
      return data;
  } catch (error) {
      return rejectWithValue(`${error}`);
  }
});

export const editAccount = createAsyncThunk('account/editAccount', async (newUserData, { rejectWithValue }) => {
  try {
      const data = await api.editUserAccount(newUserData);
      return data;
  } catch (error) {
      return rejectWithValue(error);
  }
});

export const createArticle = createAsyncThunk(
  'article/createArticle',
  async ({ newArticle, navigate }, { rejectWithValue }) => {
      try {
          const data = await api.createArticle(newArticle);
          navigate(`/articles/${data.article.slug}`);
          
          return data;
      } catch (error) {
          return rejectWithValue(error);
      }
  }
);

export const deleteArticle = createAsyncThunk(
  'article/deleteArticle',
  async ({ slug, navigate }, { rejectWithValue }) => {
      try {
          const data = await api.deleteArticle(slug);
          navigate('/');
          return data;
      } catch (error) {
          return rejectWithValue(error);
      }
  }
);

export const updateArticle = createAsyncThunk(
  'article/updateArticle',
  async ({ newArticle, slug, navigate }, { rejectWithValue }) => {
      try {
          const data = await api.updateArticle(newArticle, slug);
          navigate(`/articles/${data.article.slug}`);
          return data;
      } catch (error) {
          return rejectWithValue(error);
      }
  }
);



export const favoriteArticle = createAsyncThunk(
  'article/favoriteArticle',
  async (slug, { rejectWithValue, dispatch }) => {
      try {
          const data = await api.favoriteArticle(slug);
          const { slug: id, favorited, favoritesCount } = data.article;
          dispatch(updateArticleLike({ slug: id, favorited, favoritesCount }));
          localStorage.setItem(`article_${id}`, JSON.stringify({ favorited, favoritesCount }));
          return data;
      } catch (error) {
          return rejectWithValue(error);
      }
  }
);

export const unfavoriteArticle = createAsyncThunk(
  'article/unfavoriteArticle',
  async (slug, { rejectWithValue, dispatch }) => {
      try {
          const data = await api.unfavoriteArticle(slug);
          const { slug: id, favorited, favoritesCount } = data.article;
          
          dispatch(updateArticleLike({ slug: id, favorited, favoritesCount }));
          localStorage.setItem(`article_${id}`, JSON.stringify({ favorited, favoritesCount }));
          return data;
      } catch (error) {
          return rejectWithValue(error);
      }
  }
);





export const logout = createAsyncThunk('account/logout', () => {
  api.logOut();
  window.location.href = "/";
});

export const schemaUp = yup.object().shape({
  name: yup.string().min(3).max(20).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(40).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password")])
});

export const schemaIn = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(40).required()
});


export const schemaProfile = yup.object().shape({
  name: yup.string().min(3).max(20),
  email: yup.string().email(),
  password: yup.string(),
  image: yup.string()
});

export const schemaNewArticle = yup.object().shape({
  title: yup.string().min(3).required(),
  description: yup.string().required(),
  body: yup.string().min(3).required(),
});




const defaultState = {
  apidate: [],
  user: [],
  tags: [],
  pages: {
    articles: [], 
  },
  load: false,
  isLogin: false,
  favorited: true,
  currentPage: 1,
  error: {}
};
export const updateArticleLike = createAction("update_article_like");
export const updateOneFavorited = createAction("one_favorited");
export const clearError = createAction("clear_error");
export const setError = createAction("set_error");
export const addTag = createAction("add_tag");
export const deleteTag = createAction("delete_tag");
export const editTag = createAction("edit_tag");
export const createTags = createAction("create_tag");
export const setIdPages = createAction("id_page");

export const getUser = createAction("get_user");
export const getPages = createAction("get_pages");

const reducer = createReducer(defaultState, {
  [getPages]: function(state, action){
    state.pages = action.payload;
    state.load = true;
  },
  [getUser]: function(state, action){
    state.user = action.payload;
    state.isLogin = true;
  },
  [addTag]: function(state){
    state.tags.push({ id: uuidv4(), label: '' })
  },
  [deleteTag]: function(state, action) {
    state.tags = state.tags.filter((tag) => tag.id !== action.payload)
  },
  [setIdPages]: function(state, action){
  state.currentPage = action.payload;
  },
  [editTag]: function(state, action) {
    const { tags } = state
    state.tags = tags.map((tag) => (tag.id === action.payload.id ? action.payload : tag))
  },
  [createTags]: function(state, action) {
    state.tags = action.payload;
  },
  [createArticle.fulfilled]: (state, action) => {
    state.apidate = action.payload.article;
  },
  [updateArticle.fulfilled]: (state, action) => {
    state.apidate = action.payload.article;
  },
  [updateArticleLike]: function(state, action) {
    const article = state.apidate;
    console.log(action.payload.favorited);
    if (article.slug === action.payload.slug) {
      article.favorited = action.payload.favorited;
      state.favoritesCount = action.payload.favoritesCount;
    }
  },
    [setError]: function (state, action) {
      state.error = action.payload; 
    },
    [clearError]: function (state) {
      state.error = null; 
    }
});

export default reducer;