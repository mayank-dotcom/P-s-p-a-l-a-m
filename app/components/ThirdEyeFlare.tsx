

interface ThirdEyeFlareProps {
  onClick: () => void;
}

export default function ThirdEyeFlare({ onClick }: ThirdEyeFlareProps) {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        top: '25%',
        left: '35%',
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        zIndex: 60,
        scale: 0.5,
        animation: 'flareAppear 1s ease-out forwards',
      }}
    >
      {/* Main Flare Circle */}
      <div
        style={{
          position: 'relative',
          width: 'clamp(40px, 4vw, 60px)',
          height: 'clamp(40px, 4vw, 60px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.98) 30%, rgba(255, 255, 255, 0.85) 60%, rgba(255, 255, 255, 0) 100%)',
          boxShadow: `
            0 0 40px rgba(255, 255, 255, 1),
            0 0 80px rgba(255, 255, 255, 0.9),
            0 0 120px rgba(255, 255, 255, 0.7),
            0 0 160px rgba(255, 255, 255, 0.5),
            inset 0 0 40px rgba(255, 255, 255, 0.9)
          `,
          animation: 'pulsatingGlow 4s ease-in-out infinite',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.2)';
          e.currentTarget.style.boxShadow = `
            0 0 50px rgba(255, 255, 255, 1),
            0 0 100px rgba(255, 255, 255, 0.95),
            0 0 150px rgba(255, 255, 255, 0.8),
            0 0 200px rgba(255, 255, 255, 0.6),
            inset 0 0 50px rgba(255, 255, 255, 0.95)
          `;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = `
            0 0 40px rgba(255, 255, 255, 1),
            0 0 80px rgba(255, 255, 255, 0.9),
            0 0 120px rgba(255, 255, 255, 0.7),
            0 0 160px rgba(255, 255, 255, 0.5),
            inset 0 0 40px rgba(255, 255, 255, 0.9)
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
          border: '2px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 0 25px rgba(255, 255, 255, 0.6)',
          animation: 'ringPulse 4s ease-in-out infinite',
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
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
          animation: 'ringPulse 4s ease-in-out infinite 0.5s',
          pointerEvents: 'none',
        }}
      />

      {/* {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '2px',
            height: 'clamp(20px, 2.5vw, 35px)',
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), transparent)',
            transformOrigin: 'top center',
            transform: `translate(-50%, -100%) rotate(${angle}deg)`,
            animation: `rayPulse 3s ease-in-out infinite ${index * 0.2}s`,
            pointerEvents: 'none',
          }}
        />
      ))} */}

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

        @keyframes pulsatingGlow {
          0%, 100% {
            opacity: 0.65;
            transform: scale(0.98);
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @keyframes iconRotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes ringPulse {
          0%, 100% {
            opacity: 0.2;
            transform: translate(-50%, -50%) scale(0.98);
          }
          50% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        @keyframes rayPulse {
          0%, 100% {
            opacity: 0.4;
            height: clamp(20px, 2.5vw, 35px);
          }
          50% {
            opacity: 0.8;
            height: clamp(30px, 3.5vw, 50px);
          }
        }
      `}</style>
    </div>
  );
}