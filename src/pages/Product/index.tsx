import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getItemForId } from '../../service/items';
import { IProducts } from '../../interfaces/products';

export const Products = () => {
    const [item, setItem] = useState<IProducts>({} as IProducts)
    const { id: id_product } = useParams()
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/')
    }

    const handleGetItem = (id_product: number) => {
        getItemForId(id_product)
            .then(({ data }) => setItem(data))
            .catch((error) => console.log(error)
            )
    }

    useEffect(() => {
        if (id_product) {
            handleGetItem(+id_product)
        }
    }, [id_product])

    return (
        <>
            <h1>{item.category}</h1>
            <h1>{item.name}</h1>
            <h1>{item.price}</h1>
            <button onClick={handleNavigate}>teste</button>
        </>
    );
}