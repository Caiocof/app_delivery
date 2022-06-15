import { EyeSlash } from "phosphor-react";
import { useEffect, useState } from 'react';
import './styles.css'

interface InputFormProps {
    mainColor: string;
    placeholder?: string;
    inputType?: string;
    backgroundColor?: string;
    onValue: (inputValue: string) => void;
}
export const InputForm = ({
    mainColor,
    backgroundColor,
    placeholder,
    inputType,
    onValue
}: InputFormProps) => {

    const [focused, setFocused] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const handleIconPassword = () => {
        if (inputType == 'password') {
            return (
                <div className="divIcon">
                    <EyeSlash size={32} />
                </div>
            );
        }
        return (
            <div className="divIcon">
            </div>
        );
    }


    useEffect(() => {
        onValue(inputValue)

    }, [inputValue])


    return (
        <div
            className='inputContainer'
            style={{ borderColor: focused ? mainColor : '#FFF' }}>
            <input
                className="input"
                placeholder={placeholder}
                type={inputType}
                style={{ backgroundColor: backgroundColor }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            {handleIconPassword()}
        </div>
    );
}