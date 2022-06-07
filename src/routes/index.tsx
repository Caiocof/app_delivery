import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { Home } from "../pages/Home";
import { Products } from "../pages/Product";

export const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products/:id" element={<Products />} />
            </Routes>
        </BrowserRouter>
    );
}