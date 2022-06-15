import { ArrowLeft, Heart } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import './styles.css'

interface HeaderPagesProps {
    iconColor: string;
    title?: string;
    navigateRoute?: string;
    titleColor?: string;
    rightButton?: boolean;
    backgroundColor?: string;
}


export const HeaderPages = ({ iconColor, title, backgroundColor, rightButton, titleColor, navigateRoute }: HeaderPagesProps) => {
    const navigate = useNavigate()


    const handleNavigate = () => {
        if (navigateRoute) {
            navigate(navigateRoute)
        }

    }

    const handleRightButton = () => {
        if (rightButton) {
            return (
                <button
                    className="buttonRightHeaderPages"
                    style={{ backgroundColor: backgroundColor }}
                >
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
            <button
                className="buttonBackHeaderPages"
                style={{ backgroundColor: backgroundColor }}
                onClick={handleNavigate}
            >
                <ArrowLeft size={20} weight="bold" color={iconColor || '#1B1B1B'} />
            </button>
            <p className="titleHeaderPages" style={{ color: titleColor || '#1B1B1B' }}>{title}</p>
            {handleRightButton()}
        </div>
    );
}