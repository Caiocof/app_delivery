import { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getItemForId } from '../../service/items';
import { IProducts } from '../../interfaces/products';

import { BagContext } from '../../contexts/bagContexts';

import { HeaderPages } from '../../components/HeaderPages';
import { burgerImage, formatMoney, mainColor } from '../../utils';
import { DivisionItems } from '../../components/DivisionItems';
import { QuantityInput } from '../../components/QuantityInput';
import { Button } from '../../components/Button';

import './styles.css'
import { MessageContext } from '../../contexts/messageContexts';
import { Message } from '../../components/Alerts/Snackbar';


export const Products = () => {
    const navigate = useNavigate()

    const { id: id_product } = useParams()
    const { addBagItems } = useContext(BagContext)
    const { messageProps, setMessageProps } = useContext(MessageContext)

    const [item, setItem] = useState<IProducts>({} as IProducts)
    const [amountItems, setAmountItems] = useState(1)
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
        setAmountItems(quantity)
    }

    const handleSubmitForm = (event: FormEvent) => {
        event.preventDefault()
        addBagItems(item, amountItems)

        setMessageProps({
            message: `${amountItems} - ${item.name} adicionado${amountItems > 1 ? 's' : ''} à sacola`,
            typeMessage: 'success',
            showMessage: true
        })
        navigate('/')

    }

    useEffect(() => {
        if (id_product) {
            handleGetItem(+id_product)
        }
    }, [id_product])



    return (
        <>
            <Message
                message={messageProps.message}
                typeMessage={messageProps.typeMessage}
                show={messageProps.showMessage}
                onVisibleChange={(value) => { setMessageProps({ ...messageProps, showMessage: value }) }}
            />
            <div className="containerProducts">
                <div className="headerProducts">
                    <HeaderPages
                        iconColor='#FFF'
                        title='Produto'
                        titleColor='#FFF'
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
                    <form onSubmit={handleSubmitForm}>
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
        </>
    );
}