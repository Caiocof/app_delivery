import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Home,
  MenuBar,
  Product,
  PageLogin,
  PageRegister,
  PageForget,
  Bag,
  Address,
  AddressForm,
  Checkout,
  OrdersDetail,
  MyOrders,
} from '../pages';

export function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menubar" element={<MenuBar />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/bag" element={<Bag />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route
          path="/my-orders/order-detail/:order_id"
          element={<OrdersDetail />}
        />
        <Route path="/address" element={<Address />} />
        <Route path="/address/address-form" element={<AddressForm />}>
          <Route path=":id" element={<AddressForm />} />
        </Route>
        <Route path="/account" element={<PageLogin />} />
        <Route path="/account/register-account" element={<PageRegister />} />
        <Route path="/account/forget-account" element={<PageForget />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
