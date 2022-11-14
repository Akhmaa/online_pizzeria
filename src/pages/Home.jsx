import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

import Pogination from "../components/Pogination";
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

import { sortList } from '../components/Sort'
import { useRef } from "react";







function Home() {
    const navigate = useNavigate();

    const { items, status } = useSelector((state) => state.pizza);
    const { categoryId, sort, currentPage, searchValue } = useSelector((state) => state.filter);
    const dispatch = useDispatch();

    const isSearch = useRef(false);
    const isMounted = useRef(false);




    const getPizzas = async () => {
        let category = categoryId > 0 ? `category=${categoryId}` : '';
        let search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            fetchPizzas({
                category,
                search,
                sort,
                currentPage
            })
        )
        //возвращаемся к началу страницы при загрузке 
        window.scrollTo(0, 0);
    };

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    //Если изенили параметры и быд 1-й рендер, то проверяем URL-параметры и сохроняем и redux'се
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            });

            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProperty, currentPage,])

    //Если был первый рендер то проверяем URL-параметры и сохраняем в redux'се
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);

            dispatch(
                setFilters({
                    ...params,
                    sort
                }),
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
                <Sort />
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