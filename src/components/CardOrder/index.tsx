import { useState } from 'react';
import { formatMoney } from '../../utils';
import { DivisionItems } from '../DivisionItems';
import { QuantityInput } from '../QuantityInput';
import './styles.css'

interface CardOrderProps {
  url_image: string;
  titleProduct: string;
  nameProduct: string;
  priceProduct: number;
  amountProduct: number;
  mainColor: string;
}

export const CardOrder = ({
  url_image,
  titleProduct,
  nameProduct,
  priceProduct,
  amountProduct,
  mainColor }: CardOrderProps) => {

  const [price, setPrice] = useState(priceProduct || 0)

  const handleOnQuantity = (quantity: number) => {
    setPrice(priceProduct * quantity)
  }

  return (
    <>
      <div className="cardOrderContainer">
        <div className='cardOrderImg'>
          <img src={url_image || ''} alt="Product Image" />
        </div>
        <div className='cardOrderProduct'>
          <span className='titleProduct'>{titleProduct}</span>
          <span className='nameProduct'>{nameProduct}</span>
          <span className='priceProduct' style={{ color: mainColor }}>{formatMoney(price)}</span>
        </div>
        <div className='cardOrderAmount'>
          <QuantityInput
            mainColor={mainColor}
            sizeRem={2.6}
            valueInitial={amountProduct}
            onQuantity={handleOnQuantity}
          />
        </div>
      </div>
      <DivisionItems
        completed={0}
        mainColor={mainColor}
      />
    </>
  );
}