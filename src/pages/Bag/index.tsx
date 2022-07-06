import { useState, useContext, useEffect, FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CustomDialog } from '../../components/Alerts/Dialog'
import { Message } from '../../components/Alerts/Snackbar'
import { Button } from '../../components/Button'
import { CardOrder } from '../../components/CardOrder'
import { DivisionItems } from '../../components/DivisionItems'
import { HeaderPages } from '../../components/HeaderPages'
import { BagContext } from '../../contexts/bagContexts'
import { MessageContext } from '../../contexts/messageContexts'
import { IAddress } from '../../interfaces/address'
import { IProducts } from '../../interfaces/products'
import { getShippingForDistrict } from '../../service/shipping'
import { formatMoney, mainColor } from '../../utils'
import './styles.css'

export const Bag = () => {
  const navigate = useNavigate()

  const { bagProps, addBagItems, removeBagItems } = useContext(BagContext)
  const { messageProps, setMessageProps } = useContext(MessageContext)

  const [addressShipping, setAddressShipping] = useState('')
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

  const handleOrderSubmit = () => {
    if (!valueShipping) {
      setMessageProps({
        message: 'Selecione o endereço de entrega!',
        typeMessage: 'warning',
        showMessage: true
      })
      return
    }

    navigate('/checkout')
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
      <Message
        message={messageProps.message}
        typeMessage={messageProps.typeMessage}
        show={messageProps.showMessage}
      />
      <div className="bagContainer">
        <header className="bagHeader">
          <HeaderPages
            navigateRoute={'/'}
            title='Sacola'
            iconColor={mainColor}
          />
          <DivisionItems
            mainColor={mainColor}
            completed={0}
          />
          <span className="bagAmountItems">{`${bagProps.length} item${bagProps.length > 1 ? 's' : ''}`}</span>
          <DivisionItems
            mainColor={mainColor}
            completed={0}
          />
        </header>
        <div className="body">
          <div className="bagCardItems">
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
          <div className="bagShipping">
            <span>Calcular frete</span>
            <Button
              buttonColor='#FFF'
              borderColor={mainColor}
              title={addressShipping || 'Selecionar Endereço'}
              titleColor={addressShipping ? '#6A7D8B' : mainColor}
              isClicked={() => navigate('/address', { state: { origin: '/bag' } })}
            />
          </div>
          <div className="bagValueTotal">
            <div className='bagSubtotal'>
              <span>Subtotal</span>
              <span>{formatMoney(subTotal)}</span>
            </div>
            <div className='bagValueShipping'>
              <span>Frete</span>
              <span>{formatMoney(valueShipping)}</span>
            </div>
            <hr />
            <div className='bagTotal'>
              <span>Total</span>
              <span style={{ color: mainColor || '' }}>{formatMoney(valueTotal)}</span>
            </div>
            <Button
              buttonColor={mainColor}
              title='Continuar'
              disabled={bagProps.length ? false : true}
              isClicked={handleOrderSubmit}
            />
          </div>
        </div>

      </div>
    </>
  )
}