import { FormEvent } from 'react';
import {
  Button,
  DivisionItems,
  HeaderPages,
  InputForm,
} from '../../../../components';
import { mainColor } from '../../../../utils';

import '../../styles.css';

export function PageForget() {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log('recuperar senha');
  };

  return (
    <div className="AccountContainer">
      <div className="accountHeader">
        <HeaderPages iconColor={mainColor} navigateRoute="/account" />
        <div className="accountHeaderBody">
          <div className="accountHeaderLogo">
            <p>
              B7 <span style={{ color: mainColor }}>•</span> Burger
            </p>
          </div>
          <div className="forgetMessage">
            <p>Esqueceu sua senha?</p>
          </div>
          <span className="accountHeaderText">
            Preencha o campo com seu e-mail e receba as instruções necessárias
            para redefinir a sua senha.
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
            inputType="e-mail"
            name="email"
            required
          />
        </div>
        <Button buttonColor={mainColor} title="Enviar" type="submit" />
      </form>
    </div>
  );
}
export default PageForget;
