// Importa o React e as ferramentas de estilização e animação do styled-components
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define a animação para a barra de progresso:
// - Ela cresce da esquerda para a direita (width de 0% a 100%);
// - O fundo animado cria um efeito de "movimento interno"
const progress = keyframes`
  0% { width: 0%; background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { width: 100%; background-position: 0% 50%; }
`;

// Contêiner da barra de progresso:
// - Define largura, altura e um visual mais suave com bordas arredondadas
const ProgressContainer = styled.div`
  width: 80%;
  max-width: 400px;
  height: 8px;
  background: rgba(0, 198, 251, 0.2);  // cor de fundo translúcida
  border-radius: 4px;
  margin: 20px auto;
  overflow: hidden; // garante que nada ultrapasse os limites arredondados
`;

// Elemento animado interno da barra:
// - A animação controlada por keyframes cria um loop visual chamativo e suave
const ProgressBar = styled.div`
  height: 100%;
  width: 0%;  // começa vazio, e a animação cuida da expansão
  border-radius: 4px;
  background: linear-gradient(90deg, #00c6fb, #00e6a8); // degrade vibrante
  background-size: 200% 200%;  // área extensa para o efeito de movimento
  animation: ${progress} 3s ease-in-out infinite; // loop contínuo
`;

// Componente funcional que renderiza a barra de progresso animada
const AnimatedProgressBar: React.FC = () => {
  return (
    <ProgressContainer>
      <ProgressBar />
    </ProgressContainer>
  );
};

export default AnimatedProgressBar;