import { Minus, Plus } from 'phosphor-react';
import { useEffect, useState } from 'react';
import './styles.css'


interface QuantityInputProps {
    mainColor: string;
    sizeRem: number;
    valueInitial?: number;
    onQuantity: (quantityValue: number) => void;
}

export const QuantityInput = ({ mainColor, sizeRem, valueInitial, onQuantity }: QuantityInputProps) => {
    const [quantity, setQuantity] = useState(valueInitial || 1)

    const handleQuantity = (action: string) => {
        const value = action === 'minus' ? (quantity - 1) : (quantity + 1)
        setQuantity(value < 1 ? 1 : value)

    }

    useEffect(() => {
        onQuantity(quantity)
    }, [quantity])

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
                    color: mainColor
                }}
                minLength={1}
                max={20}
                value={quantity}
                onChange={() => { }}
            />
            <span
                className="buttonPlus"
                style={{ backgroundColor: mainColor, height: `${sizeRem}rem`, width: `${sizeRem}rem` }}
                onClick={() => handleQuantity('plus')}
            >
                <Plus size={12} weight="bold" />
            </span>
        </div>
    );
}