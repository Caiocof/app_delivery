import { MouseEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import {
  DotsThreeVertical,
  MapPin,
  PencilSimpleLine,
  Trash,
} from 'phosphor-react';
import { DivisionItems } from '../../components/DivisionItems';
import { HeaderPages } from '../../components/HeaderPages';
import { BasicPopover } from '../../components/Alerts/BasicPopover';
import { Button } from '../../components/Button';
import { IAddress } from '../../interfaces/address';
import { deleteAddress, getAddress } from '../../service/address';
import { mainColor } from '../../utils';
import './styles.css';

export const Address = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [address, setAddress] = useState<IAddress[]>();
  const user = JSON.parse(localStorage.getItem('user') || '');

  const handleAnchorClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteAddress = () => {
    if (anchorEl?.dataset.item) {
      deleteAddress(+anchorEl?.dataset.item)
        .then(() => {
          handleGetAddress();
          setAnchorEl(null);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleEditAddress = () => {
    if (anchorEl?.dataset.item) {
      navigate(`address-form/${anchorEl?.dataset.item}`);
    }
  };

  const handleGetAddress = () => {
    if (user) {
      getAddress(user.id)
        .then(({ data }) => {
          setAddress(data);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleAddressSelected = (address: IAddress) => {
    const pathLocation = location.state as { origin?: string };
    if (address && pathLocation?.origin) {
      localStorage.setItem('addressShipping', JSON.stringify(address));
      navigate(pathLocation?.origin);
    }
  };

  useEffect(() => {
    handleGetAddress();
  }, []);

  return (
    <>
      <BasicPopover anchorElement={anchorEl} onHandleAnchor={setAnchorEl}>
        <>
          <Typography
            onClick={handleEditAddress}
            sx={{ p: 2, display: 'flex', gap: '15px', alignItems: 'flex-end' }}
          >
            <PencilSimpleLine size={25} color="#96A3AB" />
            <span>Editar</span>
          </Typography>
          <Typography
            onClick={handleDeleteAddress}
            sx={{ p: 2, display: 'flex', gap: '15px', alignItems: 'flex-end' }}
          >
            <Trash size={25} color="#96A3AB" />
            <span>Deletar</span>
          </Typography>
        </>
      </BasicPopover>
      <div className="addressContainer">
        <header className="addressHeader">
          <HeaderPages
            iconColor={mainColor}
            title={user ? 'Meus Endereços' : 'Novo Endereço'}
            navigateRoute="/"
          />
          <div className="addressDivisionHeader">
            <DivisionItems mainColor="transparent" completed={0} />
          </div>
        </header>
        <div className="addressListItems">
          <ul>
            {address?.map((item, index) => {
              return (
                <li key={index}>
                  <div className="addressItem">
                    <div
                      className="addressPinName"
                      onClick={() => handleAddressSelected(item)}
                    >
                      <MapPin size={32} color={mainColor} />
                      <p>
                        {item.number} - {item.street} - {item.district}
                      </p>
                    </div>
                    <button data-item={item.id} onClick={handleAnchorClick}>
                      <DotsThreeVertical size={32} weight="bold" />
                    </button>
                  </div>
                  <DivisionItems completed={0} mainColor={mainColor} />
                </li>
              );
            })}
          </ul>
        </div>
        <footer className="addressFooter">
          <Button
            buttonColor={mainColor}
            title="Novo Endereço"
            isClicked={() => navigate('address-form')}
          />
        </footer>
      </div>
    </>
  );
};
