import { useNavigate } from 'react-router-dom';

import { formatMoney } from '../../utils';

import './styles.css';
import { IProducts } from '../../interfaces/products';

interface GridItemsProps {
  mainColor: string;
  secundColor: string;
  gridItems?: IProducts[];
}

export const GridItems = ({
  gridItems,
  mainColor,
  secundColor,
}: GridItemsProps) => {
  const navigate = useNavigate();

  const handleClick = (id?: number) => {
    if (id) {
      navigate(`/products/${id}`);
    }
  };

  return (
    <div className="grid">
      {gridItems?.map(values => {
        return (
          <div
            key={values.id}
            onClick={() => handleClick(values.id)}
            className="item"
          >
            <div className="itemTop" style={{ backgroundColor: secundColor }}>
              <img src={values.url_image} alt="Product Image" />
            </div>
            <div className="itemBottom">
              <span className="itemCategory">{values.category}</span>
              <span className="itemName">{values.name}</span>
              <span className="itemPrice" style={{ color: mainColor }}>
                {formatMoney(values.price)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
