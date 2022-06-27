import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { DivisionItems } from '../../components/DivisionItems';
import { HeaderPages } from '../../components/HeaderPages';
import { InputForm } from '../../components/InputForm';
import { login } from '../../service/users';
import { mainColor } from '../../utils';
import './styles.css'

export const PageLogin = () => {
    const [buttonDisable, setButtonDisable] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        setButtonDisable(true)

        const { email, password } = event.target as HTMLFormElement;
        login(email.value, password.value)
            .then(({ data }) => {
                localStorage.setItem("user", JSON.stringify(data));
                navigate('/')
            })
            .catch((error) => {
                setButtonDisable(false)
                console.log(error)
            }
            )


    }

    return (
        <div className="AccountContainer">
            <div className="accountHeader">
                <HeaderPages
                    iconColor={mainColor}
                    navigateRoute={'/'}
                />
                <div className="accountHeaderBody">
                    <div className="accountHeaderLogo">
                        <p>B7 <span style={{ color: mainColor }}>•</span> Burger</p>
                    </div>
                    <span className="accountHeaderText">Use suas credenciais para realizar o login.</span>
                </div>
            </div>
            <DivisionItems
                mainColor={mainColor}
                completed={80}
            />
            <form onSubmit={handleSubmit} className="accountForm">
                <div>
                    <InputForm
                        mainColor={mainColor}
                        backgroundColor='#F9F9FB'
                        placeholder='Digite seu e-mail'
                        inputType='email'
                        name="email"
                    />
                </div>
                <div>
                    <InputForm
                        mainColor={mainColor}
                        backgroundColor='#F9F9FB'
                        placeholder='Digite sua senha'
                        inputType='password'
                        name="password"
                    />
                </div>
                <Button
                    buttonColor={mainColor}
                    title='Entrar'
                    type='submit'
                    disabled={buttonDisable}
                />
            </form>
            <span className='messageFooter'>
                Esqueceu sua senha?
                <a onClick={() => navigate('forget-account')} style={{ color: mainColor }}> Clique aqui</a >
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
                    isClicked={() => navigate('register-account')}
                />
            </div>
        </div>
    );
}