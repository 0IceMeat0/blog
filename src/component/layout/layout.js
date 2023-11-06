import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./layout.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducer";
import avatar from "../assets/Rectangle 1.png";
import { ROUTES } from "../app/App";

function Layout() {
  const { isLogin, user } = useSelector((state) => state.toolkit);
  const dispatch = useDispatch();

  const handleLogout = () => {
    if (window.confirm("Вы уверены, что хотите выйти?")) {
      dispatch(logout());
    }
  };

  return (
    <div>
      <header className="header">
        <Link to={ROUTES.ROOT}>Realworld Blog</Link>

        {!isLogin ? (
          <div className="header-buttons">
            <button className="header-buttons__sign-in">
              <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </button>
            <button className="header-buttons__sign-up">
              <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
            </button>
          </div>
        ) : (
          <div className="header-buttons__forLoginUsers">
            <button className="header-buttons__create-article">
              <Link to="new-article">Create article</Link>
            </button>
            <Link to={ROUTES.PROFILE}>{user.username}</Link>
            <img
              className="header-buttons__avatar"
              src={user.image ? user.image : avatar}
              alt="logo"
            />
            <button className="header-buttons__log-out" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        )}
      </header>
      <Outlet />
    </div>
  );
}
export default Layout;
