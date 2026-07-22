interface ThirdEyeFlareRedProps {
  onClick: () => void;
}

export default function ThirdEyeFlareRed({ onClick }: ThirdEyeFlareRedProps) {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        top: '17.5%',
        left: '51.5%',
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        zIndex: 60,
        scale: 0.4,
        animation: 'flareAppear 1s ease-out forwards',
      }}
    >
      {/* Main Flare Circle - Hollow Red Ring */}
      <div
        style={{
          position: 'relative',
          width: 'clamp(40px, 4vw, 60px)',
          height: 'clamp(40px, 4vw, 60px)',
          borderRadius: '50%',
          // Hollow center with red ring gradient
          background: 'radial-gradient(circle, rgba(255, 0, 0, 0) 0%, rgba(255, 0, 0, 0) 35%, rgba(255, 50, 50, 0.9) 50%, rgba(255, 100, 100, 0.95) 70%, rgba(255, 50, 50, 0.7) 85%, rgba(255, 0, 0, 0) 100%)',
          boxShadow: `
            0 0 40px rgba(255, 0, 0, 1),
            0 0 80px rgba(255, 50, 50, 0.9),
            0 0 120px rgba(255, 100, 100, 0.7),
            0 0 160px rgba(255, 50, 50, 0.5),
            inset 0 0 40px rgba(255, 0, 0, 0.6)
          `,
          animation: 'pulsatingGlowRed 4s ease-in-out infinite',
          transition: 'all 0.3s ease',
          border: '2px solid rgba(255, 50, 50, 0.8)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.2)';
          e.currentTarget.style.boxShadow = `
            0 0 50px rgba(255, 0, 0, 1),
            0 0 100px rgba(255, 50, 50, 0.95),
            0 0 150px rgba(255, 100, 100, 0.8),
            0 0 200px rgba(255, 50, 50, 0.6),
            inset 0 0 50px rgba(255, 0, 0, 0.7)
          `;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = `
            0 0 40px rgba(255, 0, 0, 1),
            0 0 80px rgba(255, 50, 50, 0.9),
            0 0 120px rgba(255, 100, 100, 0.7),
            0 0 160px rgba(255, 50, 50, 0.5),
            inset 0 0 40px rgba(255, 0, 0, 0.6)
          `;
        }}
      >
       
      </div>

      {/* Outer Glow Rings */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(60px, 6vw, 90px)',
          height: 'clamp(60px, 6vw, 90px)',
          borderRadius: '50%',
          border: '2px solid rgba(255, 50, 50, 0.5)',
          boxShadow: '0 0 25px rgba(255, 0, 0, 0.6)',
          animation: 'ringPulseRed 4s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(80px, 8vw, 120px)',
          height: 'clamp(80px, 8vw, 120px)',
          borderRadius: '50%',
          border: '1px solid rgba(255, 100, 100, 0.4)',
          boxShadow: '0 0 20px rgba(255, 50, 50, 0.5)',
          animation: 'ringPulseRed 4s ease-in-out infinite 0.5s',
          pointerEvents: 'none',
        }}
      />

      {/* Animations */}
      <style>{`
        @keyframes flareAppear {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.3);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes pulsatingGlowRed {
          0%, 100% {
            opacity: 0.65;
            transform: scale(0.98);
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @keyframes ringPulseRed {
          0%, 100% {
            opacity: 0.2;
            transform: translate(-50%, -50%) scale(0.98);
          }
          50% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}