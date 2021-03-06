import { ArrowLeft } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

interface HeaderPagesProps {
  iconColor: string;
  title?: string;
  navigateRoute?: string;
  titleColor?: string;
  backgroundColor?: string;
}

export function HeaderPages({
  iconColor,
  title,
  backgroundColor,
  titleColor,
  navigateRoute,
}: HeaderPagesProps) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (navigateRoute) {
      navigate(navigateRoute);
    }
  };

  return (
    <div className="containerHeaderPages">
      <button
        type="button"
        className="buttonBackHeaderPages"
        style={{ backgroundColor }}
        onClick={handleNavigate}
      >
        <ArrowLeft size={20} weight="bold" color={iconColor || '#1B1B1B'} />
      </button>
      <p
        className="titleHeaderPages"
        style={{ color: titleColor || '#1B1B1B' }}
      >
        {title}
      </p>
      <div className="buttonRightHeaderPages" />
    </div>
  );
}

export default HeaderPages;
