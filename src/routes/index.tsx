import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { Home } from "../pages/Home";
import { MenuBar } from "../pages/MenuBar";
import { Products } from "../pages/Product";
import { PageLogin } from "../pages/Account";
import { PageRegister } from "../pages/Account/layouts/PageRegister";
import { PageForget } from "../pages/Account/layouts/PageForget";
import { Bag } from "../pages/Bag";
import { Address } from "../pages/Address";
import { AddressForm } from "../pages/Address/FormAddress";

export const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menubar" element={<MenuBar />} />
                <Route path="/bag" element={<Bag />} />
                <Route path="/address" element={<Address />} />
                <Route path="/address/address-form" element={<AddressForm />}>
                    <Route path=":id" element={<AddressForm />} />
                </Route>

                <Route path="/account" element={<PageLogin />} />
                <Route path="/account/register-account" element={<PageRegister />} />
                <Route path="/account/forget-account" element={<PageForget />} />
                <Route path="/products/:id" element={<Products />} />
            </Routes>
        </BrowserRouter>
    );
}