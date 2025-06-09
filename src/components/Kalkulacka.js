export default function Kalkulacka({ left, top }) {
  return (
    <svg
      id="kalkulacka"
      width="240"
      height="330"
      style={{
        position: "absolute",         // POZOR: 'absolute' nie 'fixed'
        left: `${left}px`,
        top: `${top}px`,
        zIndex: 0,                    // Nízky z-index, aby bola pod obsahom
        opacity: 0.35,                // Jemná priehľadnosť
        pointerEvents: "none",        // Nekoliduje s klikmi
        transition: "left 0.02s linear, top 0.02s linear",
        filter: "blur(0.5px) grayscale(0.7)",
      }}
      viewBox="0 0 160 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="10" y="10" width="140" height="200" rx="16" fill="#fff" stroke="#222" strokeWidth="3"/>
      <rect x="30" y="28" width="100" height="36" rx="6" fill="#eaf3fa" stroke="#222" strokeWidth="2"/>
      <g>
        <rect x="30" y="80" width="24" height="24" rx="6" fill="#f0f0f0" stroke="#aaa"/>
        <rect x="62" y="80" width="24" height="24" rx="6" fill="#f0f0f0" stroke="#aaa"/>
        <rect x="94" y="80" width="24" height="24" rx="6" fill="#f0f0f0" stroke="#aaa"/>
        <rect x="30" y="112" width="24" height="24" rx="6" fill="#f0f0f0" stroke="#aaa"/>
        <rect x="62" y="112" width="24" height="24" rx="6" fill="#f0f0f0" stroke="#aaa"/>
        <rect x="94" y="112" width="24" height="24" rx="6" fill="#f0f0f0" stroke="#aaa"/>
        <rect x="30" y="144" width="24" height="24" rx="6" fill="#f0f0f0" stroke="#aaa"/>
        <rect x="62" y="144" width="24" height="24" rx="6" fill="#f0f0f0" stroke="#aaa"/>
        <rect x="94" y="144" width="24" height="24" rx="6" fill="#f0f0f0" stroke="#aaa"/>
        <rect x="30" y="176" width="24" height="24" rx="6" fill="#f95e23" stroke="#f95e23"/>
        <rect x="62" y="176" width="24" height="24" rx="6" fill="#f0f0f0" stroke="#aaa"/>
        <rect x="94" y="176" width="24" height="24" rx="6" fill="#f0f0f0" stroke="#aaa"/>
      </g>
      <text x="44" y="52" fontSize="18" fontFamily="monospace" fill="#222">1234</text>
      <text x="42" y="97" fontSize="15" fontFamily="monospace" fill="#222">7</text>
      <text x="74" y="97" fontSize="15" fontFamily="monospace" fill="#222">8</text>
      <text x="106" y="97" fontSize="15" fontFamily="monospace" fill="#222">9</text>
      <text x="42" y="129" fontSize="15" fontFamily="monospace" fill="#222">4</text>
      <text x="74" y="129" fontSize="15" fontFamily="monospace" fill="#222">5</text>
      <text x="106" y="129" fontSize="15" fontFamily="monospace" fill="#222">6</text>
      <text x="42" y="161" fontSize="15" fontFamily="monospace" fill="#222">1</text>
      <text x="74" y="161" fontSize="15" fontFamily="monospace" fill="#222">2</text>
      <text x="106" y="161" fontSize="15" fontFamily="monospace" fill="#222">3</text>
      <text x="42" y="193" fontSize="15" fontFamily="monospace" fill="#fff">=</text>
      <text x="74" y="193" fontSize="15" fontFamily="monospace" fill="#222">0</text>
      <text x="106" y="193" fontSize="15" fontFamily="monospace" fill="#222">.</text>
    </svg>
  );
}

