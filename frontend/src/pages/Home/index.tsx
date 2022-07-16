import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageContext } from '../../contexts/messageContexts';
import { Banner } from '../../components/Banner';
import { GridItems } from '../../components/GridItems';
import { MenuBurger } from '../../components/MenuBurger';
import { Message } from '../../components/Alerts/Snackbar';
import { SearchInput } from '../../components/SearchInput';
import { getItems } from '../../service/items';
import { getPromotions } from '../../service/promotions';
import { bannerImage, bannerImage2, mainColor } from '../../utils';

import './styles.css';

export const Home = () => {
  const [itemsPromotion, setItemsPromotion] = useState([]);
  const [items, setItems] = useState([]);

  const { messageProps } = useContext(MessageContext);
  const navigate = useNavigate();

  const handleOnSearch = (searchValue: string) => {
    handleGetItems(searchValue);
  };

  const handleGetPromotions = (filters?: string) => {
    getPromotions(filters)
      .then(({ data }) => {
        setItemsPromotion(data);
      })
      .catch(error => console.log(error));
  };

  const handleGetItems = (filters?: string) => {
    getItems(filters)
      .then(({ data }) => setItems(data))
      .catch(error => console.log(error));
  };

  const handleMenuBar = () => {
    navigate('menubar');
  };

  useEffect(() => {
    handleGetPromotions();
    handleGetItems();
  }, []);

  return (
    <>
      <Message
        message={messageProps.message}
        typeMessage={messageProps.typeMessage}
        show={messageProps.showMessage}
      />
      <div className="container">
        <header className="header">
          <div className="headerTop">
            <div>
              <h3 className="headerTitle">Seja Bem-Vindo 👋</h3>
              <h4 className="headerSubtitle">O que deseja pra hoje?</h4>
            </div>
            <div>
              <MenuBurger mainColor={mainColor} isClicked={handleMenuBar} />
            </div>
          </div>
          <SearchInput mainColor={mainColor} onSearch={handleOnSearch} />
        </header>
        <Banner itemSlide={itemsPromotion} />
        <div>
          <GridItems
            mainColor={mainColor}
            secundColor={'#FFF9F2'}
            gridItems={items}
          />
        </div>
      </div>
    </>
  );
};
