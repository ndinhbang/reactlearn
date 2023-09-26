import React from 'react'
import ReactDOM from 'react-dom/client'
// import { Provider } from 'jotai';
import App from './App.jsx'
import '@coreui/coreui-pro/dist/css/coreui.css'
import './styles/index.css'
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/utils/queryClient.js";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
      {/*<Provider>*/}
          <App />
      {/*</Provider>*/}
      </QueryClientProvider>
  </React.StrictMode>,
)
