import { FormEvent, useEffect, useState, ChangeEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../../components/Button'
import { DivisionItems } from '../../../components/DivisionItems'
import { HeaderPages } from '../../../components/HeaderPages'
import { InputForm } from '../../../components/InputForm'
import { IAddress } from '../../../interfaces/address'
import { IUser } from '../../../interfaces/user'
import { getAddressForId, registerAddress } from '../../../service/address'
import { mainColor } from '../../../utils'
import '../styles.css'


interface AddressProps {
  address?: IAddress
}

export const AddressForm = ({ address }: AddressProps) => {
  const navigate = useNavigate()
  const [userLogged, setUserLogged] = useState<IUser>()
  const [addressData, setAddressData] = useState({
    user_id: 0,
    zipCode: "",
    street: "",
    number: "",
    district: "",
    city: "",
    state: "",
    complements: ""
  })

  const { id: address_id } = useParams()

  const handleSubmitForm = (event: FormEvent) => {
    event.preventDefault()
    if (userLogged) {
      registerAddress(addressData)
        .then(() => {
          navigate('/address')
        }).catch((error) => console.log(error))
    }

  }

  const handleChangeItem = (event: ChangeEvent<HTMLInputElement>, name: string) => {
    setAddressData({
      ...addressData,
      [name]: event.target.value
    })
  }

  useEffect(() => {
    if (address_id) {
      getAddressForId(+address_id)
        .then(({ data }) => setAddressData(data)
        ).catch(error => console.log(error))
    }
  }, [address_id])

  useEffect(() => {
    if (userLogged) {
      setAddressData({
        ...addressData,
        user_id: userLogged?.id
      })
    }
  }, [userLogged])

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const userStorage = JSON.parse(localStorage.getItem('user') || '');
      setUserLogged(userStorage);
    }
  }, [])



  return (
    <div className="addressContainer">
      <header className="addressHeader">
        <HeaderPages
          iconColor={mainColor}
          title={address ? 'Editar Endereços' : 'Novo Endereço'}
          navigateRoute={'/address'}
        />
        <div className="addressDivisionHeader">
          <DivisionItems
            mainColor='transparent'
            completed={0}
          />
        </div>
      </header>
      <form onSubmit={handleSubmitForm} className="addressForm">
        <label htmlFor="zipCode" className='TesteLabel'>CEP</label>
        <InputForm
          defaultValue={addressData.zipCode}
          inputType='text'
          focusColor={mainColor}
          placeholder='00000-000'
          backgroundColor='#F9F9FB'
          name='zipCode'
          id='zipCode'
          onChange={(event) => handleChangeItem(event, 'zipCode')}
        />
        <div className="addressStreetNumber">
          <div className="addressStreet">
            <label htmlFor="street">Rua</label>
            <InputForm
              defaultValue={addressData.street}
              inputType='text'
              focusColor={mainColor}
              placeholder='Digite aqui a rua'
              maxWidthWithRem={11}
              backgroundColor='#F9F9FB'
              name='street'
              id='street'
              onChange={(event) => handleChangeItem(event, 'street')}
            />
          </div>
          <div className="addressNumber">
            <label htmlFor="number">Número</label>
            <InputForm
              inputType='number'
              focusColor={mainColor}
              placeholder='Digite o número'
              maxWidthWithRem={10}
              backgroundColor='#F9F9FB'
              name='number'
              id='number'
              onChange={(event) => handleChangeItem(event, 'number')}
              defaultValue={addressData.number}
            />
          </div>
        </div>
        <label htmlFor="district">Bairro</label>
        <InputForm
          inputType='text'
          focusColor={mainColor}
          placeholder='Digite aqui o bairro'
          backgroundColor='#F9F9FB'
          name='district'
          id='district'
          onChange={(event) => handleChangeItem(event, 'district')}
          defaultValue={addressData.district}
        />
        <label htmlFor="city">Cidade</label>
        <InputForm
          inputType='text'
          focusColor={mainColor}
          placeholder='Digite aqui a cidade'
          backgroundColor='#F9F9FB'
          name='city'
          id='city'
          defaultValue={addressData.city}
          onChange={(event) => handleChangeItem(event, 'city')}
        />
        <label htmlFor="state">Estado</label>
        <InputForm
          inputType='text'
          focusColor={mainColor}
          placeholder='Digite aqui o estado'
          backgroundColor='#F9F9FB'
          name='state'
          id='state'
          defaultValue={addressData.state}
          onChange={(event) => handleChangeItem(event, 'state')}
        />
        <label htmlFor="complements">Complemento</label>
        <InputForm
          inputType='text'
          focusColor={mainColor}
          placeholder='Digite aqui o complemento'
          backgroundColor='#F9F9FB'
          name='complements'
          id='complements'
          onChange={(event) => handleChangeItem(event, 'complements')}
          defaultValue={addressData.complements}
        />
        <label htmlFor="" />
        <Button
          title='Adicionar'
          buttonColor={mainColor}
          type='submit'
        />
      </form>
    </div>
  )
}