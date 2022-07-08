import { FormEvent, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  DivisionItems,
  HeaderPages,
  InputForm,
  Message,
} from '../../components';
import { MessageContext } from '../../contexts';
import { login } from '../../service/users';
import { mainColor } from '../../utils';
import './styles.css';

export function PageLogin() {
  const [buttonDisable, setButtonDisable] = useState(false);

  const { messageProps, setMessageProps } = useContext(MessageContext);
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setButtonDisable(true);

    const { email, password } = event.target as HTMLFormElement;
    login(email.value, password.value)
      .then(({ data }) => {
        if (data.length > 0) {
          localStorage.setItem('user', JSON.stringify(data[0]));
          setMessageProps({
            message: 'Login realizado com sucesso!',
            typeMessage: 'success',
            showMessage: true,
          });
          navigate('/');
        } else {
          setButtonDisable(false);
          setMessageProps({
            message: 'Erro ao logar, usuário ou senha invalido!',
            typeMessage: 'warning',
            showMessage: true,
          });
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <Message
        message={messageProps.message}
        typeMessage={messageProps.typeMessage}
        show={messageProps.showMessage}
        onVisibleChange={value => {
          setMessageProps({ ...messageProps, showMessage: value });
        }}
      />
      <div className="AccountContainer">
        <div className="accountHeader">
          <HeaderPages iconColor={mainColor} navigateRoute="/" />
          <div className="accountHeaderBody">
            <div className="accountHeaderLogo">
              <p>
                B7 <span style={{ color: mainColor }}>•</span> Burger
              </p>
            </div>
            <span className="accountHeaderText">
              Use suas credenciais para realizar o login.
            </span>
          </div>
        </div>
        <DivisionItems mainColor={mainColor} completed={80} />
        <form onSubmit={handleSubmit} className="accountForm">
          <div>
            <InputForm
              focusColor={mainColor}
              backgroundColor="#F9F9FB"
              placeholder="Digite seu e-mail"
              inputType="email"
              name="email"
              required
            />
          </div>
          <div>
            <InputForm
              focusColor={mainColor}
              backgroundColor="#F9F9FB"
              placeholder="Digite sua senha"
              inputType="password"
              name="password"
              required
            />
          </div>
          <Button
            buttonColor={mainColor}
            title="Entrar"
            type="submit"
            disabled={buttonDisable}
          />
        </form>
        <span className="messageFooter">
          Esqueceu sua senha?
          <a
            onClick={() => navigate('forget-account')}
            style={{ color: mainColor }}
          >
            {' '}
            Clique aqui
          </a>
        </span>
        <DivisionItems mainColor={mainColor} completed={80} />
        <div style={{ marginTop: '62px' }}>
          <Button
            buttonColor="#FFF"
            borderColor={mainColor}
            title="Quero me cadastrar"
            titleColor={mainColor}
            isClicked={() => navigate('register-account')}
          />
        </div>
      </div>
    </>
  );
}

export default PageLogin;
