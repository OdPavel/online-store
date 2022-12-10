import React from 'react';
import axios from 'axios';
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
import { setItems } from '../../redux/slices/requestSlice';

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const items = useSelector((state) => state.request.items);
  const { categoryId, sortType, currentPage } = useSelector((state) => state.filter);

  const { searchValue } = React.useContext(SearchContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryName, setCategoryName] = React.useState('');

  const onClickCategory = (id, categories) => {
    dispatch(setCategoryId(id));
    setCategoryName(categories);
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchRequest = async () => {
    setIsLoading(true);

    // await axios
    //   .get(
    //     `https://636a9404c07d8f936da23cbd.mockapi.io/thincks?${categoryChange}&sortBy=${sortType.sortProperty}&page=${currentPage}&limit=4&${search}&order=acs`,
    //   )
    //   .then((res) => {
    //     setData(res.data);
    //     setIsLoading(false);
    //   });

    try {
      const { data } = await axios.get(
        `https://636a9404c07d8f936da23cbd.mockapi.io/thincks?${categoryChange}&sortBy=${sortType.sortProperty}&page=${currentPage}&limit=4&${search}&order=acs`,
      );
      dispatch(setItems(data));
    } catch (error) {
      console.log('ERROR', error);
    } finally {
      setIsLoading(false);
    }
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
      <div className="content__items">{isLoading ? skileton : dataRender}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};
