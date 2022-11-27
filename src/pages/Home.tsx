import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";


import Pogination from "../components/Pogination";
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

import { sortList } from '../components/Sort'
import { useRef } from "react";
import { useAppDispatch } from "../redux/store";
import { selectPizzaData } from "../redux/pizza/selectors";
import { selectFilter } from "../redux/filter/selectors";
import { fetchPizzas } from "../redux/pizza/asyncActions";
import { setCurrentPage, setCategoryId, setFilters } from "../redux/filter/slice";
import { SearchPizzaParams } from "../redux/pizza/types";



const Home: React.FC = () => {
    const navigate = useNavigate();

    const { items, status } = useSelector(selectPizzaData);
    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
    const dispatch = useAppDispatch();

    const isSearch = useRef(false);
    const isMounted = useRef(false);


    const getPizzas = async () => {
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';
        const sortBy = sort.sortProperty

        dispatch(
            fetchPizzas({
                category,
                search,
                sortBy,
                currentPage: String(currentPage),
            })
        )
        //возвращаемся к началу страницы при загрузке 
        window.scrollTo(0, 0);
    };

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    const onChangeCategory = useCallback((idx: number) => {
        dispatch(setCategoryId(idx))
    }, []);

    //Если изенили параметры и был 1-й рендер, то проверяем URL-параметры и сохроняем и redux'се
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            });

            navigate(`/?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProperty, currentPage,])

    //Если был первый рендер то проверяем URL-параметры и сохраняем в redux'се
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

            const sort = sortList.find(obj => obj.sortProperty === params.sortBy);

            dispatch(
                setFilters(
                    {
                        searchValue: params.search,
                        categoryId: Number(params.category),
                        currentPage: Number(params.currentPage),
                        sort: sort || sortList[0]
                    }
                ),
            );
            isSearch.current = true;
        }
    }, [])

    //Если был первый рендер то запрашиваем пиццы
    useEffect(() => {
        if (!isSearch.current) {
            getPizzas();
        }

        isSearch.current = false;

    }, [categoryId, sort.sortProperty, searchValue, currentPage,]);



    const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />);
    const skeleton = [...new Array(10)].map((_, index) => <Skeleton key={index} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onChangeCategory} />
                <Sort sort={sort} />
            </div>
            <h2 className="content__title">Все пиццы</h2>

            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>К сожалкнию, не удалось получть пиццы. Попробуйте повторить попытку позже</p>
                </div>
            ) : <div className="content__items">{status === 'loading' ? skeleton : pizzas}</div>}

            <Pogination currentPage={currentPage} onClickPage={onChangePage} />
        </div>
    )
}

export default Home;