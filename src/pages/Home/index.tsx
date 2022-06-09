import { useEffect, useState } from 'react';
import { Banner } from '../../components/Banner';
import { GridItems } from '../../components/GridItems';
import { MenuBurger } from '../../components/MenuBurger';
import { SearchInput } from '../../components/SearchInput';
import { getItems } from '../../service/items';
import { getPromotions } from '../../service/promotions';
import { bannerImage, bannerImage2, mainColor } from '../../utils';

import './styles.css'

export const Home = () => {

    const [itemsPromotion, setItemsPromotion] = useState([])
    const [items, setItems] = useState([])

    const promotions = [
        {
            id: 1,
            url_image: bannerImage,
            alt_image: 'Product Name'
        },
        {
            id: 2,
            url_image: bannerImage2,
            alt_image: 'Product Name'
        }

    ]

    const handleOnSearch = (searchValue: string) => {
        handleGetItems(searchValue);
    }

    const handleGetPromotions = (filters?: string) => {
        getPromotions(filters)
            .then(({ data }) => setItemsPromotion(data)
            )
            .catch((error) => console.log(error)
            )
    }

    const handleGetItems = (filters?: string) => {
        getItems(filters)
            .then(({ data }) => setItems(data))
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        handleGetPromotions()
        handleGetItems()
    }, [])

    return (
        <div className="container">
            <header className="header">
                <div className="headerTop">
                    <div>
                        <h3 className="headerTitle">Seja Bem-Vindo 👋</h3>
                        <h4 className="headerSubtitle">O que deseja pra hoje?</h4>
                    </div>
                    <div>
                        <MenuBurger
                            mainColor={mainColor}
                        />
                    </div>
                </div>
                <SearchInput
                    mainColor={mainColor}
                    onSearch={handleOnSearch}
                />
            </header>
            <Banner
                itemSlide={promotions}
            />
            <div>
                <GridItems
                    mainColor={mainColor}
                    secundColor={'#FFF9F2'}
                    gridItems={items}
                />
            </div>

        </div>

    );
}