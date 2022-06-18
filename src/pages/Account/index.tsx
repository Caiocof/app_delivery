import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { DivisionItems } from '../../components/DivisionItems';
import { HeaderPages } from '../../components/HeaderPages';
import { InputForm } from '../../components/InputForm';
import { mainColor } from '../../utils';
import './styles.css'

export const RegisterLogin = () => {
    const navigate = useNavigate()

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
                <div>
                    <InputForm
                        mainColor={mainColor}
                        backgroundColor='#F9F9FB'
                        placeholder='Digite seu e-mail'
                        inputType='text'
                        onValue={() => { }}
                    />
                </div>
                <div>
                    <InputForm
                        mainColor={mainColor}
                        backgroundColor='#F9F9FB'
                        placeholder='Digite sua senha'
                        inputType='password'
                        onValue={() => { }}
                    />
                </div>
                <Button
                    buttonColor={mainColor}
                    title='Entrar'
                />
            </form>
            <span className='registerForgetPassword'>
                Esqueceu sua senha?
                <a onClick={() => navigate('/')} style={{ color: mainColor }}> Clique aqui</a >
            </span>
            <DivisionItems
                mainColor={mainColor}
                completed={80}
            />
            <div style={{ marginTop: '62px' }}>
                <Button
                    buttonColor='#FFF'
                    borderColor={mainColor}
                    title='Quero me cadastrar'
                    titleColor={mainColor}
                    isClicked={()=> navigate('register-account')}
                />
            </div>
        </div>
    );
}