import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Login'
import './index.css' // Onde ficam os estilos globais (opcional)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
)