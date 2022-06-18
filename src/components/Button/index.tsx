import './styles.css'


interface ButtonProps {
    title: string;
    titleColor?: string;
    buttonColor: string;
    borderColor?: string;
    isClicked?: () => void;
}

export const Button = ({
    title,
    titleColor,
    buttonColor,
    borderColor,
    isClicked }: ButtonProps) => {

    const border = borderColor ? `1px solid ${borderColor}` : 'none'
    return (
        <div
            className="buttonContainer"
            style={{
                backgroundColor: buttonColor,
                border: border
            }}
        >
            <div
                onClick={isClicked}
                style={{ color: titleColor || '#FFF'}}
            >
                {title || '...'}
            </div>
        </div>
    );
}