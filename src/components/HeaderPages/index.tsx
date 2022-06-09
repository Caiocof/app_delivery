import { ArrowLeft, Heart } from 'phosphor-react';
import './styles.css'

interface HeaderPagesProps {
    iconColor: string;
    title: string;
    titleColor?: string;
    rightButton?: boolean;
    backgroundColor?: string;
}


export const HeaderPages = ({ iconColor, title, backgroundColor, rightButton, titleColor }: HeaderPagesProps) => {

    const handleRightButton = () => {
        if (rightButton) {
            return (
                <button className="buttonRightHeaderPages" style={{ backgroundColor: backgroundColor }}>
                    <Heart size={20} weight="bold" color={iconColor || '#1B1B1B'} />
                </button>
            );
        }
        return (
            <div className="buttonRightHeaderPages"></div>
        );
    }

    return (
        <div className="containerHeaderPages">
            <button className="buttonBackHeaderPages" style={{ backgroundColor: backgroundColor }}>
                <ArrowLeft size={20} weight="bold" color={iconColor || '#1B1B1B'} />
            </button>
            <p className="titleHeaderPages" style={{ color: titleColor || '#1B1B1B' }}>{title}</p>
            {handleRightButton()}
        </div>
    );
}