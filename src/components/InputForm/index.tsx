import { Eye, EyeSlash } from 'phosphor-react';
import { InputHTMLAttributes, useState, useEffect } from 'react';
import './styles.css';

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  focusColor: string;
  inputType: string;
  placeholder?: string;
  backgroundColor?: string;
  maxWidthWithRem?: number;
}
export function InputForm({
  focusColor,
  backgroundColor,
  placeholder,
  inputType,
  maxWidthWithRem,
  ...rest
}: InputFormProps) {
  const [focused, setFocused] = useState(false);
  const [typeInput, setTypeInput] = useState(inputType);
  const [showPassword, setShowPassword] = useState(false);

  const handleIconPassword = () => {
    if (inputType == 'password') {
      return (
        <div
          className="divIcon"
          onClick={() => {
            setShowPassword(!showPassword);
            setTypeInput(showPassword ? 'password' : 'text');
          }}
        >
          {showPassword ? (
            <Eye size={30} color="#1B1B1B80" />
          ) : (
            <EyeSlash size={30} color="#1B1B1B80" />
          )}
        </div>
      );
    }
  };

  return (
    <div
      className="inputContainer"
      style={
        maxWidthWithRem
          ? {
            borderColor: focused ? focusColor : '#FFF',
            maxWidth: `${maxWidthWithRem + 0.5}rem`,
          }
          : { borderColor: focused ? focusColor : '#FFF' }
      }
    >
      <input
        // value={inputValue}
        // onChange={(e) => setInputValue(e.target.value)}
        {...rest}
        className="input"
        placeholder={placeholder}
        type={typeInput}
        style={
          maxWidthWithRem
            ? {
              backgroundColor,
              maxWidth: `${maxWidthWithRem}rem`,
            }
            : { backgroundColor }
        }
        onFocus={() =>
          setFocused(true)}
        onBlur={() =>
          setFocused(false)}
      />
      {handleIconPassword()}
    </div>
  );
}

export default InputForm;
