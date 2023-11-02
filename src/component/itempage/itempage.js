import React, { useEffect, useState } from "react";
import './itempage.scss'
import { Link, useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteArticle, favoriteArticle, unfavoriteArticle } from "../reducer";
import ReactMarkdown from 'react-markdown';

function ItemPage({ item, isArticleView }) {
  const { user, isLogin } = useSelector(state => state.toolkit);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(item.favoritesCount);


  const sliceString = (str, num) => {
    if (str && str.length > num) {
      const newStr = `${str.slice(0, num)}...`;
      return newStr;
    }
    return str;
  };

  
  useEffect(() => {
    const localStorageData = localStorage.getItem(`article_${item.slug}`);
    if (localStorageData) {
      const { favorited, favoritesCount } = JSON.parse(localStorageData);
      setIsFavorited(favorited);
      setFavoritesCount(favoritesCount);
    }
  }, [item.slug]);
  
  const onLike = () => {
    if (!isLogin) return;
    if (isFavorited) {
      dispatch(unfavoriteArticle(item.slug));
      setIsFavorited(false);
      setFavoritesCount(favoritesCount - 1);
    } else {
      dispatch(favoriteArticle(item.slug));
      setIsFavorited(true);
      setFavoritesCount(favoritesCount + 1);
    }
  
    localStorage.setItem(`article_${item.slug}`, JSON.stringify({ favorited: isFavorited, favoritesCount }));
  }

  const onDelete = () => {
    dispatch(deleteArticle({ slug: item.slug, navigate }));
    navigate('/');
  };

  return (
    <li className="item">
      <div>
        <div className="item__like">
          <Link to={`/${item.slug}`}>
            <h3 className="item__title">
              {item.title.length > 50 ? item.title.slice(0, 50) : item.title}
            </h3>
          </Link>

          {isFavorited && isLogin ? (
  <HeartFilled className="heart-icon" onClick={onLike} />
) : (
  <HeartOutlined className="heart-icon-outlined" onClick={onLike} />
)}

<span>{favoritesCount}</span>
        </div>
        <div className="item__tags">
          {item.tagList.map((tag, index) => <Tag key={index}>{sliceString(tag, 10)}</Tag>)}
        </div>
        {item.description && (
        <div className="item__description">
        <ReactMarkdown children={item.description} />
      </div>
        )}

{item.body && (
  <div className="item__body">
    <ReactMarkdown children={item.body} />
  </div>
)}
      </div>
      <div className="item-user">
        <div className="item-user__info">
          <div className="item-user__name">{item.author.username}</div>
          <div className="item-user__date">{format(new Date(item.createdAt), 'dd MMMM yyyy')}</div>
        </div>
        <img className="item-user__photo" src={item.author.image} alt="Author" />

        {isArticleView && item.author.username === user.username && (
          <ul className="buttons">
            <li>
              <button className="buttons__delete" type="button" onClick={() => setModal(true)}>
                Delete
              </button>
            </li>
            <li>
              <Link to={`/articles/${item.slug}/edit`} className="buttons__edit">
                Edit
              </Link>
            </li>
          </ul>
        )}

        {modal && (
          <div className="message">
            <span className="message__text">Are you sure to delete this article?</span>
            <div className="message__buttons">
              <button type="button" className="message__buttons-no" onClick={() => setModal(false)}>
                No
              </button>
              <button type="button" className="message__buttons-yes" onClick={() => onDelete()}>
                Yes
              </button>
            </div>
          </div>
        )}
      </div>
    </li>
  );
}

export default ItemPage;
