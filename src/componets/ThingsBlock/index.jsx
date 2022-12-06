import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';

const typesName = ['Red', 'Black', 'Yellow', 'Blue', 'White'];
const sizesType = ['s', 'm', 'l', 'xl', 'xs', 36, 37, 38, 39, 40, 41, 42, 43];

function ThingsBlock({ imageUrl, title, price, sizes, id, types }) {
  const [activeSize, setActiveSize] = React.useState(0);
  const [activeType, setActiveType] = React.useState(0);
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.items.find((obj) => obj.id === id));

  const addedCount = cartItem ? cartItem.count : 0;

  const addItemClick = () => {
    const item = {
      imageUrl,
      title,
      price,
      sizes: sizesType[activeSize],
      types: typesName[activeSize],
      id,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="things-block-wrapper">
      <div className="things-block">
        <img className="things-block__image" src={imageUrl} alt="things" />

        <h4 className="things-block__title">{title}</h4>
        <div className="things-block__selector">
          <ul>
            {types.map((typeid) => (
              <li
                onClick={() => setActiveType(typeid)}
                key={typeid}
                className={activeType === typeid ? 'active' : ''}>
                {typesName[typeid]}
              </li>
            ))}
          </ul>

          <ul>
            {sizes.map((item, index) => (
              <li
                onClick={() => setActiveSize(index)}
                key={index}
                className={activeSize === index ? 'active' : ''}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="things-block__bottom">
          <div className="things-block__price">{price} грн</div>
          <button onClick={addItemClick} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThingsBlock;
