import React from 'react';
import styled, { keyframes } from 'styled-components';

const progress = keyframes`
  0% { width: 0%; background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { width: 100%; background-position: 0% 50%; }
`;

const ProgressContainer = styled.div`
  width: 80%;
  max-width: 400px;
  height: 8px;
  background: rgba(0, 198, 251, 0.2);
  border-radius: 4px;
  margin: 20px auto;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: 0%;
  border-radius: 4px;
  background: linear-gradient(90deg, #00c6fb, #00e6a8);
  background-size: 200% 200%;
  animation: ${progress} 3s ease-in-out infinite;
`;

const AnimatedProgressBar: React.FC = () => {
  return (
    <ProgressContainer>
      <ProgressBar />
    </ProgressContainer>
  );
};

export default AnimatedProgressBar; 