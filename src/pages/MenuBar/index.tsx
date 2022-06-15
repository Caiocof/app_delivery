import { Bag, ClipboardText, ForkKnife, GearSix, SignOut, X } from 'phosphor-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { DivisionItems } from '../../components/DivisionItems';
import { mainColor } from '../../utils';
import './styles.css'

export const MenuBar = () => {
    const navigate = useNavigate()

    const [logged, setLogged] = useState(false)

    const handleRoute = (route: string) => {
        navigate(route)
    }

    const handleHeader = () => {
        if (logged) {
            return (
                <div>
                    <p className='userName'>Caio César</p>
                    <p className='lastAccess'>Ultimo pedido há 2 semanas</p>
                </div>
            )
        }
        return (
            <Button
                title='Fazer Login'
                buttonColor={mainColor}
            />
        );
    }

    const handleFooter = () => {
        if (logged) {
            return (
                <footer className="footer" onClick={() => handleRoute('/')}>
                    <div className='icon'>
                        <SignOut color='#6A7D8B' size={17} weight="bold" />
                    </div>
                    <p className="menuListName">Sair</p>
                </footer>
            );
        }
        return (
            <footer className="footer"></footer>
        );
    }

    return (
        <div className="menuContainer">
            <div className="menuHeader">
                <div className="headerLeft">
                    {handleHeader()}
                </div>
                <div className="headerRight">
                    <X
                        size={20}
                        weight="bold"
                        color={mainColor || '#1B1B1B'}
                        onClick={() => handleRoute('/')}
                    />
                </div>
            </div>
            <DivisionItems
                mainColor={mainColor}
                completed={50}
            />
            <div className="menuBody">
                <ul>
                    <li className="menuList">
                        <div className="menuListIcon">
                            <ForkKnife size={20} weight="bold" color='#6A7D8B' />
                        </div>
                        <div className="menuListName">Cardápio</div>
                    </li>
                    <li className="menuList">
                        <div className="menuListIcon">
                            <Bag size={20} weight="bold" color='#6A7D8B' />
                        </div>
                        <div className="menuListName">Sacola</div>
                    </li>
                    <li className="menuList">
                        <div className="menuListIcon">
                            <ClipboardText size={20} weight="bold" color='#6A7D8B' />
                        </div>
                        <div className="menuListName">Meus Pedidos</div>
                    </li>
                    <li className="menuList">
                        <div className="menuListIcon">
                            <GearSix size={20} weight="bold" color='#6A7D8B' />
                        </div>
                        <div className="menuListName">Configurações</div>
                    </li>
                </ul>
            </div>
            {handleFooter()}
        </div>
    );
}