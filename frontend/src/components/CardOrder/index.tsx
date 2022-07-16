import { useState, useEffect } from 'react';
import { IProducts } from '../../interfaces/products';
import { burgerImage, formatMoney } from '../../utils';
import { DivisionItems, QuantityInput } from '../index';
import './styles.css';

interface CardOrderProps {
  product: IProducts;
  amountProduct: number;
  mainColor: string;
  onQuantity?: (quantity: number) => void;
}

export function CardOrder({
  product,
  amountProduct,
  mainColor,
  onQuantity,
}: CardOrderProps) {
  const [price, setPrice] = useState(product.price || 0);

  const handleOnQuantity = (quantity: number) => {
    setPrice(product.price * quantity);
    if (onQuantity) {
      onQuantity(quantity);
    }
  };

  useEffect(() => {
    handleOnQuantity(amountProduct);
  }, [amountProduct]);

  return (
    <>
      <div className="cardOrderContainer">
        <div className="cardOrderImgProduct">
          <div className="cardOrderImg">
            <img src={product.url_image || burgerImage} alt={product.name} />
          </div>
          <div className="cardOrderProduct">
            <span className="titleProduct">{product.category}</span>
            <span className="nameProduct">{product.name}</span>
            <span className="priceProduct" style={{ color: mainColor }}>
              {formatMoney(price)}
            </span>
          </div>
        </div>
        <div className="cardOrderAmount">
          {onQuantity ? (
            <QuantityInput
              mainColor={mainColor}
              sizeRem={2.6}
              minLength={0}
              valueInitial={amountProduct}
              onQuantity={handleOnQuantity}
            />
          ) : (
            <div className="cardOrderInputQuantity">
              <label style={{ color: mainColor }}>Qnt.</label>
              <input
                type="number"
                className="inputValue"
                style={{ color: mainColor }}
                minLength={0}
                max={20}
                value={amountProduct}
                onChange={() => {}}
                disabled
              />
            </div>
          )}
        </div>
      </div>
      <DivisionItems completed={0} mainColor={mainColor} />
    </>
  );
}

export default CardOrder;
