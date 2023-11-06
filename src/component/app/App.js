import React, { useEffect } from "react";
import "./basesettings.scss";
import { Routes, Route } from "react-router-dom";
import Layout from "../layout/layout";
import { SignIn } from "../signin/signin";
import { SignUp } from "../signup/signup";
import ListArticle from "../listArticle/listArticle";
import { useDispatch, useSelector } from "react-redux";
import Article from "../article/article";
import { getCurrentUser, getUser } from "../reducer";
import EditProfile from "../profile/editprofile";
import CreateArticle from "../createarticle/createarticle";


export const ROUTES = {
  ROOT: "/",
  PROFILE: "profile",
  SIGN_IN: "sign-in",
  SIGN_UP: "sign-up",
  NEW_ARTICLE: "new-article",
  ARTICLE: "article",
};

function App() {
  const { articles } = useSelector((state) => state.toolkit.pages);
  const { apidate } = useSelector((state) => state.toolkit);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).then((response) => {
      if (response.payload.user) {
        dispatch(getUser(response.payload.user));
      }
    });
  }, [dispatch]);

  const articleRoutes = articles.map((item) => (
    <Route
      key={item.slug}
      path={item.slug}
      element={
        <ul className="solo-page">
          <Article item={item} isArticleView={true} />
        </ul>
      }
    />
  ));
  const articleRoutesNew = Object.keys(apidate).map((slug) => (
    <Route
      key={slug}
      path={`/articles/:${slug}`}
      element={
        <ul className="solo-page">
          <Article item={apidate} isArticleView={true} />
        </ul>
      }
    />
  ));
  const articleRoutesEdit = articles.map((item) => (
    <Route
      key={item.slug}
      path={`/articles/:${item.slug}/edit`}
      element={<CreateArticle item={item} editMode={true} />}
    />
  ));
  const combinedRoutes = [...articleRoutes, ...articleRoutesNew, ...articleRoutesEdit];

  return (
    <div className="app">
      <Routes>
        <Route path={ROUTES.ROOT} element={<Layout />}>
          <Route path={ROUTES.ROOT} element={<ListArticle />} />
          <Route path={ROUTES.PROFILE} element={<EditProfile />} />
          <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route path={ROUTES.NEW_ARTICLE} element={<CreateArticle />} />
          <Route path={ROUTES.ARTICLE} element={<CreateArticle />} />
          {combinedRoutes}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
