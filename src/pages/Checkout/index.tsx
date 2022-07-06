import { CaretRight, CreditCard, CurrencyCircleDollar, MapPin } from 'phosphor-react';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { CardOrder } from '../../components/CardOrder';
import { DivisionItems } from '../../components/DivisionItems';
import { HeaderPages } from '../../components/HeaderPages';
import { InputForm } from '../../components/InputForm';
import { BagContext } from '../../contexts/bagContexts';
import { MessageContext } from '../../contexts/messageContexts';
import { IProducts } from '../../interfaces/products';
import { formatMoney, mainColor } from '../../utils';
import './styles.css'

export const Checkout = () => {
  const [buttonSelected, setButtonSelected] = useState<'money' | 'card'>('money')

  const navigate = useNavigate()
  const location = useLocation()
  const { bagProps, addBagItems, removeBagItems } = useContext(BagContext)
  const { messageProps, setMessageProps } = useContext(MessageContext)

  const [titleButton, setTitleButton] = useState('')
  const [valueShipping, setValueShipping] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState<IProducts>({} as IProducts)
  const [showDialog, setShowDialog] = useState(false)
  const [valueTotal, setValueTotal] = useState(0)
  const [subTotal, setSubTotal] = useState(0)

  const handleOnQuantity = (product: IProducts, quantity: number) => {
    if (quantity == 0) {
      setShowDialog(true)
      setSelectedProduct(product)
    }

    addBagItems(product, quantity)
  }

  const handleRemoveItem = () => {
    removeBagItems(selectedProduct)
    setSelectedProduct({} as IProducts)
    setMessageProps({
      message: 'Item removido com sucesso!',
      typeMessage: 'info',
      showMessage: true
    })
  }

  const handleOrderSubmit = (event: FormEvent) => {
    event.preventDefault()


  }

  useEffect(() => {
    setValueTotal(subTotal + valueShipping)
    return () => { }
  }, [subTotal, valueShipping])

  useEffect(() => {
    setSubTotal(bagProps.reduce((total, item) => total + (item.product.price * item.amount), 0))
  }, [bagProps])

  return (
    <>
      <div className="checkoutContainer">
        <header className="checkoutHeader">
          <HeaderPages
            title='Checkout'
            iconColor={mainColor}
            navigateRoute='/bag'
          />
          <DivisionItems
            completed={0}
            mainColor={mainColor}
          />
        </header>
        <div className="checkoutBody">
          <label>Endereço</label>
          <div className="divAddress">
            <div className="iconAddress">
              <MapPin size={32} color={mainColor || '#1B1B1B'} />
            </div>
            <p className="textAddress">321 - Rua das Flores - Jardins...</p>
            <CaretRight size={32} color={mainColor || '#1B1B1B'} />
          </div>
          <label>Tipo de Pagamento</label>
          <div className="checkoutTypePayment">
            <button className={buttonSelected == 'money'
              ? 'buttonSelected' : 'buttonNotSelected'}
              onClick={() => setButtonSelected('money')}
            >
              <div className='checkoutIconPayment'>
                <CurrencyCircleDollar size={32} />
              </div>
              <p>Dinheiro</p>
            </button>
            <button className={buttonSelected == 'card'
              ? 'buttonSelected' : 'buttonNotSelected'}
              onClick={() => setButtonSelected('card')}
            >
              <div className='checkoutIconPayment'>
                <CreditCard size={32} />
              </div>
              <p>Cartão</p>
            </button>
          </div>
          {buttonSelected == 'money' &&
            <div className="checkoutValuePayment">
              <label >Troco</label>
              <InputForm
                inputType='number'
                focusColor={mainColor}
                backgroundColor='#F9F9FB'
              />
            </div>}
        </div>
        <div className="checkoutOrderContainer">
          <header className="checkoutOrderHeader">
            <DivisionItems
              mainColor={mainColor}
              completed={0}
            />
            <span className="checkoutOrderAmountItems">{`${bagProps.length} item${bagProps.length > 1 ? 's' : ''}`}</span>
            <DivisionItems
              mainColor={mainColor}
              completed={0}
            />
          </header>
          <div className="checkoutOrderBody">
            <div className="checkoutOrderCardItems">
              {bagProps?.map((item) => {
                return (
                  <CardOrder
                    key={item.product.id}
                    product={item.product}
                    amountProduct={item.amount}
                    mainColor={mainColor}
                    onQuantity={(value) => handleOnQuantity(item.product, value)}
                  />
                );
              })}
            </div>
            <div className="checkoutOrderValueTotal">
              <div className="checkoutOrderSubtotal">
                <span>Subtotal</span>
                <span>{formatMoney(subTotal)}</span>
              </div>
              <div className="checkoutOrderValueShipping">
                <span>Frete</span>
                <span>{formatMoney(valueShipping)}</span>
              </div>
              <hr />
              <div className="checkoutOrderTotal">
                <span>Total</span>
                <span style={{ color: mainColor || '' }}>{formatMoney(valueTotal)}</span>
              </div>
              <Button
                buttonColor={mainColor}
                title='Continuar'
                disabled={bagProps.length > 0 ? false : true}
                onClick={handleOrderSubmit}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}