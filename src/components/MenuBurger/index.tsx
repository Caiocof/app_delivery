import './styles.css'


interface MenuBurgerProps {
    mainColor: string;
}

export const MenuBurger = ({ mainColor }: MenuBurgerProps) => {
    return (
        <div className='menuButton'>
            <div className='menuLine' style={{ backgroundColor: mainColor }}></div>
            <div className='menuLine' style={{ backgroundColor: mainColor }}></div>
            <div className='menuLine' style={{ backgroundColor: mainColor }}></div>
        </div>
    );
}