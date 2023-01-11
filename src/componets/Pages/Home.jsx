import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Categories from '../Categories';
import Sort from '../Sort';
import ThingsBlock from '../ThingsBlock';
import Skeleton from '../ThingsBlock/Skeleton';
import { Pagination } from '../Pagination';
import { SearchContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
} from '../../redux/slices/filterSlice';
import { fetchRequestThinck } from '../../redux/slices/requestSlice';

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector((state) => state.request);
  const { categoryId, sortType, currentPage } = useSelector((state) => state.filter);

  const { searchValue } = React.useContext(SearchContext);
  const [categoryName, setCategoryName] = React.useState('');

  const onClickCategory = (id, categories) => {
    dispatch(setCategoryId(id));
    setCategoryName(categories);
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchRequest = async () => {
    dispatch(
      fetchRequestThinck({
        categoryChange,
        sortType,
        currentPage,
        search,
      }),
    );
  };

  const categoryChange = categoryId > 0 ? `category=${categoryId}` : '';

  const search = searchValue ? `search=${searchValue}` : '';

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters({ ...params }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchRequest();
    }
    isSearch.current = false;
  }, [categoryId, sortType, search, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  const skileton = [...new Array(8)].map((_, i) => <Skeleton key={i} />);

  const dataRender = items.map((item) => <ThingsBlock key={item.id} {...item} />);

  // поиск по статичному массиву

  // const dataRender = data
  //   .filter((obj) => {
  //     if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
  //       return true;
  //     }
  //     return false;
  //   })
  //   .map((item) => <ThingsBlock key={item.id} {...item} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClick={onClickCategory} />
        <Sort value={sortType} onChangeSort={(i) => dispatch(setSortType(i))} />
      </div>
      <h2 className="content__title">{categoryName}</h2>
      {status === 'error' ? (
        <div>
          <h2>Произошла ошибка 😕</h2>
          <p>Не удалось получить ответ от сервера.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skileton : dataRender}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};
