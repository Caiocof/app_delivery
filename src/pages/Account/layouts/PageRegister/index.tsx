import { FormEvent, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MessageContext } from '../../../../contexts/messageContexts'
import { Button } from "../../../../components/Button";
import { DivisionItems } from "../../../../components/DivisionItems";
import { HeaderPages } from "../../../../components/HeaderPages";
import { InputForm } from "../../../../components/InputForm";
import { registerUser } from "../../../../service/users";
import { mainColor } from "../../../../utils";

import '../../styles.css'

export const PageRegister = () => {
    const { setMessageProps } = useContext(MessageContext)
    const navigate = useNavigate()

    const [buttonDisable, setButtonDisable] = useState(false)


    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        setButtonDisable(true)

        const form = event.target as HTMLFormElement;
        const { userName, email, password } = form
        registerUser(userName.value, email.value, password.value)
            .then(({ data }) => {
                if (data) {
                    localStorage.setItem('user', JSON.stringify(data));
                    setMessageProps({
                        message: 'Cadastro realizado com sucesso!',
                        typeMessage: 'success',
                        showMessage: true
                    })
                    navigate('/')
                } else {
                    setButtonDisable(false)
                    setMessageProps({
                        message: 'Erro ao cadastrar!',
                        typeMessage: 'warning',
                        showMessage: true
                    })
                }
            })
            .catch((error) => console.log(error)
            )
    }

    return (
        <div className="AccountContainer">
            <div className="accountHeader">
                <HeaderPages
                    iconColor={mainColor}
                    navigateRoute={'/account'}
                />
                <div className="accountHeaderBody">
                    <div className="accountHeaderLogo">
                        <p>B7 <span style={{ color: mainColor }}>•</span> Burger</p>
                    </div>
                    <span className="accountHeaderText">Preencha os campos
                        para criar o seu cadastro.</span>
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
                        placeholder='Digite seu nome'
                        inputType='text'
                        name="userName"
                        required
                    />
                </div>
                <div>
                    <InputForm
                        mainColor={mainColor}
                        backgroundColor='#F9F9FB'
                        placeholder='Digite seu e-mail'
                        inputType='e-mail'
                        name="email"
                        required
                    />
                </div>
                <div>
                    <InputForm
                        mainColor={mainColor}
                        backgroundColor='#F9F9FB'
                        placeholder='Digite sua senha'
                        inputType='password'
                        name="password"
                        required
                    />
                </div>
                <Button
                    buttonColor={mainColor}
                    title='Cadastrar'
                    type="submit"
                    disabled={buttonDisable}
                />
            </form>
            <span className='messageFooter'>
                Já tem cadastro?
                <a onClick={() => navigate('/account')} style={{ color: mainColor }}> Fazer Login</a >
            </span>
        </div>
    );
}