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
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SpeedTestResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [speedValue, setSpeedValue] = useState(0);
  const speedInterval = useRef<NodeJS.Timeout | null>(null);
  const [statusMessage, setStatusMessage] = useState('Testando sua conexão...');

  useEffect(() => {
    if (loading) {
      setSpeedValue(0);
      speedInterval.current = setInterval(() => {
        setSpeedValue((prev) => {
          const target = result ? Number(result.download) : 750;
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
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const { data } = await axios.get('http://localhost:5000/api/speedtest');
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
