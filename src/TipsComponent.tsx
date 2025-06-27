// Importa o React e os hooks useState e useEffect
import React, { useState, useEffect } from 'react';

// Lista de dicas que serão exibidas ciclicamente
const tips = [
  'Feche outros aplicativos que usam internet para resultados mais precisos',
  'Conecte-se diretamente ao roteador via cabo para melhor desempenho',
  'Velocidades podem variar dependendo do horário e congestionamento da rede',
  'Reinicie seu roteador caso os resultados estejam abaixo do esperado'
];

// Componente funcional que exibe uma dica de forma rotativa a cada 5 segundos
const TipsComponent: React.FC = () => {
  // Índice atual da dica visível
  const [currentTip, setCurrentTip] = useState(0);

  // useEffect com intervalo para atualizar a dica automaticamente
  useEffect(() => {
    // A cada 5 segundos, atualiza para a próxima dica em loop
    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % tips.length);
    }, 5000);

    // Limpa o intervalo ao desmontar o componente para evitar vazamentos de memória
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      margin: '20px 0',
      padding: '15px',
      background: 'rgba(0, 198, 251, 0.1)',         // Fundo translúcido azul
      borderRadius: '8px',                          // Cantos arredondados
      borderLeft: '3px solid #00c6fb'               // Barra à esquerda para destaque visual
    }}>
      {/* Exibe a dica atual com estilo leve e moderno */}
      <p style={{ margin: 0, color: '#7ee8fa' }}>
        <strong>Dica: </strong>{tips[currentTip]}
      </p>
    </div>
  );
};

export default TipsComponent;