import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getItemForId } from '../../service/items';
import { IProducts } from '../../interfaces/products';

import { HeaderPages } from '../../components/HeaderPages';
import { burgerImage, formatMoney, mainColor } from '../../utils';
import { DivisionItems } from '../../components/DivisionItems';
import { QuantityInput } from '../../components/QuantityInput';
import { Button } from '../../components/Button';

import './styles.css'

export const Products = () => {
    const { id: id_product } = useParams()
    const navigate = useNavigate()

    const [item, setItem] = useState<IProducts>({} as IProducts)
    const [price, setPrice] = useState(0)



    const handleGetItem = (id_product: number) => {
        getItemForId(id_product)
            .then(({ data }) => {
                setItem(data)
                setPrice(data.price)
            })
            .catch((error) => console.log(error)
            )
    }

    const handleOnQuantity = (quantity: number) => {
        setPrice(item.price * quantity)
    }

    useEffect(() => {
        if (id_product) {
            handleGetItem(+id_product)
        }
    }, [id_product])



    return (
        <div className="containerProducts">
            <div className="headerProducts">
                <HeaderPages
                    iconColor='#FFF'
                    title='Produto'
                    titleColor='#FFF'
                    rightButton={true}
                    backgroundColor='#F08E00'
                    navigateRoute='/'
                />
                <div className="productImage">
                    <img src={burgerImage} alt="Product Image" />
                </div>
            </div>
            <div className="bottomProducts">
                <span className="categoryProducts">{item.category}</span>
                <span className="nameProducts">{item.name}</span>
                <DivisionItems
                    mainColor={mainColor}
                    completed={76}
                />
                <p className="descriptionProducts">{item.description}</p>
                <span className="quantityProducts">Quantidade</span>
                <form action="">

                    <div className="divQuantity">
                        <QuantityInput
                            mainColor={mainColor}
                            sizeRem={3}
                            onQuantity={handleOnQuantity}

                        />
                        <span className="priceProducts" style={{ color: mainColor }}>
                            {formatMoney(price)}
                        </span>
                    </div>
                    <Button
                        title='Adicionar à sacola'
                        buttonColor={mainColor}
                    />
                </form>
            </div>
        </div>
    );
}