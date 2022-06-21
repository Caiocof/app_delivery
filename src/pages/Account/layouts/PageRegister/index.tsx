import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/Button";
import { DivisionItems } from "../../../../components/DivisionItems";
import { HeaderPages } from "../../../../components/HeaderPages";
import { InputForm } from "../../../../components/InputForm";
import { mainColor } from "../../../../utils";

import '../../styles.css'

export const PageRegister = () => {
    const navigate = useNavigate()


    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        const { userName, email, password } = event.target as HTMLFormElement;
        console.log('name: ', userName.value);
        console.log('email: ', email.value);
        console.log('password: ', password.value);
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
                />
            </form>
            <span className='messageFooter'>
                Já tem cadastro?
                <a onClick={() => navigate('/account')} style={{ color: mainColor }}> Fazer Login</a >
            </span>
        </div>
    );
}