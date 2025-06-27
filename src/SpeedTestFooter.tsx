// Importa o React e o styled-components para estilização com CSS-in-JS
import React from 'react';
import styled from 'styled-components';

// Define o contêiner principal do rodapé com espaçamento e borda superior
const FooterContainer = styled.footer`
  margin-top: 40px;
  padding: 20px 0;
  border-top: 1px solid rgba(0, 198, 251, 0.3);
  text-align: center;
`;

// Parágrafo com o nome do criador do projeto (crédito pessoal)
const Credits = styled.p`
  color: #7ee8fa;
  font-size: 0.9rem;
  margin-bottom: 15px;
`;

// Agrupamento horizontal de botões de link (badges)
const BadgesContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 18px;
`;

// Estilização dos botões de link — cada um representa uma rede ou site
const Badge = styled.a`
  display: inline-block;
  padding: 6px 16px;
  border-radius: 16px;
  background: #00c6fb;
  color: #fff;
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  box-shadow: 0 2px 8px rgba(0,198,251,0.12);
  border: none;
  cursor: pointer;

  // Efeito de destaque ao passar o mouse
  &:hover {
    background: #005bea;
    color: #fff;
    transform: translateY(-2px) scale(1.05);
  }
`;

// Texto discreto com aviso de direitos autorais no final do rodapé
const Copyright = styled.p`
  color: #6b7280;
  font-size: 0.8rem;
  margin-top: 10px;
`;

// Componente de rodapé com ano dinâmico e links úteis personalizados
const SpeedTestFooter: React.FC = () => {
  const currentYear = new Date().getFullYear(); // Obtém o ano atual dinamicamente

  return (
    <FooterContainer>
      <Credits>Create by Hermesson Yuri</Credits>

      {/* Links para redes sociais e páginas pessoais */}
      <BadgesContainer>
        <Badge href="https://hermessonyuri.com/" target="_blank" rel="noopener noreferrer">Site</Badge>
        <Badge href="https://www.linkedin.com/in/hermesson-yuri/" target="_blank" rel="noopener noreferrer">LinkedIn</Badge>
        <Badge href="https://github.com/hermessonyurii" target="_blank" rel="noopener noreferrer">GitHub</Badge>
        <Badge href="https://siteoficial-hy.shop/" target="_blank" rel="noopener noreferrer">Blog</Badge>
        <Badge href="https://www.dio.me/users/contato_39140" target="_blank" rel="noopener noreferrer">DIO</Badge>
      </BadgesContainer>

      {/* Direitos autorais atualizados automaticamente */}
      <Copyright>© {currentYear} Hermesson Yuri. Todos os direitos reservados.</Copyright>
    </FooterContainer>
  );
};

export default SpeedTestFooter;