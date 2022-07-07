import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CardOrder } from '../../../components/CardOrder';
import { DivisionItems } from '../../../components/DivisionItems';
import { HeaderPages } from '../../../components/HeaderPages';
import { getOrderById } from '../../../service/order';
import { IProducts } from '../../../interfaces/products';
import { formatMoney, mainColor } from '../../../utils';
import './styles.css';
import {
  CaretRight,
  CreditCard,
  CurrencyCircleDollar,
  MapPin,
} from 'phosphor-react';
import { InputForm } from '../../../components/InputForm';
import { Button } from '../../../components/Button';

export const OrdersDetail = () => {
  const { order_id } = useParams();
  const navigate = useNavigate();

  const [itemOrder, setItemOrder] = useState();
  const [buttonSelected, setButtonSelected] = useState<'money' | 'card'>(
    'money',
  );
  const [theChange, setTheChange] = useState(0);
  const [product, setProduct] = useState<IProducts>({
    id: 1,
    url_image: '/src/assets/burger.png',
    category: 'tradicional',
    name: 'Golden Burger',
    description:
      '2 Blends de carne de 150g, Queijo Cheddar,Bacon Caramelizado, Salada, Molho da casa,Pão brioche artesanal',
    price: 25.5,
  });

  useEffect(() => {
    if (order_id) {
      getOrderById(+order_id)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((error) => console.log(error));
    }
  }, [order_id]);

  return (
    <>
      <div className="orderDetailContainer">
        <header className="orderDetailHeader">
          <HeaderPages title="Pedido #1234" iconColor={mainColor} />
          <p>05/03/2012 - 22:00</p>
          <DivisionItems completed={0} mainColor={mainColor} />
        </header>
        <div className="orderDetailItems">
          <div className="orderDetailItem Top">
            <p>4 itens</p>
            <div className="orderDetailStatus">
              <p>Enviado</p>
            </div>
          </div>
          <div className="orderDetailItemsBody">
            <CardOrder
              product={product}
              amountProduct={1}
              mainColor={mainColor}
            />
          </div>
          <div className="orderDetailCheckout">
            <label>Endereço</label>
            <div
              className="divAddress"
              onClick={() =>
                navigate('/address', { state: { origin: '/checkout' } })
              }
            >
              <div className="iconAddress">
                <MapPin size={32} color={mainColor || '#1B1B1B'} />
              </div>
              <p className="textAddress">321 - Rua das Flores - Jardins...</p>
              <CaretRight size={32} color={mainColor || '#1B1B1B'} />
            </div>
            <label>Tipo de Pagamento</label>
            <div className="checkoutTypePayment">
              <button
                className={
                  buttonSelected == 'money'
                    ? 'buttonSelected'
                    : 'buttonNotSelected'
                }
                onClick={() => setButtonSelected('money')}
              >
                <div className="checkoutIconPayment">
                  <CurrencyCircleDollar size={32} />
                </div>
                <p>Dinheiro</p>
              </button>
              <button
                className={
                  buttonSelected == 'card'
                    ? 'buttonSelected'
                    : 'buttonNotSelected'
                }
                onClick={() => {
                  setButtonSelected('card');
                  setTheChange(0);
                }}
              >
                <div className="checkoutIconPayment">
                  <CreditCard size={32} />
                </div>
                <p>Cartão</p>
              </button>
            </div>
            {buttonSelected == 'money' && (
              <div className="checkoutValuePayment">
                <label>Troco</label>
                <InputForm
                  inputType="number"
                  focusColor={mainColor}
                  value={theChange}
                  onChange={(event) => setTheChange(+event.target.value)}
                  backgroundColor="#F9F9FB"
                />
              </div>
            )}
          </div>
          <div className="checkoutOrderContainer">
            <div className="checkoutOrderBody">
              <div className="checkoutOrderCardItems"></div>
              <div className="checkoutOrderValueTotal">
                <div className="checkoutOrderSubtotal">
                  <span>Subtotal</span>
                  <span>{formatMoney(102)}</span>
                </div>
                <div className="checkoutOrderValueShipping">
                  <span>Frete</span>
                  <span>{formatMoney(15)}</span>
                </div>
                <hr />
                <div className="checkoutOrderTotal">
                  <span>Total</span>
                  <span style={{ color: mainColor || '' }}>
                    {formatMoney(100)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
