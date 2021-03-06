import { Minus, Plus } from 'phosphor-react';
import { useEffect, useState } from 'react';
import './styles.css';

interface QuantityInputProps {
  mainColor: string;
  sizeRem: number;
  valueInitial?: number;
  minLength?: number;
  onQuantity: (quantityValue: number) => void;
}

export const QuantityInput = ({
  mainColor,
  sizeRem,
  minLength = undefined,
  valueInitial,
  onQuantity,
}: QuantityInputProps) => {
  const [quantity, setQuantity] = useState(valueInitial || 1);

  const handleQuantity = (action: string) => {
    const value = action === 'minus' ? quantity - 1 : quantity + 1;
    const length = minLength == undefined ? 1 : 0;

    setQuantity(value <= 0 ? length : value);
  };

  useEffect(() => {
    onQuantity(quantity);
  }, [quantity]);

  useEffect(() => {
    setQuantity(valueInitial || 1);
  }, [valueInitial]);

  return (
    <div className="quantityContainer">
      <span
        className="buttonMinus"
        style={{ height: `${sizeRem}rem`, width: `${sizeRem}rem` }}
        onClick={() => handleQuantity('minus')}
      >
        <Minus size={12} weight="bold" />
      </span>
      <input
        type="number"
        className="inputValue"
        style={{
          height: `${sizeRem}rem`,
          width: `${sizeRem}rem`,
          color: mainColor,
        }}
        minLength={0}
        max={20}
        value={quantity}
        onChange={() => {}}
        disabled={true}
      />
      <span
        className="buttonPlus"
        style={{
          backgroundColor: mainColor,
          height: `${sizeRem}rem`,
          width: `${sizeRem}rem`,
        }}
        onClick={() => handleQuantity('plus')}
      >
        <Plus size={12} weight="bold" />
      </span>
    </div>
  );
};
