import React, { useState, useEffect } from 'react';

const tips = [
  'Feche outros aplicativos que usam internet para resultados mais precisos',
  'Conecte-se diretamente ao roteador via cabo para melhor desempenho',
  'Velocidades podem variar dependendo do horário e congestionamento da rede',
  'Reinicie seu roteador caso os resultados estejam abaixo do esperado'
];

const TipsComponent: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      margin: '20px 0',
      padding: '15px',
      background: 'rgba(0, 198, 251, 0.1)',
      borderRadius: '8px',
      borderLeft: '3px solid #00c6fb'
    }}>
      <p style={{ margin: 0, color: '#7ee8fa' }}>
        <strong>Dica: </strong>{tips[currentTip]}
      </p>
    </div>
  );
};

export default TipsComponent; 