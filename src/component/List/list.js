import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import './list.scss';
import { Pagination, Spin } from 'antd'; // Импортируем компонент Spin для отображения индикатора загрузки
import { getPages, setIdPages } from "../reducer";

import ItemPage from "../itempage/itempage";

function List() {
  const dispatch = useDispatch();
  const { load, currentPage } = useSelector(state => state.toolkit);
  const { articlesCount, articles } = useSelector(state => state.toolkit.pages);
  const pageSize = 5;

 

  async function apiGetForms(page) {
    const res = await fetch(`https://blog.kata.academy/api//articles?limit=${pageSize}&offset=${(page - 1) * pageSize}`);
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
      <ItemPage  item={item}  />
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

export default List;
