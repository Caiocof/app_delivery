import { Bag, ClipboardText, ForkKnife, GearSix, SignOut, X } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { DivisionItems } from '../../components/DivisionItems';
import { IUser } from '../../interfaces/user';
import { formatDate, mainColor } from '../../utils';
import './styles.css'

export const MenuBar = () => {
    const navigate = useNavigate()

    const [userLogged, setUserLogged] = useState<IUser>()


    useEffect(() => {
        if (localStorage.getItem('user')) {
            let userStorage = JSON.parse(localStorage.getItem('user') || '');
            setUserLogged(userStorage);
        }
    }, [])

    const handleLogout = () => {
        localStorage.clear()
        navigate('/')
    }

    const handleHeader = () => {
        if (userLogged) {
            const access = formatDate(userLogged.last_access, "dd MMM yyyy HH:mm")
            return (
                <div>
                    <p className='userName'>{userLogged.name}</p>
                    <p className='lastAccess'>{access}</p>
                </div>
            )
        }
        return (
            <Button
                title='Fazer Login'
                buttonColor={mainColor}
                isClicked={() => navigate('/account')}
            />
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
                        onClick={() => navigate('/')}
                    />
                </div>
            </div>
            <DivisionItems
                mainColor={mainColor}
                completed={50}
            />
            <div className="menuBody">
                <ul>
                    <li className="menuList" onClick={() => navigate('/')}>
                        <div className="menuListIcon">
                            <ForkKnife size={20} weight="bold" color='#6A7D8B' />
                        </div>
                        <div className="menuListName">Cardápio</div>
                    </li>
                    <li className="menuList" onClick={() => navigate('/bag')}>
                        <div className="menuListIcon">
                            <Bag size={20} weight="bold" color='#6A7D8B' />
                        </div>
                        <div className="menuListName">Sacola</div>
                    </li>
                    {userLogged &&
                        <>
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
                        </>
                    }
                </ul>
            </div>
            {userLogged &&
                <footer className="footer" onClick={handleLogout}>
                    <div className='icon'>
                        <SignOut color='#6A7D8B' size={17} weight="bold" />
                    </div>
                    <p className="menuListName">Sair</p>
                </footer>
            }
        </div>
    );
}