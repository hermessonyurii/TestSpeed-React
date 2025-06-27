// Importa o React e a função de estilização com suporte a animações
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animação do tipo "pulso" — escala e opacidade variam suavemente
const pulse = keyframes`
  0% { transform: scale(0.95); opacity: 0.6; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.6; }
`;

// Contêiner principal que centraliza os elementos na vertical
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 30px 0;
`;

// Texto exibido abaixo da animação de carregamento
const LoadingText = styled.div`
  font-family: 'Orbitron', sans-serif;
  color: #00c6fb;
  font-size: 1.2rem;
  text-align: center;
`;

// Círculo com efeito de brilho e borda giratória — indica carregamento ativo
const LoadingAnimation = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(145deg, #00c6fb, #005bea);
  animation: ${pulse} 1.5s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(0, 198, 251, 0.5);
  position: relative;

  // Círculo externo com borda girando continuamente (efeito spinner)
  &::after {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 3px solid transparent;
    border-top-color: #00e6a8;
    border-radius: 50%;
    animation: spin 1.5s linear infinite;
  }

  // Animação do spinner — rotação completa contínua
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Três bolinhas animadas em sequência para reforçar visualmente o progresso
const ProgressDots = styled.div`
  display: flex;
  gap: 8px;

  span {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #7ee8fa;
    opacity: 0.4;

    // Cada bolinha pisca com atraso diferente para criar efeito de sequência
    &:nth-child(1) { animation: ${pulse} 1s infinite; }
    &:nth-child(2) { animation: ${pulse} 1s infinite 0.2s; }
    &:nth-child(3) { animation: ${pulse} 1s infinite 0.4s; }
  }
`;

// Componente funcional principal que renderiza o indicador de carregamento
const LoadingIndicator: React.FC = () => {
  return (
    <LoadingContainer>
      {/* Ícone animado circular */}
      <LoadingAnimation />
      
      {/* Mensagem amigável de feedback para o usuário */}
      <LoadingText>Testando sua conexão...</LoadingText>
      
      {/* Três pontos pulsando suavemente */}
      <ProgressDots>
        <span></span>
        <span></span>
        <span></span>
      </ProgressDots>
    </LoadingContainer>
  );
};

export default LoadingIndicator;