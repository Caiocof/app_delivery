import { ButtonHTMLAttributes } from 'react';
import './styles.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  titleColor?: string;
  buttonColor: string;
  borderColor?: string;
  isClicked?: () => void;
}

export function Button({
  title,
  titleColor,
  buttonColor,
  borderColor,
  isClicked,
  ...rest
}: ButtonProps) {
  const border = borderColor ? `1px solid ${borderColor}` : 'none';
  return (
    <div
      className="buttonContainer"
      style={{
        backgroundColor: buttonColor,
        border,
      }}
    >
      <button
        type="button"
        {...rest}
        onClick={isClicked}
        style={{ color: titleColor || '#FFF' }}
      >
        {title || '...'}
      </button>
    </div>
  );
}

export default Button;
