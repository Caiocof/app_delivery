import './styles.css';

interface MenuBurgerProps {
  mainColor: string;
  isClicked?: () => void;
}

export const MenuBurger = ({ mainColor, isClicked }: MenuBurgerProps) => {
  return (
    <div className="menuButton" onClick={isClicked}>
      <div className="menuLine" style={{ backgroundColor: mainColor }}></div>
      <div className="menuLine" style={{ backgroundColor: mainColor }}></div>
      <div className="menuLine" style={{ backgroundColor: mainColor }}></div>
    </div>
  );
};
