// Importa o React, que é necessário para criar componentes
import React from 'react';

// Importa a API moderna do React (ReactDOM com createRoot) para renderizar a aplicação
import ReactDOM from 'react-dom/client';

// Importa os estilos globais da aplicação
import './index.css';

// Importa o componente principal da aplicação (o "coração" do front-end)
import App from './App';

// Importa utilitário opcional para monitorar métricas de performance do app
import reportWebVitals from './reportWebVitals';

// Cria a "raiz" da aplicação dentro da div <div id="root"></div> presente no index.html
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement // Garante que o TypeScript reconheça como elemento HTML
);

// Renderiza o componente <App /> dentro do modo estrito do React
// O <React.StrictMode> é útil para identificar problemas durante o desenvolvimento,
// como práticas inseguras ou uso de APIs obsoletas — mas não afeta a produção.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Opcional: coleta dados de desempenho da aplicação
// Pode ser útil para análise, otimização ou envio para serviços como Google Analytics
reportWebVitals();