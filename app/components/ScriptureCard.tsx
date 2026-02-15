import React, { useState } from 'react';
import { BookOpen, Podcast, X } from 'lucide-react';

interface ScriptureCardProps {
  name: string;
  description: string;
  publisher: string;
  category: string;
  image?: string;
  backgroundImage?: string;
  onRead?: () => void;
  onLivePodcast?: () => void;
  onClose?: () => void;
  showCloseButton?: boolean;
  publishers?: string[];
  tone?: 'blue' | 'black';
}

export default function ScriptureCard({
  name,
  description,
  publisher,
  category,
  image,
  backgroundImage = '/image.png',
  onRead,
  onLivePodcast,
  onClose,
  showCloseButton = false,
  publishers = [],
  tone = 'blue',
}: ScriptureCardProps) {
  // Use publishers array if provided, otherwise use single publisher
  const availablePublishers = publishers.length > 0 ? publishers : (publisher ? [publisher] : []);
  const [selectedPublisher, setSelectedPublisher] = useState<string>(availablePublishers[0] || '');
  const baseBg = tone === 'black' ? 'rgba(0, 0, 0, 0.85)' : 'rgba(8, 16, 40, 0.85)';
  const deepBg = tone === 'black' ? 'rgba(0, 0, 0, 0.95)' : 'rgba(8, 16, 40, 0.95)';
  const overlayBg = tone === 'black' ? 'rgba(0, 0, 0, 0.75)' : 'rgba(8, 16, 40, 0.75)';
  const imageBg = tone === 'black' ? 'rgba(0, 0, 0, 0.85)' : 'rgba(8, 16, 40, 0.85)';
  const buttonIdleBg = tone === 'black' ? 'rgba(0, 0, 0, 0.75)' : 'rgba(8, 16, 40, 0.75)';
  const textColor = tone === 'black' ? '#FFFFFF' : '#F4ECD8';
  const categoryColor = tone === 'black' ? '#FFFFFF' : '#E6D5A8';
  const publicationsLabelColor = tone === 'black' ? '#FFFFFF' : '#E6D5A8';

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '500px',
        background: baseBg,
        borderRadius: '20px',
        padding: '3px',
        border: '2px solid rgba(255, 229, 153, 0.9)',
        backdropFilter: 'blur(10px)',
        overflow: 'hidden',
      }}
    >
      {/* Close Button */}
      {showCloseButton && onClose && (
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            zIndex: 100,
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(8, 16, 40, 0.7)',
            border: '2px solid rgba(255, 229, 153, 0.6)',
            color: '#FFE599',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 15px rgba(255, 191, 0, 0.4)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 69, 0, 0.8)';
            e.currentTarget.style.borderColor = 'rgba(255, 100, 100, 0.8)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(8, 16, 40, 0.8)';
            e.currentTarget.style.borderColor = 'rgba(255, 229, 153, 0.6)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <X size={18} />
        </button>
      )}


      {/* Main Content Container */}
      <div
        style={{
          position: 'relative',
          background: baseBg,
          borderRadius: '20px',
          padding: '14px',
          backdropFilter: 'blur(10px)',
          boxShadow: tone === 'black'
            ? 'inset 0 0 0 1px rgba(255, 229, 153, 0.7), inset 0 0 12px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 191, 0, 0.5)'
            : 'inset 0 0 0 1px rgba(255, 229, 153, 0.7), 0 0 30px rgba(255, 191, 0, 0.5)',
        }}
      >
        {/* Dark Overlay for Text Readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: overlayBg,
            borderRadius: '20px',
            zIndex: 0,
          }}
        />



        {/* Content - All positioned relative to be above backgrounds */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Book Image */}
          {image && (
            <div
              style={{
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {/* Holographic Glow */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-10px',
                  background: 'radial-gradient(circle, rgba(64, 96, 160, 0.5), transparent 70%)',
                  filter: 'blur(10px)',
                  animation: 'holographicPulse 3s ease-in-out infinite',
                }}
              />

              <div
                style={{
                  position: 'relative',
                  padding: '2px',
                  background: 'linear-gradient(135deg, rgba(255, 229, 153, 0.8), rgba(196, 164, 74, 0.9), rgba(139, 105, 20, 0.8))',
                  borderRadius: '12px',
                  boxShadow: `
                    0 0 20px rgba(255, 191, 0, 0.4),
                    0 6px 24px rgba(8, 16, 40, 0.6)
                  `,
                }}
              >
                <div
                  style={{
                    padding: '4px',
                    background: deepBg,
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 229, 153, 0.7)',
                  }}
                >
                  <img
                    src={image}
                    alt={name}
                    style={{
                      width: '100%',
                      maxWidth: '200px',
                      height: '150px',
                      objectFit: 'contain',
                      borderRadius: '8px',
                      background: imageBg,
                      padding: '10px',
                      transform: 'scale(1.2)',

                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Scripture Name */}
          <h2
            style={{
              fontFamily: 'var(--font-jaini-purva)',
              fontSize: '24px',
              background: 'linear-gradient(135deg, #FFE599 0%, #FFBF00 50%, #FFE599 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% auto',
              animation: 'shimmer 3s linear infinite',
              marginBottom: '6px',
              textAlign: 'center',
              fontWeight: 'bold',
              filter: 'drop-shadow(0 0 12px rgba(255, 229, 153, 0.8))',
              letterSpacing: '1px',
            }}
          >
            {name}
          </h2>

          {/* Category */}
          <div
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              background: 'rgba(255, 229, 153, 0.35)',
              borderRadius: '16px',
              marginBottom: '8px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-jaini-purva)',
                fontSize: '14px',
                color: categoryColor,
                margin: 0,
                fontStyle: 'italic',
                textShadow: '0 0 8px rgba(230, 213, 168, 0.4)',
                letterSpacing: '0.5px',
              }}
            >
              {category}
            </p>
          </div>

          {/* Description */}
          <div
            style={{
              background: baseBg,
              padding: '10px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 229, 153, 0.7)',
              marginBottom: '10px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-jaini-purva)',
                color: textColor,
                fontSize: '16px',
                lineHeight: '1.6',
                textAlign: 'justify',
                margin: 0,
                textShadow: '0 1px 2px rgba(8, 16, 40, 0.8)',
              }}
            >
              {description}
            </p>
          </div>

          {/* Publisher */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                width: '20px',
                height: '1px',
                background: 'linear-gradient(to right, transparent, rgba(196, 164, 74, 0.6))',
              }}
            />

            <div
              style={{
                width: '20px',
                height: '1px',
                background: 'linear-gradient(to left, transparent, rgba(196, 164, 74, 0.6))',
              }}
            />
          </div>

          {/* Publication Selection Buttons */}
          {availablePublishers.length > 0 && (
            <div
              style={{
                marginBottom: '10px',
              }}
            >
              {/* Publications Label */}
              <div
                style={{
                  textAlign: 'center',
                  marginBottom: '8px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-jaini-purva)',
                    fontSize: '13px',
                    color: publicationsLabelColor,
                    margin: 0,
                    fontStyle: 'italic',
                    textShadow: '0 0 8px rgba(230, 213, 168, 0.4)',
                    letterSpacing: '0.5px',
                  }}
                >
                  -----Publications-----
                </p>
              </div>

              {/* Publication Buttons */}
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                {availablePublishers.map((pub) => (
                  <button
                    key={pub}
                    onClick={() => setSelectedPublisher(pub)}
                    style={{
                      flex: availablePublishers.length === 1 ? '1' : '0 1 auto',
                      minWidth: availablePublishers.length === 1 ? 'auto' : '120px',
                      padding: '8px 12px',
                      background: selectedPublisher === pub
                        ? 'linear-gradient(135deg, rgba(255, 191, 0, 0.5), rgba(196, 164, 74, 0.5))'
                        : 'rgba(8, 16, 40, 0.3)',
                      border: selectedPublisher === pub
                        ? '2px solid rgba(255, 229, 153, 0.8)'
                        : '1px solid rgba(255, 229, 153, 0.4)',
                      borderRadius: '10px',
                      color: selectedPublisher === pub ? '#FFED4E' : '#FFE599',
                      fontFamily: 'var(--font-jaini-purva)',
                      fontSize: '14px',
                      fontWeight: selectedPublisher === pub ? 'bold' : 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: selectedPublisher === pub
                        ? '0 0 20px rgba(255, 191, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                        : '0 0 10px rgba(255, 191, 0, 0.2)',
                      backdropFilter: 'blur(10px)',
                      textShadow: selectedPublisher === pub
                        ? '0 0 12px rgba(255, 229, 153, 0.9), 0 0 20px rgba(255, 191, 0, 0.5)'
                        : '0 0 10px rgba(255, 229, 153, 0.8), 0 0 15px rgba(255, 191, 0, 0.4)',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedPublisher !== pub) {
                        e.currentTarget.style.background = 'rgba(255, 191, 0, 0.25)';
                        e.currentTarget.style.borderColor = 'rgba(255, 229, 153, 0.6)';
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 191, 0, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedPublisher !== pub) {
                        e.currentTarget.style.background = 'rgba(8, 16, 40, 0.3)';
                        e.currentTarget.style.borderColor = 'rgba(255, 229, 153, 0.4)';
                        e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 191, 0, 0.2)';
                      }
                    }}
                  >
                    {pub}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '8px',
            }}
          >
            {/* Read Button */}
            <button
              onClick={onRead}
              style={{
                flex: 1,
                padding: '10px 16px',
                background: 'linear-gradient(135deg, rgba(255, 191, 0, 0.5), rgba(196, 164, 74, 0.5))',
                border: '2px solid rgba(255, 229, 153, 0.8)',
                borderRadius: '12px',
                color: '#FFED4E',
                fontFamily: 'var(--font-jaini-purva)',
                fontSize: '15px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: `
                  0 0 25px rgba(255, 191, 0, 0.6),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3)
                `,
                backdropFilter: 'blur(10px)',
                textShadow: '0 0 15px rgba(255, 229, 153, 1), 0 0 25px rgba(255, 191, 0, 0.6)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 191, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 191, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
            >
              <BookOpen size={16} style={{ filter: 'drop-shadow(0 0 6px rgba(255, 229, 153, 0.6))' }} />
              पढ़ें
            </button>

            {/* Live Podcast Button */}
            <button
              onClick={onLivePodcast}
              style={{
                flex: 1,
                padding: '10px 16px',
                background: 'linear-gradient(135deg, rgba(255, 69, 0, 0.5), rgba(220, 20, 60, 0.5))',
                border: '2px solid rgba(255, 100, 100, 0.8)',
                borderRadius: '12px',
                color: '#FFD4D4',
                fontFamily: 'var(--font-jaini-purva)',
                fontSize: '15px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: `
                  0 0 25px rgba(255, 69, 0, 0.6),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3)
                `,
                backdropFilter: 'blur(10px)',
                textShadow: '0 0 15px rgba(255, 179, 179, 1), 0 0 25px rgba(255, 69, 0, 0.6)',
                transition: 'all 0.3s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 69, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 69, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
            >
              {/* Live Indicator */}
              <div
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#ff0000',
                  boxShadow: '0 0 8px #ff0000',
                  animation: 'livePulse 1.5s ease-in-out infinite',
                }}
              />
              <Podcast size={16} style={{ filter: 'drop-shadow(0 0 6px rgba(255, 179, 179, 0.6))' }} />
              LIVE
            </button>
          </div>

          {/* Bottom Decorative Element */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '6px',
              marginTop: '8px',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #FFE599, #FFBF00)',
                boxShadow: '0 0 10px rgba(255, 229, 153, 0.8)',
                animation: 'orbitPulse 2s ease-in-out infinite',
              }}
            />
            <div
              style={{
                width: '35px',
                height: '2px',
                background: 'linear-gradient(to right, rgba(196, 164, 74, 0.8), transparent)',
                boxShadow: '0 0 6px rgba(196, 164, 74, 0.4)',
              }}
            />
            <div
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #E6D5A8, #C4A44A)',
                boxShadow: '0 0 6px rgba(230, 213, 168, 0.6)',
                animation: 'orbitPulse 2s ease-in-out infinite 0.5s',
              }}
            />
            <div
              style={{
                width: '35px',
                height: '2px',
                background: 'linear-gradient(to left, rgba(196, 164, 74, 0.8), transparent)',
                boxShadow: '0 0 6px rgba(196, 164, 74, 0.4)',
              }}
            />
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #FFE599, #FFBF00)',
                boxShadow: '0 0 10px rgba(255, 229, 153, 0.8)',
                animation: 'orbitPulse 2s ease-in-out infinite 1s',
              }}
            />
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes borderGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes meshMove {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(10px, -10px) scale(1.02); }
          66% { transform: translate(-10px, 10px) scale(0.98); }
        }

        @keyframes holographicPulse {
          0%, 100% { opacity: 0.3; filter: blur(15px); }
          50% { opacity: 0.5; filter: blur(20px); }
        }

        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        @keyframes orbitPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.3); opacity: 1; }
        }

        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}