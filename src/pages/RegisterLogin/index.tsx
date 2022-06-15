import { Button } from '../../components/Button';
import { DivisionItems } from '../../components/DivisionItems';
import { HeaderPages } from '../../components/HeaderPages';
import { InputForm } from '../../components/InputForm';
import { mainColor } from '../../utils';
import './styles.css'

export const RegisterLogin = () => {
    return (
        <div className="RegisterContainer">
            <div className="registerHeader">
                <HeaderPages
                    iconColor={mainColor}
                    navigateRoute={'/'}
                />
                <div className="registerHeaderBody">
                    <div className="registerHeaderLogo">
                        <p>B7 <span style={{ color: mainColor }}>•</span> Burger</p>
                    </div>
                    <span className="registerHeaderText">Use suas credenciais para realizar o login.</span>
                </div>
            </div>
            <DivisionItems
                mainColor={mainColor}
                completed={80}
            />
            <form className="registerForm">
                <InputForm
                mainColor={mainColor}
                backgroundColor='res'
                onValue={()=>{}}
                 />
                <Button
                    buttonColor={mainColor}
                    title='Entrar'
                />
            </form>
        </div>
    );
}