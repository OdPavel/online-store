import React from 'react';
function Categories({ value, onClick }) {
  const caregorieses = [
    'Все',
    'Футболки жіночі',
    'Футболки чоловічі',
    'Обув жіноча',
    'Обув чоловіча',
    'Сумки',
    'Рюкзаки',
  ];

  return (
    <div className="categories">
      <ul>
        {caregorieses.map((categoriese, i) => (
          <li
            key={i}
            className={value === i ? 'active' : ''}
            onClick={() => onClick(i, categoriese)}>
            {categoriese}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
