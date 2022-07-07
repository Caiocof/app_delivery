import { ArrowRight } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { DivisionItems } from '../../components/DivisionItems';
import { HeaderPages } from '../../components/HeaderPages';
import { IOrder } from '../../interfaces/order';
import { IUser } from '../../interfaces/user';
import { listOrders } from '../../service/order';
import { formatDate, formatMoney, mainColor } from '../../utils';
import './styles.css'

export const MyOrders = () => {
  const [itemsOrders, setItemsOrders] = useState<IOrder[]>()
  const [useLogged, setUseLegged] = useState<IUser>()

  const status_config = {
    preparing: {
      name: 'Preparando',
      background: '#FEFAE6',
      color: '#D4BC34'
    },
    canceled: {
      name: 'Cancelado',
      background: '#F1D5DA',
      color: '#C44D61'
    },
    send: {
      name: 'Enviado',
      background: '#FEFAE6',
      color: '#4F77BE'
    },
    delivered: {
      name: 'Entregue',
      background: '#F1F8F6',
      color: '#6AB70A'
    }
  }

  useEffect(() => {
    if (useLogged) {
      listOrders(useLogged.id)
        .then(({ data }) => {
          setItemsOrders(data)
        })
        .catch((error) => console.log(error))
    }
  }, [useLogged])

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUseLegged(JSON.parse(localStorage.getItem('user') || ''))
    }
  }, [])

  return (
    <>
      <div className="myOrderContainer">
        <header className="myOrderHeader">
          <HeaderPages
            title='Meus Pedidos'
            iconColor={mainColor}
            navigateRoute='/'
          />
          <DivisionItems
            completed={0}
            mainColor={mainColor}
          />
        </header>
        {itemsOrders?.map((item, index) => {
          return (
            <div key={item.id} className="myOrderCard">
              <div className="myOrderCardLeft">
                <div className="myOrderCardLeftTop">
                  <span>Pedido #{item.id}</span>
                  <p>{formatDate(`${item.created_at}`, "dd/MM/yyy '-' HH:mm")}</p>
                </div>
                <div className="myOrderLeftBottom">
                  <span>Total</span>
                  <p style={{ color: mainColor || '#1B1B1B' }}>{formatMoney((item.sub_total + item.shipping))}</p>
                </div>
              </div>
              <div className="myOrderCardRight">
                <div
                  className="myOrderCardRightTop"
                  style={{
                    backgroundColor: status_config[`${item.order_status}`].background,
                    color: status_config[`${item.order_status}`].color
                  }}
                >
                  <p>{status_config[`${item.order_status}`].name}</p>
                </div>
                <div className="myOrderCardRightBottom" style={
                  { border: `1px solid ${mainColor || '#1B1B1B'}` }
                }>
                  <ArrowRight size={20} color={mainColor} />
                </div>
              </div>
            </div>
          )
        })
        }
      </div>
    </>
  );
}