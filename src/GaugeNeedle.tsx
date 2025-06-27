// Importa o núcleo do React (biblioteca para construção de interfaces)
import React from 'react';

// Importa a API para criar a raiz da aplicação (React 18+)
import ReactDOM from 'react-dom/client';

// Estilos globais da aplicação
import './index.css';

// Componente principal da aplicação
import App from './App';

// Módulo opcional para monitorar métricas de performance (Web Vitals)
import reportWebVitals from './reportWebVitals';

// Cria a raiz React vinculada ao elemento HTML com id 'root'
// Isso serve como ponto de montagem da aplicação dentro do HTML
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Renderiza a aplicação React dentro do React.StrictMode
// O StrictMode é uma ferramenta de desenvolvimento que ajuda a identificar
// práticas não recomendadas e problemas potenciais no código
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Medição de performance (opcional):
// Esta função pode ser usada para registrar métricas importantes da aplicação,
// como tempo de carregamento, interatividade, etc.
// Você pode enviar os resultados para uma API de análise ou simplesmente logar no console.
// Exemplo para ativar: reportWebVitals(console.log);
reportWebVitals();