import { createContext, Dispatch, ReactElement, SetStateAction, useState } from 'react'
import { typeMessageProps } from '../components/Message';

interface IMessageContext {
  message: string;
  typeMessage: typeMessageProps;
  showMessage: boolean;
}

interface IMessageProvider {
  children: ReactElement
}

type MessageContextProps = {
  messageProps: IMessageContext,
  setMessageProps: Dispatch<SetStateAction<IMessageContext>>
}

export const MessageContext = createContext<MessageContextProps>(
  {
    messageProps: {} as IMessageContext,
    setMessageProps: () => { }
  })



export const MessageContextProvider: React.FC<IMessageProvider> = ({ children }) => {
  const [messageProps, setMessageProps] = useState<IMessageContext>({
    message: '',
    typeMessage: 'info',
    showMessage: false
  })

  return (
    <MessageContext.Provider value={{ messageProps, setMessageProps }}>
      {children}
    </MessageContext.Provider>
  );
}