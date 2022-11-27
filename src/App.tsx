import React from "react";
import { Routes, Route, } from "react-router-dom";

import Home from './pages/Home';
// import Cart from './pages/Cart';
// import NotFound from './pages/NotFound';
// import FullPizza from './pages/FullPizza';

import MainLayout from './layouts/MainLayout';
import './scss/app.scss';



// ленивая подгрузка. добаляем оптимизацию
const Cart = React.lazy(() => import(/* webpackChunkName: 'Cart' */'./pages/Cart'));
const FullPizza = React.lazy(() => import('./pages/FullPizza'));
const NotFound = React.lazy(() => import('./pages/NotFound'));


function App() {

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path='cart' element={
          <React.Suspense fallback={<div>Идет загрузка...</div>}>
            <Cart />
          </React.Suspense>
        } />
        <Route path='pizza/:id' element={
          <React.Suspense >
            <FullPizza />
          </React.Suspense>
        } />
        <Route path='*' element={
          <React.Suspense fallback={<div>Идет загрузка...</div>}>
            <NotFound />
          </React.Suspense>
        } />
      </Route>
    </Routes>
  );
}

export default App;

