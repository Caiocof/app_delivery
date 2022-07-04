import { useState, useContext, useEffect } from 'react';
import { BagContext } from '../../contexts/bagContexts';
import { MessageContext } from '../../contexts/messageContexts';
import { IProducts } from '../../interfaces/products';
import { burgerImage, formatMoney } from '../../utils';
import { CustomDialog } from '../Alerts/Dialog';
import { Message } from '../Alerts/Snackbar';
import { DivisionItems } from '../DivisionItems';
import { QuantityInput } from '../QuantityInput';
import './styles.css'

interface CardOrderProps {
  product: IProducts;
  amountProduct: number;
  mainColor: string;
  onQuantity: (quantity: number) => void;
}

export const CardOrder = ({ product, amountProduct, mainColor, onQuantity }: CardOrderProps) => {
  const [price, setPrice] = useState(product.price || 0)
  const [amountProductState, setAmountProductState] = useState(amountProduct)

  const handleOnQuantity = (quantity: number) => {
    setPrice(product.price * quantity)
    onQuantity(quantity)
  }

  useEffect(() => {
    handleOnQuantity(amountProduct)
  }, [amountProduct])


  return (
    <>
      <div className="cardOrderContainer">
        <div className='cardOrderImg'>
          <img src={product.url_image || burgerImage} alt="Product Image" />
        </div>
        <div className='cardOrderProduct'>
          <span className='titleProduct'>{product.category}</span>
          <span className='nameProduct'>{product.name}</span>
          <span className='priceProduct' style={{ color: mainColor }}>{formatMoney(price)}</span>
        </div>
        <div className='cardOrderAmount'>
          <QuantityInput
            mainColor={mainColor}
            sizeRem={2.6}
            minLength={0}
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