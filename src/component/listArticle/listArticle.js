import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./listArticle.scss";
import { Pagination, Spin } from "antd"; 
import { getPages, setIdPages } from "../reducer";

import Article from "../article/article";

function ListArticle() {
  const dispatch = useDispatch();
  const { load, currentPage } = useSelector((state) => state.toolkit);
  const { articlesCount, articles } = useSelector(
    (state) => state.toolkit.pages,
  );
  const pageSize = 5;

  async function apiGetForms(page) {
    const res = await fetch(
      `https://blog.kata.academy/api//articles?limit=${pageSize}&offset=${
        (page - 1) * pageSize
      }`,
    );
    const data = await res.json();
    dispatch(getPages(data));
  }

  useEffect(() => {
    apiGetForms(currentPage);
  }, [currentPage]);

  if (!load) {
    return <Spin className="load" size="large" />;
  }

  const element = articles.map((item) => {
    return (
      <div key={`${item.slug}${item.author}${item.description}`}>
        <Article item={item} />
      </div>
    );
  });

  return (
    <div>
      <ul className="list">{element}</ul>
      <Pagination
        className="list-pagination"
        current={currentPage}
        onChange={(page) => dispatch(setIdPages(page))}
        pageSize={pageSize}
        total={articlesCount}
      />
    </div>
  );
}

export default ListArticle;
