import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CreditCard, CurrencyCircleDollar, MapPin } from 'phosphor-react';
import { CardOrder, DivisionItems, HeaderPages } from '../../../components';
import { getOrderById } from '../../../service/order';
import { formatDate, formatMoney, mainColor } from '../../../utils';
import { InputForm } from '../../../components/InputForm';
import './styles.css';
import { IOrder } from '../../../interfaces/order';

type dictKeys = 'preparing' | 'canceled' | 'send' | 'delivered';
type valuesKeys = { name: string; background: string; color: string };

export function OrdersDetail() {
  const { order_id: orderId } = useParams();

  const [itemOrder, setItemOrder] = useState<IOrder>();
  const [buttonSelected, setButtonSelected] = useState('money');
  const [valueTotal, setValueTotal] = useState(0);
  const [orderStatus, setOrderStatus] = useState<valuesKeys>();

  const statusConfig: Record<dictKeys, valuesKeys> = {
    preparing: {
      name: 'Preparando',
      background: '#FEFAE6',
      color: '#D4BC34',
    },
    canceled: {
      name: 'Cancelado',
      background: '#F1D5DA',
      color: '#C44D61',
    },
    send: {
      name: 'Enviado',
      background: '#EDF1F8',
      color: '#4F77BE',
    },
    delivered: {
      name: 'Entregue',
      background: '#F1F8F6',
      color: '#6AB70A',
    },
  };

  useEffect(() => {
    if (orderId) {
      getOrderById(+orderId)
        .then(({ data }) => {
          setItemOrder(data);
        })
        .catch((error) =>
          console.error(error));
    }
  }, [orderId]);

  useEffect(() => {
    if (itemOrder) {
      setButtonSelected(itemOrder.method_payment);
      setValueTotal(itemOrder.sub_total + itemOrder.shipping);
      const status = statusConfig[`${itemOrder.order_status}` as dictKeys];
      setOrderStatus(status || '');
    }
  }, [itemOrder]);

  const quantityItems = itemOrder?.items.length || 0;

  return (
    <>
      itemOrder && (
      <div className="orderDetailContainer">
        <header className="orderDetailHeader">
          <HeaderPages
            title={`Pedido #${itemOrder?.id}`}
            iconColor={mainColor}
            navigateRoute="/my-orders"
          />
          <p>{formatDate(`${itemOrder?.created_at}`, "dd/MM/yyy '-' HH:mm")}</p>
          <DivisionItems completed={0} mainColor={mainColor} />
        </header>
        <div className="orderDetailItems">
          <div className="orderDetailItemTop">
            <p>{`${quantityItems} item${quantityItems > 1 ? 's' : ''}`}</p>
            <div
              className="orderDetailStatus"
              style={{
                backgroundColor: orderStatus?.background,
                color: orderStatus?.color,
              }}
            >
              <p>{orderStatus?.name}</p>
            </div>
          </div>
          <DivisionItems completed={0} mainColor={mainColor} />
          <div className="orderDetailItemsBody">
            {itemOrder?.items.map((listItem) =>
              (
                <CardOrder
                  key={listItem.product.id}
                  product={listItem.product}
                  amountProduct={listItem.amount}
                  mainColor={mainColor}
                />
              ))}
          </div>
          <div className="orderDetailCheckout">
            <label htmlFor="a">Endereço</label>
            <div className="orderDetailCheckoutAddress">
              <div className="orderDetailCheckoutIconAddress">
                <MapPin size={32} color={mainColor || '#1B1B1B'} />
              </div>
              <p className="orderDetailCheckoutTextAddress">
                {itemOrder?.address}
              </p>
            </div>
            <label htmlFor="a">Tipo de Pagamento</label>
            <div className="checkoutTypePayment">
              <button
                type="button"
                className={
                  buttonSelected === 'money'
                    ? 'buttonSelected'
                    : 'buttonNotSelected'
                }
                onClick={() =>
                  setButtonSelected('money')}
                disabled
              >
                <div className="checkoutIconPayment">
                  <CurrencyCircleDollar size={32} />
                </div>
                <p>Dinheiro</p>
              </button>
              <button
                type="button"
                className={
                  buttonSelected === 'card'
                    ? 'buttonSelected'
                    : 'buttonNotSelected'
                }
                onClick={() =>
                  setButtonSelected('card')}
                disabled
              >
                <div className="checkoutIconPayment">
                  <CreditCard size={32} />
                </div>
                <p>Cartão</p>
              </button>
            </div>
            {buttonSelected === 'money' && (
              <div className="checkoutValuePayment">
                <label htmlFor="a">Troco</label>
                <InputForm
                  inputType="number"
                  focusColor={mainColor}
                  value={itemOrder?.the_change}
                  backgroundColor="#F9F9FB"
                  disabled
                />
              </div>
            )}
          </div>
          <div className="orderDetailCheckoutContainer">
            <div className="orderDetailCheckoutBody">
              <div className="orderDetailCheckoutCardItems" />
              <div className="orderDetailCheckoutValueTotal">
                <div className="orderDetailCheckoutSubtotal">
                  <span>Subtotal</span>
                  <span>{formatMoney(itemOrder?.sub_total || 0)}</span>
                </div>
                <div className="orderDetailCheckoutValueShipping">
                  <span>Frete</span>
                  <span>{formatMoney(itemOrder?.shipping || 0)}</span>
                </div>
                <hr />
                <div className="orderDetailCheckoutTotal">
                  <span>Total</span>
                  <span style={{ color: mainColor || '' }}>
                    {formatMoney(valueTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
    </>
  );
}

export default OrdersDetail;
