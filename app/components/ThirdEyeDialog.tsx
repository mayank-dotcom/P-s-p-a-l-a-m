import React, { useState, useEffect } from 'react';
import { Search, Play, X } from 'lucide-react';

interface Book {
  _id?: string;
  sanskrit_name?: string;
  english_name?: string;
  sampradaaya?: string;
  position?: number;
  image?: string;
  details?: string;
  category?: string;
  publication?: string | string[];
}

interface ThirdEyeDialogProps {
  onClose: () => void;
  onBookSelect: (book: Book) => void;
  books: Book[];
}

export default function ThirdEyeDialog({ onClose, onBookSelect, books }: ThirdEyeDialogProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = books.filter(book =>
        book.sanskrit_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.english_name?.toLowerCase().includes(searchQuery.toLowerCase()) 
      
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks([]);
    }
  }, [searchQuery, books]);

  const handleStartJourney = () => {
    // Close dialog and let user explore naturally
    onClose();
  };

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          zIndex: 29000,
          backdropFilter: 'blur(8px)',
          animation: 'dialogFadeIn 0.3s ease',
        }}
      />
      
      {/* Dialog */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 30000,
          animation: 'dialogSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          padding: '3px',
          borderRadius: '24px',
          background: 'rgba(0, 0, 0, 0.18)',
          border: '2px solid rgba(255, 229, 153, 0.25)',
          maxWidth: '500px',
          width: '90%',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 100,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.7)',
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
            e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
            e.currentTarget.style.borderColor = 'rgba(255, 229, 153, 0.6)';
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
          }}
        >
          <X size={20} />
        </button>

        {/* Content Container */}
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '22px',
            padding: '30px 24px',
            backdropFilter: 'blur(10px)',
            boxShadow: 'inset 0 0 0 1px rgba(255, 229, 153, 0.15)',
          }}
        >
          {!showSearch ? (
            /* Options View */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Start Journey Button */}
              <button
                onClick={handleStartJourney}
                style={{
                  padding: '16px 24px',
                  background: 'linear-gradient(135deg, rgba(255, 191, 0, 0.4), rgba(196, 164, 74, 0.4))',
                  border: '2px solid rgba(255, 229, 153, 0.6)',
                  borderRadius: '16px',
                  color: '#FFE599',
                  fontFamily: 'var(--font-jaini-purva)',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  boxShadow: '0 0 20px rgba(255, 191, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  textShadow: '0 0 10px rgba(255, 229, 153, 0.8)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 191, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 191, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }}
              >
                <Play size={20} style={{ filter: 'drop-shadow(0 0 6px rgba(255, 229, 153, 0.6))' }} />
                अपनी यात्रा शुरू करें
              </button>

              {/* Search Button */}
              <button
                onClick={handleSearchClick}
                style={{
                  padding: '16px 24px',
                  background: 'linear-gradient(135deg, rgba(100, 149, 237, 0.3), rgba(65, 105, 225, 0.3))',
                  border: '2px solid rgba(135, 206, 250, 0.6)',
                  borderRadius: '16px',
                  color: '#B0D4FF',
                  fontFamily: 'var(--font-jaini-purva)',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  boxShadow: '0 0 20px rgba(100, 149, 237, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  textShadow: '0 0 10px rgba(176, 212, 255, 0.8)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(100, 149, 237, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(100, 149, 237, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }}
              >
                <Search size={20} style={{ filter: 'drop-shadow(0 0 6px rgba(176, 212, 255, 0.6))' }} />
                ग्रंथ खोजें
              </button>
            </div>
          ) : (
            /* Search View */
            <div>
              {/* Search Input */}
              <div
                style={{
                  position: 'relative',
                  marginBottom: '16px',
                }}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ग्रंथ का नाम खोजें..."
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '14px 50px 14px 20px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '2px solid rgba(255, 229, 153, 0.3)',
                    borderRadius: '12px',
                    color: '#FFE599',
                    fontFamily: 'var(--font-jaini-purva)',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 229, 153, 0.6)';
                    e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 191, 0, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 229, 153, 0.3)';
                    e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(0, 0, 0, 0.3)';
                  }}
                />
                <Search
                  size={20}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#C4A44A',
                    pointerEvents: 'none',
                  }}
                />
              </div>

              {/* Search Results */}
              {searchQuery.trim() && (
                <div
                  style={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 229, 153, 0.2)',
                    padding: '8px',
                  }}
                >
                  {filteredBooks.length > 0 ? (
                    filteredBooks.map((book, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          onBookSelect(book);
                          onClose();
                        }}
                        style={{
                          padding: '12px 16px',
                          background: 'rgba(255, 191, 0, 0.1)',
                          border: '1px solid rgba(255, 229, 153, 0.2)',
                          borderRadius: '8px',
                          marginBottom: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 191, 0, 0.2)';
                          e.currentTarget.style.borderColor = 'rgba(255, 229, 153, 0.4)';
                          e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 191, 0, 0.1)';
                          e.currentTarget.style.borderColor = 'rgba(255, 229, 153, 0.2)';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        <div
                          style={{
                            fontFamily: 'var(--font-jaini-purva)',
                            fontSize: '16px',
                            color: '#FFE599',
                            fontWeight: 'bold',
                            marginBottom: '4px',
                          }}
                        >
                          {book.sanskrit_name || book.english_name || ''}
                        </div>
                        {book.category && (
                          <div
                            style={{
                              fontFamily: 'var(--font-jaini-purva)',
                              fontSize: '13px',
                              color: '#C4A44A',
                              fontStyle: 'italic',
                            }}
                          >
                            {book.category}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        padding: '20px',
                        textAlign: 'center',
                        fontFamily: 'var(--font-jaini-purva)',
                        fontSize: '14px',
                        color: '#C4A44A',
                      }}
                    >
                      कोई ग्रंथ नहीं मिला
                    </div>
                  )}
                </div>
              )}

              {/* Back Button */}
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery('');
                }}
                style={{
                  marginTop: '16px',
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 229, 153, 0.3)',
                  borderRadius: '10px',
                  color: '#D4AF78',
                  fontFamily: 'var(--font-jaini-purva)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 191, 0, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 229, 153, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.borderColor = 'rgba(255, 229, 153, 0.3)';
                }}
              >
                वापस जाएं
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes dialogFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes dialogSlideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -45%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </>
  );
}