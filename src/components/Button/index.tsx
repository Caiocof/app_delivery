import { useNavigate } from 'react-router-dom';
import './styles.css'


interface ButtonProps {
    title: string;
    buttonColor: string;
    navigateRoute?: string;
}

export const Button = ({ title, buttonColor, navigateRoute }: ButtonProps) => {
    const navigate = useNavigate()


    const handleNavigate = () => {
        if (navigateRoute) {
            navigate(navigateRoute)
        }

    }

    return (
        <div
            className="buttonContainer"
            style={{ backgroundColor: buttonColor }}
        >
            <div onClick={handleNavigate}>
                {title || '...'}
            </div>
        </div>
    );
}