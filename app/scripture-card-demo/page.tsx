'use client';

import ScriptureCard from '../components/ScriptureCard';
import Navbar from '../components/Navbar';

export default function ScriptureCardDemo() {
  const handleRead = () => {
    console.log('Read button clicked');
    alert('Opening scripture for reading...');
  };

  const handleLivePodcast = () => {
    console.log('Live Podcast button clicked');
    alert('Joining live podcast...');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a0f0a 0%, #2d1810 50%, #1a0f0a 100%)',
        padding: '40px 20px',
      }}
    >
      <Navbar />
      
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          paddingTop: '80px',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-jaini-purva)',
            fontSize: '48px',
            background: 'linear-gradient(135deg, #FFE599 0%, #FFBF00 50%, #FFE599 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            marginBottom: '50px',
            filter: 'drop-shadow(0 0 20px rgba(255, 229, 153, 0.6))',
          }}
        >
          Scripture Card Demo
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '40px',
            justifyItems: 'center',
          }}
        >
          <ScriptureCard
            name="गणेश उरण"
            description="गणेश उरण गणेश जी के डोलन, कथाओं और उनकी इड़ा विधि का विस्तृत वर्णन करता है। यह गणेश भक्तों के लिए आदर्श महत्वपूर्ण ग्रंथ है।"
            publisher="गीता प्रेस गोरखपुर"
            category="धार्मिक ग्रंथ"
            image="/book.webp"
            onRead={handleRead}
            onLivePodcast={handleLivePodcast}
          />

          <ScriptureCard
            name="भगवद गीता"
            description="भगवद गीता हिंदू धर्म का सबसे महत्वपूर्ण ग्रंथ है जो जीवन के गूढ़ रहस्यों और कर्म योग का उपदेश देता है। यह महाभारत का एक अंश है।"
            publisher="गीता प्रेस गोरखपुर"
            category="पवित्र शास्त्र"
            onRead={handleRead}
            onLivePodcast={handleLivePodcast}
          />

          <ScriptureCard
            name="रामायण"
            description="रामायण महर्षि वाल्मीकि द्वारा रचित संस्कृत महाकाव्य है जो भगवान राम के जीवन और उनके आदर्शों का वर्णन करता है।"
            publisher="गीता प्रेस गोरखपुर"
            category="महाकाव्य"
            onRead={handleRead}
            onLivePodcast={handleLivePodcast}
          />
        </div>
      </div>
    </div>
  );
}