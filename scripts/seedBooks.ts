/**
 * Script to seed initial book data into MongoDB
 * Run with: npx ts-node scripts/seedBooks.ts
 * Or: node --loader ts-node/esm scripts/seedBooks.ts
 */

import mongoose from 'mongoose';
import Book from '../models/Book';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

const books = [
  { 
    sanskrit_name: 'मुद्गल पुराण', 
    english_name: 'Mudgal Puran',

    position: 1,
    image: '/book.webp',
    details: 'मुद्गल पुराण गणेश जी को समर्पित एक महत्वपूर्ण पुराण है। इसमें गणेश जी की महिमा, उनकी उत्पत्ति, और विभिन्न अवतारों का वर्णन है।'
  },
  { 
    sanskrit_name: 'गणेश पुराण', 
    english_name: 'Ganesha Puran',
    position: 2,
    image: '/book.webp',
    details: 'गणेश पुराण गणेश जी के जीवन, कथाओं और उनकी पूजा विधि का विस्तृत वर्णन करता है। यह गणेश भक्तों के लिए अत्यंत महत्वपूर्ण ग्रंथ है।'
  },
  { 
    sanskrit_name: 'गणपति अथर्वशीर्ष', 
    english_name: 'Ganesha Atharvashieras',
    position: 3,
    image: '/book.webp',
    details: 'गणपति अथर्वशीर्ष गणेश जी की स्तुति और मंत्रों का संग्रह है। इसमें गणेश जी की आराधना के विभिन्न मंत्र और स्तोत्र शामिल हैं।'
  },
  { 
    sanskrit_name: 'गणपत्य अगम', 
    english_name: 'Ganesha Agam',
    position: 4,
    image: '/book.webp',
    details: 'गणपत्य अगम तंत्र शास्त्र का एक महत्वपूर्ण ग्रंथ है जो गणेश जी की साधना और तांत्रिक विधियों का वर्णन करता है।'
  },
  { 
    sanskrit_name: 'गणेश तंत्र', 
    english_name: 'Ganesha Tantra',
    position: 5,
    image: '/book.webp',
    details: 'गणेश तंत्र में गणेश जी की तांत्रिक साधना, यंत्र, मंत्र और विभिन्न तांत्रिक विधियों का विस्तृत वर्णन है।'
  },
  { 
    sanskrit_name: 'हरिवंश गणेश खंड', 
    english_name: 'Ganesha Khanda',
    position: 6,
    image: '/book.webp',
    details: 'हरिवंश पुराण के गणेश खंड में गणेश जी की कथाएं, उनके विभिन्न रूप और महिमा का वर्णन है।'
  },
  { 
    sanskrit_name: 'विनायक कल्प', 
    english_name: 'Vinyak Kalpa',
    position: 7,
    image: '/book.webp',
    details: 'विनायक कल्प गणेश जी की पूजा विधि, व्रत, और विभिन्न अनुष्ठानों का विस्तृत वर्णन करता है।'
  },
  { 
    sanskrit_name: 'पुराण', 
    english_name: 'Puran',
    position: 8,
    image: '/book.webp',
    details: 'पुराण हिंदू धर्म के प्राचीन ग्रंथ हैं जिनमें देवताओं, ऋषियों और राजाओं की कथाएं संग्रहीत हैं।'
  },
  { 
    sanskrit_name: 'उपनिषद', 
    english_name: 'Upanisad',
    position: 9,
    image: '/book.webp',
    details: 'उपनिषद वेदों के अंतिम भाग हैं जो आध्यात्मिक ज्ञान और ब्रह्म की प्रकृति का वर्णन करते हैं।'
  },
];

async function seedBooks() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing books
    await Book.deleteMany({});
    console.log('Cleared existing books');

    // Insert new books
    await Book.insertMany(books);
    console.log('Seeded books successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding books:', error);
    process.exit(1);
  }
}

seedBooks();

