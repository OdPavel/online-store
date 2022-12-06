import React from 'react';
import { Link } from 'react-router-dom';
import cartEmptyImg from '../assets/img/empty-cart.png';

export const CartIsEmpty = () => {
  return (
    <>
      <div class="cart cart--empty">
        <h2>
          Корзина пуста <icon>😕</icon>
        </h2>
        <p>
          Вероятней всего, вы еще ничего не положили в корзину.
          <br />
          Для того, чтобы что то купить, перейди на главную страницу.
        </p>
        <img src={cartEmptyImg} alt="Empty cart" />
        <Link to="/" class="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </>
  );
};
