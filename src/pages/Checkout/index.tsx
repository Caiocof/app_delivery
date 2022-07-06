import { CaretRight, CreditCard, CurrencyCircleDollar, MapPin } from 'phosphor-react';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CustomDialog } from '../../components/Alerts/Dialog';
import { Button } from '../../components/Button';
import { CardOrder } from '../../components/CardOrder';
import { DivisionItems } from '../../components/DivisionItems';
import { HeaderPages } from '../../components/HeaderPages';
import { InputForm } from '../../components/InputForm';
import { BagContext } from '../../contexts/bagContexts';
import { MessageContext } from '../../contexts/messageContexts';
import { IAddress } from '../../interfaces/address';
import { IProducts } from '../../interfaces/products';
import { getShippingForDistrict } from '../../service/shipping';
import { formatMoney, mainColor } from '../../utils';
import './styles.css'

export const Checkout = () => {
  const navigate = useNavigate()
  const { bagProps, addBagItems, removeBagItems } = useContext(BagContext)
  const { messageProps, setMessageProps } = useContext(MessageContext)

  const [selectedProduct, setSelectedProduct] = useState<IProducts>({} as IProducts)
  const [buttonSelected, setButtonSelected] = useState<'money' | 'card'>('money')
  const [addressShipping, setAddressShipping] = useState('')
  const [valueShipping, setValueShipping] = useState(0)
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

  const handleSetAddressShipping = () => {
    if (localStorage.getItem('addressShipping')) {
      const address = JSON.parse(localStorage.getItem('addressShipping') || '')
      getShippingForDistrict(address.district)
        .then(({ data }) => {
          setValueShipping(data[0].price)
          setAddressShipping(`${address.number} - ${address.street} - ${address.district}`)
        }).catch(error => console.log(error))
    }
  }

  useEffect(() => {
    setValueTotal(subTotal + valueShipping)
    return () => { }
  }, [subTotal, valueShipping])

  useEffect(() => {
    setSubTotal(bagProps.reduce((total, item) => total + (item.product.price * item.amount), 0))
  }, [bagProps])

  useEffect(() => {
    handleSetAddressShipping()
  }, [])

  useEffect(() => {
    localStorage.setItem('addressShipping', '')
  }, [addressShipping])

  return (
    <>
      <CustomDialog
        title="Deletar Item"
        description="Deseja realmente deletar esse item?"
        showDialog={showDialog}
        isClicked={handleRemoveItem}
        onHandleClose={(value) => {
          setShowDialog(value);
          handleOnQuantity(selectedProduct, 1)
          setSelectedProduct({} as IProducts);
        }}
      />
      <div className="checkoutContainer">
        <header className="checkoutHeader">
          <HeaderPages
            title='Checkout'
            iconColor={mainColor}
            navigateRoute={bagProps.length ? '/bag' : '/'}
          />
          <DivisionItems
            completed={0}
            mainColor={mainColor}
          />
        </header>
        <div className="checkoutBody">
          <label>Endereço</label>
          <div
            className="divAddress"
            onClick={() => navigate('/address', { state: { origin: '/checkout' } })}
          >
            <div className="iconAddress">
              <MapPin size={32} color={mainColor || '#1B1B1B'} />
            </div>
            <p className="textAddress">{addressShipping}</p>
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
                title='Finalizar Pedido'
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