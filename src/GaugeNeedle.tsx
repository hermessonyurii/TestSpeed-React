import React from 'react';

interface GaugeNeedleProps {
  value: number; // valor atual
  max: number;   // valor máximo
  width?: number;
  height?: number;
}

const GaugeNeedle: React.FC<GaugeNeedleProps> = ({ value, max, width = 420, height = 260 }) => {
  // Limita o valor entre 0 e max
  const safeValue = Math.max(0, Math.min(value, max));
  // Ângulo inicial e final do arco (em graus)
  const startAngle = -120;
  const endAngle = 120;
  // Calcula o ângulo do ponteiro
  const angle = startAngle + ((safeValue / max) * (endAngle - startAngle));

  // Função para criar o arco do velocímetro
  const describeArc = (cx: number, cy: number, r: number, start: number, end: number) => {
    const toRad = (deg: number) => (Math.PI / 180) * deg;
    const x1 = cx + r * Math.cos(toRad(start));
    const y1 = cy + r * Math.sin(toRad(start));
    const x2 = cx + r * Math.cos(toRad(end));
    const y2 = cy + r * Math.sin(toRad(end));
    const largeArc = end - start <= 180 ? 0 : 1;
    return `M${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2}`;
  };

  const cx = width / 2;
  const cy = height * 0.95;
  const r = Math.min(width, height * 2) * 0.8 / 2;
  const pointerLength = r - 5;
  const pointerWidth = 12;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', margin: '0 auto' }}>
      {/* Arco de fundo */}
      <path
        d={describeArc(cx, cy, r, startAngle, endAngle)}
        fill="none"
        stroke="#223"
        strokeWidth={22}
        opacity={0.4}
      />
      {/* Arco colorido */}
      <path
        d={describeArc(cx, cy, r, startAngle, angle)}
        fill="none"
        stroke="#00c6fb"
        strokeWidth={22}
        opacity={0.9}
        style={{ filter: 'drop-shadow(0 0 12px #00e6a8)' }}
      />
      {/* Ponteiro */}
      <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: `${cx}px ${cy}px` }}>
        <rect
          x={cx - pointerWidth / 2}
          y={cy - pointerLength}
          width={pointerWidth}
          height={pointerLength}
          fill="#fff"
          style={{ filter: 'drop-shadow(0 0 10px #00c6fb)' }}
          rx={pointerWidth / 2}
        />
        <circle cx={cx} cy={cy} r={16} fill="#00c6fb" stroke="#fff" strokeWidth={5} />
      </g>
      {/* Valor numérico centralizado dentro do velocímetro */}
      <text
        x={cx}
        y={cy - r / 2.2}
        textAnchor="middle"
        fontSize={44}
        fill="#00c6fb"
        fontWeight="bold"
        style={{ textShadow: '0 0 12px #005bea', fontFamily: 'Orbitron, Arial, sans-serif' }}
        dominantBaseline="middle"
      >
        {safeValue.toFixed(2)} Mbps
      </text>
    </svg>
  );
};

export default GaugeNeedle; 