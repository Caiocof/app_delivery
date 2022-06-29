import React from 'react'
import ReactDOM from 'react-dom/client'
import { BagContextProvider } from './contexts/bagContexts'
import { MessageContextProvider } from './contexts/messageContexts'

import './index.css'
import { Routers } from './routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="containerApp">
      <MessageContextProvider>
        <BagContextProvider>
          <Routers />
        </BagContextProvider>
      </MessageContextProvider>
    </div>
  </React.StrictMode>
)
