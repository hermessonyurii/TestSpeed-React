/**
 * Pessoal, sou iniciante, e por isso fiz muitos comentários, pois
 * se algum iniciante vier usar meu projeto, irá entender o que é e para o que serve aqule linha de código.
 * Componente principal da aplicação de Teste de Velocidade, e capitação do IP, Localização
 * DNS, NAT, MAC, Download, Upload, Ping, Jitter, Perda de Pacotes, ISP, IP Interno, IP Externo,
 * VPN, Servidor e Opção para o Resultado Público.
 * 
 * Este componente gerencia todo o fluxo do teste de conexão, desde o acionamento manual
 * até a exibição dos resultados na interface.
 *
 * Principais responsabilidades:
 * - Iniciar o teste ao clicar no botão;
 * - Exibir componentes visuais durante o processo (animação, status e dicas);
 * - Apresentar os resultados de forma clara e segmentada;
 * - Lidar com estados de carregamento, sucesso e erro.
 *
 * Componentes utilizados:
 * - LoadingIndicator: Ícone animado exibido durante a medição;
 * - AnimatedProgressBar: Barra de progresso com animação para visualização do status;
 * - TipsComponent: Sugestões e informações exibidas enquanto o teste roda;
 * - SpeedTestFooter: Rodapé fixo com informações complementares.
 *
 * Comunicação com o backend:
 * - Requisição GET para `/api/speedtest` — responsável por iniciar o teste
 *   e retornar dados como download, upload, ping, jitter, etc.
 */
 
// OBSERVASÃO - Para quem é novo usando React igual a minha pessoa
// (Abaixo da linha 150, usei {/* ... */}, porque tem que ser usado
// dentro do return do React), você deve usar {/* ... */}. 
// O React não aceita // ou /* ... */ diretamente dentro do JSX
 

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import LoadingIndicator from './LoadingIndicator';
import AnimatedProgressBar from './AnimatedProgressBar';
import TipsComponent from './TipsComponent';
import SpeedTestFooter from './SpeedTestFooter';

interface SpeedTestResult {
  ping: number;
  jitter: number;
  download: string;
  upload: string;
  packetLoss: number;
  isp: string;
  interface: {
    internalIp: string;
    externalIp: string;
    macAddr: string;
    isVpn: boolean;
    name: string;
  };
  server: {
    id: string;
    name: string;
    location: string;
    country: string;
    host: string;
    port: number;
    ip: string;
  };
  resultUrl?: string;
}

function App() {
  // Estado que indica se o teste está em andamento
  const [loading, setLoading] = useState(false);
  
  // Armazena os resultados recebidos da API após o teste
  const [result, setResult] = useState<SpeedTestResult | null>(null);
  
  // Armazena mensagens de erro, se houver
  const [error, setError] = useState<string | null>(null);
  
  // Valor usado para atualizar e animar a velocidade no gráfico
  const [speedValue, setSpeedValue] = useState(0);
  
  // Referência para manipular o intervalo de atualização da velocidade
  const speedInterval = useRef<NodeJS.Timeout | null>(null);
  
  // Mensagem de status exibida durante o teste
  const [statusMessage, setStatusMessage] = useState('Testando sua conexão...');

    useEffect(() => {
    // Este efeito controla a animação da velocidade de download enquanto o teste está ativo.
    if (loading) {
      setSpeedValue(0);
      speedInterval.current = setInterval(() => {
        setSpeedValue((prev) => {
          const target = result ? Number(result.download) : 750;
          // Aproxima suavemente o valor atual da velocidade até atingir o valor final
          if (prev < target) {
            const next = prev + Math.max(0.5, (target - prev) * 0.04);
            return next > target ? target : next;
          } else if (prev > target) {
            const next = prev - Math.max(0.5, (prev - target) * 0.04);
            return next < target ? target : next;
          }
          return prev;
        });
      }, 30);
    } else {
      if (speedInterval.current) {
        clearInterval(speedInterval.current);
        speedInterval.current = null;
      }
      if (result) {
        setSpeedValue(Number(result.download) || 0);
      }
    }
    return () => {
      if (speedInterval.current) {
        clearInterval(speedInterval.current);
        speedInterval.current = null;
      }
    };
  }, [loading, result]);

  useEffect(() => {
    // Atualiza a mensagem de status periodicamente enquanto o teste está em execução
    if (!loading) return;
    const messages = [
      'Otimizando medição...',
      'Analisando velocidade de download...',
      'Verificando latência...',
      'Calculando resultados...',
      'Quase lá...'
    ];
    const interval = setInterval(() => {
      setStatusMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, [loading]);

  const handleTest = async () => {
    // Função principal que inicia o teste ao clicar no botão
    // Faz uma requisição ao backend e armazena os resultados
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const { data } = await axios.get('https://testspeed-react.onrender.com/api/speedtest');
      setResult(data);
    } catch (err: any) {
      setError('Erro ao realizar o teste. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="speedtest-container">
        {/* Cabeçalho principal da página */}
        
        {/* Botão de início, com carregamento e desabilitado durante o teste */}
        
        {/* Componentes exibidos apenas enquanto estiver carregando */}
        
        {/* Exibição de mensagem de erro, caso ocorra */}
        
        {/* Resultados exibidos após a conclusão do teste */}
        
        {/* Rodapé da aplicação */}

        <h1>Teste de Velocidade</h1>
        <button
          className={`start-btn${loading ? ' loading' : ''}`}
          onClick={handleTest}
          disabled={loading}
          data-text={loading ? '  Testando...' : 'Iniciar Teste'}
        >
          {loading ? <span className="loader"></span> : null}
          {loading ? '  Testando...' : 'Iniciar Teste'}
        </button>
        {loading && (
          <>
            <LoadingIndicator />
            <div style={{ color: '#00c6fb', fontFamily: 'Orbitron, Arial, sans-serif', fontWeight: 700, fontSize: '1.2rem', marginBottom: 8, marginTop: 8, textAlign: 'center' }}>{statusMessage}</div>
            <AnimatedProgressBar />
            <TipsComponent />
          </>
        )}
        {error && <div className="error">{error}</div>}
        {result && !loading && (
          <div className="results">
            <div className="result-group">
              <span className="label">Download</span>
              <span className="value download">{result.download} Mbps</span>
            </div>
            <div className="result-group">
              <span className="label">Upload</span>
              <span className="value upload">{result.upload} Mbps</span>
            </div>
            <div className="result-group">
              <span className="label">Ping</span>
              <span className="value ping">{result.ping} ms</span>
            </div>
            <div className="result-group">
              <span className="label">Jitter</span>
              <span className="value jitter">{result.jitter} ms</span>
            </div>
            <div className="result-group">
              <span className="label">Perda de Pacotes</span>
              <span className="value packetloss">{result.packetLoss ?? 0}%</span>
            </div>
            <div className="result-group">
              <span className="label">ISP</span>
              <span className="value isp">{result.isp}</span>
            </div>
            <div className="result-group">
              <span className="label">IP Interno</span>
              <span className="value ip">{result.interface.internalIp}</span>
            </div>
            <div className="result-group">
              <span className="label">IP Externo</span>
              <span className="value ip">{result.interface.externalIp}</span>
            </div>
            <div className="result-group">
              <span className="label">MAC</span>
              <span className="value mac">{result.interface.macAddr}</span>
            </div>
            <div className="result-group">
              <span className="label">VPN</span>
              <span className="value vpn">{result.interface.isVpn ? 'Sim' : 'Não'}</span>
            </div>
            <div className="result-group">
              <span className="label">Servidor</span>
              <span className="value server">{result.server.name} ({result.server.location}, {result.server.country})</span>
            </div>
            <div className="result-group">
              <span className="label">NAT</span>
              <span className="value nat">{result.interface.internalIp !== result.interface.externalIp ? 'Sim' : 'Não'}</span>
            </div>
            {result.resultUrl && (
              <div className="result-group">
                <span className="label">Resultado Público</span>
                <a className="value link" href={result.resultUrl} target="_blank" rel="noopener noreferrer">Ver no Speedtest.net</a>
              </div>
            )}
          </div>
        )}
        <footer>
          <SpeedTestFooter />
        </footer>
      </div>
    </>
  );
}

export default App;
