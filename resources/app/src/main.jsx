import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@coreui/coreui-pro/dist/css/coreui.css'
import './styles/index.css'
import { Provider } from 'jotai';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider>
          <App />
      </Provider>
  </React.StrictMode>,
)
