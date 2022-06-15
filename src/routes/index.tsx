import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { Home } from "../pages/Home";
import { MenuBar } from "../pages/MenuBar";
import { Products } from "../pages/Product";
import { RegisterLogin } from "../pages/RegisterLogin";

export const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menubar" element={<MenuBar />} />
                <Route path="/account" element={<RegisterLogin />} />
                <Route path="/products/:id" element={<Products />} />
            </Routes>
        </BrowserRouter>
    );
}