import { useState, useContext, useEffect } from 'react'
import { Button } from '../../components/Button'
import { CardOrder } from '../../components/CardOrder'
import { DivisionItems } from '../../components/DivisionItems'
import { HeaderPages } from '../../components/HeaderPages'
import { BagContext } from '../../contexts/bagContexts'
import { burgerImage, formatMoney, mainColor } from '../../utils'
import './styles.css'

export const Bag = () => {
  const { bagProps, addBagItems } = useContext(BagContext)

  const [titleButton, setTitleButton] = useState('Selecionar Endereço')
  const [valueTotal, setValueTotal] = useState(0)
  const [subTotal, setSubTotal] = useState(0)

  useEffect(() => {
    setValueTotal(subTotal + 12.50)
    return () => { }
  }, [subTotal])

  useEffect(() => {
    setSubTotal(bagProps.reduce((total, item) => total + (item.product.price * item.amount), 0))
  }, [bagProps])

  return (
    <div className="bagContainer">
      <header className="bagHeader">
        <HeaderPages
          navigateRoute='/'
          title='Sacola'
          iconColor={mainColor}
        />
        <DivisionItems
          mainColor={mainColor}
          completed={0}
        />
        <span className="bagAmountItems">4 itens</span>
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
              />
            );
          })}
        </div>
        <div className="bagShipping">
          <span>Calcular frete</span>
          <Button
            buttonColor='#FFF'
            borderColor={mainColor}
            title={titleButton}
            titleColor={mainColor}
          />
        </div>
        <div className="bagValueTotal">
          <div className='bagSubtotal'>
            <span>Subtotal</span>
            <span>{formatMoney(subTotal)}</span>
          </div>
          <div className='bagValueShipping'>
            <span>Frete</span>
            <span>R$12,50</span>
          </div>
          <hr />
          <div className='bagTotal'>
            <span>Total</span>
            <span style={{ color: mainColor || '' }}>{formatMoney(valueTotal)}</span>
          </div>
          <Button
            buttonColor={mainColor}
            title='Continuar'
          />

        </div>
      </div>

    </div>
  )
}