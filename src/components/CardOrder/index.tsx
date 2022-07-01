import { useState, useContext } from 'react';
import { BagContext } from '../../contexts/bagContexts';
import { IProducts } from '../../interfaces/products';
import { burgerImage, formatMoney } from '../../utils';
import { DivisionItems } from '../DivisionItems';
import { QuantityInput } from '../QuantityInput';
import './styles.css'

interface CardOrderProps {
  product: IProducts;
  amountProduct: number;
  mainColor: string;
}

export const CardOrder = ({
  product,
  amountProduct,
  mainColor,
}: CardOrderProps) => {

  const { addBagItems, removeBagItems } = useContext(BagContext)
  const [price, setPrice] = useState(product.price || 0)

  const handleOnQuantity = (quantity: number) => {
    if (quantity == 0) {
      removeBagItems(product)
      return 
    }
    setPrice(product.price * quantity)
    addBagItems(product, quantity)
  }

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