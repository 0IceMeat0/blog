import React, { useEffect } from "react";
import './basesettings.scss';
import { Routes, Route } from "react-router-dom";
import Layout from "../layout/layout";
import SignIn from "../signin/signin";
import SignUp from "../signup/signup";
import List from "../List/list";
import { useDispatch, useSelector } from "react-redux";
import ItemPage from "../itempage/itempage";
import { getCurrentUser, getUser } from "../reducer";
import EditProfile from "../profile/editprofile";
import CreateArticle from "../createarticle/createarticle";

function App() {
    const { articles } = useSelector(state => state.toolkit.pages);
    const { apidate } = useSelector(state => state.toolkit);
    const dispatch = useDispatch();
 
    useEffect(() => {
        dispatch(getCurrentUser()).then(response => {
            
            if (response.payload.user) {
                dispatch(getUser(response.payload.user)); 
            }
        });
    }, [dispatch]);

    const articleRoutes = articles.map((item) => (
        <>
       <Route key={item.slug} path={item.slug} element={<ul className="solo-page"><ItemPage item={item} isArticleView={true} /></ul>} />
        </>
      ));
      const articleRoutesNew = Object.keys(apidate).map((slug) => (
        <Route
          key={slug}
          path={`/articles/:${slug}`}
          element={<ul className="solo-page"><ItemPage item={apidate} isArticleView={true} /></ul>}
        />
      ));
      const articleRoutesEdit = articles.map((item) => (
        <Route
          key={item.slug}
          path={`/articles/:${item.slug}/edit`}
          element={<CreateArticle item={item} editMode={true} />}
        />
      ));
      const combinedRoutes = [
        ...articleRoutes,
        ...articleRoutesNew,
        ...articleRoutesEdit
      ];

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<List />}/>
                    <Route path="profile" element={<EditProfile />} />
                    <Route path="sign-in" element={<SignIn />} />
                    <Route path="sign-up" element={<SignUp />} />
                    <Route path="new-article" element={<CreateArticle />} />
                    <Route path="article" element={<CreateArticle />} />
                    {combinedRoutes}
                </Route>
            </Routes>
        </div>
    );
}

export default App;
