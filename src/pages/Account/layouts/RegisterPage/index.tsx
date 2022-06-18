import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/Button";
import { DivisionItems } from "../../../../components/DivisionItems";
import { HeaderPages } from "../../../../components/HeaderPages";
import { InputForm } from "../../../../components/InputForm";

import './styles.css'


interface RegisterProps {
    mainColor?: string
}

export const RegisterPage = ({ mainColor }: RegisterProps) => {
    const color = mainColor || '#B1B1B1'
    const navigate = useNavigate()
    return (
        <>
            <div className="registerHeader">
                <HeaderPages
                    iconColor={color}
                    navigateRoute={'/'}
                />
                <div className="registerHeaderBody">
                    <div className="registerHeaderLogo">
                        <p>B7 <span style={{ color: color }}>•</span> Burger</p>
                    </div>
                    <span className="registerHeaderText">Use suas credenciais para realizar o login.</span>
                </div>
            </div>
            <DivisionItems
                mainColor={color}
                completed={80}
            />
            <form className="registerForm">
                <div>
                    <InputForm
                        mainColor={color}
                        backgroundColor='#F9F9FB'
                        placeholder='Digite seu e-mail'
                        inputType='text'
                        onValue={() => { }}
                    />
                </div>
                <div>
                    <InputForm
                        mainColor={color}
                        backgroundColor='#F9F9FB'
                        placeholder='Digite sua senha'
                        inputType='password'
                        onValue={() => { }}
                    />
                </div>
                <Button
                    buttonColor={color}
                    title='Entrar'
                />
            </form>
            <span className='registerForgetPassword'>
                Esqueceu sua senha?
                <a onClick={() => navigate('/')} style={{ color: color }}> Clique aqui</a >
            </span>
            <DivisionItems
                mainColor={color}
                completed={80}
            />
            <div style={{ marginTop: '62px' }}>
                <Button
                    buttonColor='#FFF'
                    borderColor={color}
                    title='Quero me cadastrar'
                    titleColor={color}
                    isClicked={() => navigate('register-account')}
                />
            </div>
        </>
    );
}