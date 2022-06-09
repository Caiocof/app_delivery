import './styles.css'


interface ButtonProps {
    title: string;
    buttonColor: string;
    isClicked?: () => void;
}

export const Button = ({ title, buttonColor, isClicked }: ButtonProps) => {

    return (
        <div
            className="buttonContainer"
            style={{ backgroundColor: buttonColor }}
        >
            <div onClick={isClicked}>
                {title || '...'}
            </div>
        </div>
    );
}