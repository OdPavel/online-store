import React from 'react';
import styles from './NotFountBlock.module.scss';
import { Link } from 'react-router-dom';

export const NotFountBlock = () => {
  return (
    <div className={styles.root}>
      <h1>Ничего не найденно</h1>
      <icon>😕</icon>
      <p>Что бы сделать покупку вернитесь на главную</p>
      <Link to="/" className={styles.link}>
        Главная
      </Link>
    </div>
  );
};
