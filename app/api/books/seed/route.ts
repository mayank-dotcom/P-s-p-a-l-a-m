import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Book from '@/models/Book';

const books = [
  {
    sanskrit_name: 'मुद्गल पुराण',
    english_name: 'Mudgal Purana',
    position: 1,
    sampradaaya: [''],
    image: '/Ganesh_wall.png',
    category: 'Purana',
    publication: ['Gita Press Gorakhpur'],
    details: 'Mudgal Purana is an important Purana dedicated to Lord Ganesha. It describes the glory of Ganesha, his origin, and various incarnations.'
  },
  {
    sanskrit_name: 'गणेश पुराण',
    english_name: 'Ganesh Purana',
    position: 2,
    sampradaaya: ['All'],
    image: '/Ganesh_wall.png',
    category: 'Purana',
    publication: ['Gita Press Gorakhpur'],
    details: 'Ganesh Purana provides a detailed description of Lord Ganesha\'s life, stories, and worship methods. It is an extremely important text for Ganesha devotees.'
  },
  {
    sanskrit_name: 'अथर्वशीर्ष',
    english_name: 'Ganapati Atharvashirsha',
    sampradaaya: ['Ganpatya', "Smaartha"],
    position: 3,
    image: '/Ganesh_wall.png',
    category: 'Mantra/Stotra',
    publication: ['Motilal Banarsidass'],
    details: 'Ganapati Atharvashirsha is a collection of hymns and mantras dedicated to Lord Ganesha. It includes various mantras and stotras for the worship of Ganesha.'
  },
  {
    sanskrit_name: 'गणपत्य अगम',
    english_name: 'Ganapaty Agama',
    sampradaaya: ['Ganpatya', "Smaartha"],
    position: 4,
    image: '/Ganesh_wall.png',
    category: 'Tantra',
    publication: ['Chowkhamba Sanskrit Pratishthan'],
    details: 'Ganapaty Agama is an important text of Tantra Shastra that describes the sadhana and tantric methods of Lord Ganesha.'
  },
  {
    sanskrit_name: 'गणेश तंत्र',
    english_name: 'Ganesh Tantra',
    sampradaaya: ['Ganpatya', "Smaartha"],
    position: 5,
    image: '/Ganesh_wall.png',
    category: 'Tantra',
    publication: ['Chowkhamba Sanskrit Pratishthan', 'Gita Press Gorakhpur'],
    details: 'Ganesh Tantra contains detailed descriptions of Ganesha\'s tantric sadhana, yantras, mantras, and various tantric methods.'
  },

  {
    sanskrit_name: 'विनायक कल्प',
    english_name: 'Vinayak Kalpa',
    sampradaaya: ['Ganpatya', "Smaartha"],

    position: 7,
    image: '/Ganesh_wall.png',
    category: 'Kalpa/Vrat',
    publication: ['Chowkhamba Sanskrit Pratishthan'],
    details: 'Vinayak Kalpa provides a detailed description of Ganesha\'s worship methods, vrats, and various rituals.'
  },
  {
    sanskrit_name: 'श्वेताश्वतर उपनिषद्',
    english_name: 'Shvetashvatara Upanishad',
    sampradaaya: ['Shaiva', 'Smaartha'],
    position: 8,
    image: '/Shiva_wall.png',
    category: 'Upanishad',
    publication: ['Chowkhamba Sanskrit Pratishthan'],
    details: 'A principal Upanishad presenting Rudra (Shiva) as the supreme Brahman.'
  },
  {
    sanskrit_name: 'लिङ्ग पुराण',
    english_name: 'Linga Purana',
    sampradaaya: ['All'],
    position: 9,
    image: '/Shiva_wall.png',
    category: 'Purana',
    publication: ['Gita Press'],
    details: 'Focuses on the worship, symbolism, and theology of the Shiva Linga.'
  },
  {
    sanskrit_name: 'शिव पुराण',
    english_name: 'Shiva Purana',
    sampradaaya: ['All'],
    position: 10,
    image: '/Shiva_wall.png',
    category: 'Purana',
    publication: ['Gita Press'],
    details: 'Comprehensive Shaiva Purana describing Shiva’s forms, legends, and devotional practices.'
  },
  {
    sanskrit_name: 'वायु पुराण',
    english_name: 'Vayu Purana',
    sampradaaya: ['Shaiva', 'Smaartha'],
    position: 11,
    image: '/Shiva_wall.png',
    category: 'Purana',
    publication: ['Motilal Banarsidass'],
    details: 'One of the oldest Puranas with strong Shaiva cosmology and mythology.'
  },
  {
    sanskrit_name: 'स्कन्द पुराण',
    english_name: 'Skanda Purana',
    sampradaaya: ['All'],
    position: 12,
    image: '/Shiva_wall.png',
    category: 'Purana',
    publication: ['Chowkhamba Sanskrit Series'],
    details: 'The largest Purana, rich in Shaiva pilgrimage traditions and narratives.'
  },
  {
    sanskrit_name: 'मृगेन्द्र आगम',
    english_name: 'Mrugendra Agama',
    sampradaaya: ['Shaiva', 'Smaartha'],
    position: 13,
    image: '/Shiva_wall.png',
    category: 'Agama',
    publication: ['French Institute of Pondicherry'],
    details: 'A key Shaiva Agama detailing temple construction, rituals, and metaphysics.'
  },
  {
    sanskrit_name: 'कामिक आगम',
    english_name: 'Kamika Agama',
    sampradaaya: ['Shaiva', 'Smaartha'],
    position: 14,
    image: '/Shiva_wall.png',
    category: 'Agama',
    publication: ['French Institute of Pondicherry'],
    details: 'Foundational Shaiva Agama explaining worship procedures and Shaiva philosophy.'
  },
  {
    sanskrit_name: 'विज्ञान भैरव तन्त्र',
    english_name: 'Vijnana Bhairava Tantra',
    sampradaaya: ['Shaiva', 'Smaartha'],
    position: 15,
    image: '/Shiva_wall.png',
    category: 'Tantra',
    publication: ['Chowkhamba Sanskrit Pratishthan'],
    details: 'A dialogue between Shiva and Shakti describing 112 meditation techniques.'
  },
  {
    sanskrit_name: 'नेत्र तन्त्र',
    english_name: 'Netra Tantra',
    sampradaaya: ['Shaiva', 'Smaartha'],
    position: 16,
    image: '/Shiva_wall.png',
    category: 'Tantra',
    publication: ['Motilal Banarsidass'],
    details: 'A Shaiva Tantra focusing on mantra, protection rites, and spiritual liberation.'
  },
  {
    sanskrit_name: 'हरिभक्ति विलास',
    english_name: 'Hari Bhakti Vilasa',
    position: 17,
    sampradaaya: ['Vaishnava', 'Smaartha'],
    image: '/hari_bhakti_vilasa.png',
    category: 'Smriti',
    publication: ['Various'],
    details: 'A foundational Gaudiya Vaishnava text describing rules of devotion, worship, and conduct.'
  },
  {
    sanskrit_name: 'नारद पञ्चरात्र',
    english_name: 'Narada Pancharatra',
    position: 18,
    sampradaaya: ['Vaishnava', 'Smaartha'],
    image: '/narada_pancharatra.png',
    category: 'Agama',
    publication: ['Various'],
    details: 'A major Vaishnava Agama outlining temple rituals, mantras, and icon worship.'
  },
  {
    sanskrit_name: 'पाद्म संहिता',
    english_name: 'Padma Samhita',
    position: 19,
    sampradaaya: ['Vaishnava', 'Smaartha'],
    image: '/padma_samhita.png',
    category: 'Agama',
    publication: ['Various'],
    details: 'One of the primary Pancharatra Samhitas followed in Sri Vaishnava temples.'
  },
  {
    sanskrit_name: 'आहिर्बुध्न्य संहिता',
    english_name: 'Ahirbudhnya Samhita',
    position: 20,
    sampradaaya: ['Vaishnava', 'Smaartha'],
    image: '/ahirbudhnya_samhita.png',
    category: 'Agama',
    publication: ['Various'],
    details: 'A Vaishnava Pancharatra text discussing cosmology, rituals, and mantras.'
  },
  {
    sanskrit_name: 'विष्णु सहस्रनाम',
    english_name: 'Vishnu Sahasranama',
    position: 21,
    sampradaaya: ['Vaishnava', 'Smaartha'],
    image: '/vishnu_sahasranama.png',
    category: 'Stotra',
    publication: ['Various'],
    details: 'A hymn praising the thousand names of Vishnu, a central Vaishnava text.'
  },
  {
    sanskrit_name: 'गोपाल सहस्रनाम',
    english_name: 'Gopala Sahasranama',
    position: 22,
    sampradaaya: ['Vaishnava', 'Smaartha'],
    image: '/gopala_sahasranama.png',
    category: 'Stotra',
    publication: ['Various'],
    details: 'A text listing the thousand divine names of Sri Krishna as Gopala.'
  },
  {
    sanskrit_name: 'नारायणीयम्',
    english_name: 'Narayaneeyam',
    position: 23,
    sampradaaya: ['Vaishnava', 'Smaartha'],
    image: '/narayaneeyam.png',
    category: 'Stotra',
    publication: ['Various'],
    details: 'A devotional condensed version of the Bhagavata Purana composed by Melpathur Narayana Bhattathiri.'
  },
  {
    sanskrit_name: 'श्रीमद्भगवद्गीता',
    english_name: 'Bhagavad Gita',
    position: 24,
    sampradaaya: ['Vaishnava', 'Smaartha'],
    image: '/bhagavad_gita.png',
    category: 'Smriti',
    publication: ['Gita Press Gorakhpur'],
    details: 'The most central scripture of all Vaishnava traditions, spoken by Krishna to Arjuna.'
  },
  {
    sanskrit_name: 'गोपाळ तपनीय उपनिषद्',
    english_name: 'Gopala Tapani Upanishad',
    position: 25,
    sampradaaya: ['Vaishnava', 'Smaartha'],
    image: '/gopala_tapani.png',
    category: 'Upanishad',
    publication: ['Various'],
    details: 'A Krishna-focused Upanishad emphasizing Gopala as the supreme truth.'
  },
  {
    sanskrit_name: 'नृसिंह तपनीय उपनिषद्',
    english_name: 'Nrsimha Tapani Upanishad',
    position: 26,
    sampradaaya: ['Vaishnava', 'Smaartha'],
    image: '/nrsimha_tapani.png',
    category: 'Upanishad',
    publication: ['Various'],
    details: 'A Vaishnava Upanishad dedicated to Lord Narasimha and spiritual liberation.'
  },
  {
    sanskrit_name: 'श्रीरामरक्षा स्तोत्र',
    english_name: 'Rama Raksha Stotra',
    position: 27,
    sampradaaya: ['Vaishnava', 'Smaartha'],
    image: '/rama_raksha.png',
    category: 'Stotra',
    publication: ['Various'],
    details: 'A sacred hymn invoking the protection of Lord Rama.'
  },
  {
    sanskrit_name: 'अध्यात्म रामायण',
    english_name: 'Adhyatma Ramayana',
    position: 28,
    sampradaaya: ['Vaishnava', 'Smaartha'],
    image: '/adhyatma_ramayana.png',
    category: 'Itihasa',
    publication: ['Gita Press Gorakhpur'],
    details: 'A spiritual Vaishnava retelling of the Ramayana found within Brahmanda Purana.'
  },
  {
    sanskrit_name: 'भगवन्नाम कौस्तुभ',
    english_name: 'Bhagavannama Kaustubha',
    position: 29,
    sampradaaya: ['Vaishnava', 'Smaartha'],
    image: '/bhagavannama_kaustubha.png',
    category: 'Stotra',
    publication: ['Various'],
    details: 'A text glorifying the power and significance of chanting Vishnu’s divine names.'
  },
  {
    sanskrit_name: 'गोविन्द गीति',
    english_name: 'Govinda Gita',
    position: 30,
    sampradaaya: ['Vaishnava', 'Smaartha'],
    image: '/govinda_gita.png',
    category: 'Stotra',
    publication: ['Various'],
    details: 'A Vaishnava hymn praising Lord Govinda (Krishna).'
  },
  {
    sanskrit_name: 'पराशर संहिता',
    english_name: 'Parashara Samhita',
    position: 31,
    sampradaaya: ['Vaishnava', 'Smaartha'],
    image: '/parashara_samhita.png',
    category: 'Agama',
    publication: ['Various'],
    details: 'A Pancharatra text attributed to Sage Parashara dealing with worship and rituals.'
  },
  {
    sanskrit_name: 'जयाख्य संहिता',
    english_name: 'Jayakhya Samhita',
    position: 32,
    sampradaaya: ['Vaishnava', 'Smaartha'],
    image: '/jayakhya_samhita.png',
    category: 'Agama',
    publication: ['Various'],
    details: 'A Vaishnava Agama focusing on temple architecture, mantra worship, and deity installation.'
  },
  {
    sanskrit_name: 'सूर्य सिद्धान्त',
    english_name: 'Surya Siddhanta',
    position: 33,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Jyotisha',
    publication: ['Motilal Banarsidass'],
    details: 'Ancient astronomical treatise describing the movements of celestial bodies and the worship of Surya.'
  },
  {
    sanskrit_name: 'आदित्य हृदयम्',
    english_name: 'Aditya Hridayam',
    position: 34,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Stotra',
    publication: ['Gita Press Gorakhpur'],
    details: 'Sacred hymn to Lord Surya from the Ramayana, recited by Sage Agastya to Lord Rama before his battle with Ravana.'
  },
  {
    sanskrit_name: 'सूर्योपनिषद्',
    english_name: 'Surya Upanishad',
    position: 35,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Upanishad',
    publication: ['Chowkhamba Sanskrit Pratishthan'],
    details: 'Upanishad dedicated to the worship and philosophy of Surya as the supreme deity.'
  },
  {
    sanskrit_name: 'सूर्य पुराण',
    english_name: 'Surya Purana',
    position: 36,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Purana',
    publication: ['Gita Press'],
    details: 'Purana describing the glory, legends, and worship methods of Lord Surya.'
  },
  {
    sanskrit_name: 'सौर आगम',
    english_name: 'Saura Agama',
    position: 37,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Agama',
    publication: ['Various'],
    details: 'Agamic text detailing temple rituals, mantras, and worship procedures for Surya.'
  },
  {
    sanskrit_name: 'सूर्य सहस्रनाम',
    english_name: 'Surya Sahasranama',
    position: 38,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Stotra',
    publication: ['Various'],
    details: 'Hymn praising the thousand names of Lord Surya, describing his various forms and attributes.'
  },
  {
    sanskrit_name: 'सूर्य स्तोत्र',
    english_name: 'Surya Stotra',
    position: 39,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Stotra',
    publication: ['Gita Press Gorakhpur'],
    details: 'Collection of hymns and prayers dedicated to Lord Surya for health, prosperity, and spiritual enlightenment.'
  },
  {
    sanskrit_name: 'गायत्री मन्त्र',
    english_name: 'Gayatri Mantra',
    position: 40,
    sampradaaya: ['All'],
    image: '/Shiva_wall.png',
    category: 'Mantra',
    publication: ['Various'],
    details: 'The most sacred Vedic mantra dedicated to Savitar (Surya), invoking divine illumination and wisdom.'
  },
  {
    sanskrit_name: 'सूर्य कवचम्',
    english_name: 'Surya Kavacham',
    position: 41,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Stotra',
    publication: ['Gita Press Gorakhpur'],
    details: 'A protective hymn to Lord Surya that forms a spiritual armor (kavach) around the devotee, providing protection from all evils.'
  },
  {
    sanskrit_name: 'अर्क द्वादश नाम स्तोत्र',
    english_name: 'Arka Dvadasha Nama Stotra',
    position: 42,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Stotra',
    publication: ['Various'],
    details: 'A stotra praising the twelve sacred names of Surya, each representing a different aspect of the Sun God.'
  },
  {
    sanskrit_name: 'सूर्य अष्टकम्',
    english_name: 'Surya Ashtakam',
    position: 43,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Stotra',
    publication: ['Gita Press Gorakhpur'],
    details: 'An eight-verse hymn in praise of Lord Surya, describing his divine qualities and seeking his blessings.'
  },
  {
    sanskrit_name: 'छाया उपनिषद्',
    english_name: 'Chhaya Upanishad',
    position: 44,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Upanishad',
    publication: ['Chowkhamba Sanskrit Pratishthan'],
    details: 'An Upanishad focusing on Chhaya (shadow), the consort of Surya, and the mystical aspects of solar worship.'
  },
  {
    sanskrit_name: 'सूर्य नमस्कार मन्त्र',
    english_name: 'Surya Namaskara Mantra',
    position: 45,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Mantra',
    publication: ['Various'],
    details: 'The twelve sacred mantras recited during Surya Namaskara (Sun Salutation), each honoring a different name of Surya.'
  },
  {
    sanskrit_name: 'रवि वार व्रत कथा',
    english_name: 'Ravi Vaar Vrat Katha',
    position: 46,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Kalpa/Vrat',
    publication: ['Gita Press Gorakhpur'],
    details: 'The story and rituals associated with Sunday (Ravi Vaar) fasting dedicated to Lord Surya for health and prosperity.'
  },
  {
    sanskrit_name: 'सूर्य चालीसा',
    english_name: 'Surya Chalisa',
    position: 47,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Stotra',
    publication: ['Various'],
    details: 'A forty-verse devotional hymn in praise of Lord Surya, describing his glory and seeking his divine blessings.'
  },
  {
    sanskrit_name: 'सूर्य गायत्री',
    english_name: 'Surya Gayatri',
    position: 48,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Mantra',
    publication: ['Various'],
    details: 'A specific Gayatri mantra dedicated to Surya, invoking the radiance and wisdom of the Sun God.'
  },
  {
    sanskrit_name: 'ब्रह्म पुराण (सूर्य खण्ड)',
    english_name: 'Brahma Purana (Surya Section)',
    position: 49,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Purana',
    publication: ['Gita Press Gorakhpur'],
    details: 'The Surya section of Brahma Purana contains detailed descriptions of Surya worship, temples, and the benefits of solar devotion.'
  },
  {
    sanskrit_name: 'मार्कण्डेय पुराण (सूर्य उपासना)',
    english_name: 'Markandeya Purana (Surya Worship)',
    position: 50,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Purana',
    publication: ['Motilal Banarsidass'],
    details: 'Contains important sections on Surya worship, including the famous Aditya Hridayam and other solar hymns.'
  },
  {
    sanskrit_name: 'भविष्य पुराण (सूर्य खण्ड)',
    english_name: 'Bhavishya Purana (Surya Section)',
    position: 51,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Purana',
    publication: ['Gita Press Gorakhpur'],
    details: 'A major Purana with extensive sections on Surya worship, solar calendar, and predictions related to the Sun God.'
  },
  {
    sanskrit_name: 'साम्ब पुराण',
    english_name: 'Samba Purana',
    position: 52,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Purana',
    publication: ['Various'],
    details: 'A Purana dedicated to the story of Samba, son of Krishna, and his devotion to Surya. Describes the establishment of Surya worship.'
  },
  {
    sanskrit_name: 'रेवती कल्प',
    english_name: 'Revati Kalpa',
    position: 53,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Kalpa/Vrat',
    publication: ['Chowkhamba Sanskrit Pratishthan'],
    details: 'A Kalpa text describing rituals and observances related to Surya worship, particularly on Revati nakshatra.'
  },
  {
    sanskrit_name: 'सूर्य पञ्चतन्त्र',
    english_name: 'Surya Panchatantra',
    position: 54,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Tantra',
    publication: ['Various'],
    details: 'A tantric text describing five main aspects of Surya worship including mantras, yantras, and meditation techniques.'
  },
  {
    sanskrit_name: 'अरुणोदय स्तोत्र',
    english_name: 'Arunoday Stotra',
    position: 55,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Stotra',
    publication: ['Gita Press Gorakhpur'],
    details: 'A hymn to be recited at sunrise (Arunoday), praising Surya and seeking his blessings for the day ahead.'
  },
  {
    sanskrit_name: 'प्रभात संकीर्तन',
    english_name: 'Prabhata Sankirtan',
    position: 56,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Stotra',
    publication: ['Various'],
    details: 'Morning devotional songs dedicated to Surya, traditionally sung at dawn to welcome the Sun God.'
  },
  {
    sanskrit_name: 'सूर्य कवच स्तोत्र',
    english_name: 'Surya Kavacha Stotra',
    position: 57,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Stotra',
    publication: ['Gita Press Gorakhpur'],
    details: 'A protective stotra creating a divine armor through Surya\'s grace, shielding devotees from negative energies.'
  },
  {
    sanskrit_name: 'मित्र स्तोत्र',
    english_name: 'Mitra Stotra',
    position: 58,
    sampradaaya: ['Saura', 'Smaartha'],
    image: '/Shiva_wall.png',
    category: 'Stotra',
    publication: ['Various'],
    details: 'A Vedic hymn praising Mitra, one of the twelve Adityas and a form of Surya representing friendship and contracts.'
  }


];

export async function POST() {
  try {
    await connectDB();

    // Clear existing books
    await Book.deleteMany({});

    // Insert new books with explicit field mapping to ensure all fields are saved
    const booksToInsert = books.map(book => ({
      sanskrit_name: book.sanskrit_name,
      english_name: book.english_name,
      position: book.position,
      image: book.image || '/Ganesh_wall.png',
      details: book.details || '',
      category: book.category || '',
      publication: Array.isArray(book.publication) ? book.publication : (book.publication ? [book.publication] : []),
      sampradaaya: Array.isArray(book.sampradaaya) ? book.sampradaaya : (book.sampradaaya ? [book.sampradaaya] : []),
    }));

    const insertedBooks = await Book.insertMany(booksToInsert);

    return NextResponse.json(
      {
        message: 'Books seeded successfully',
        books: insertedBooks.map(b => ({
          sanskrit_name: b.sanskrit_name,
          english_name: b.english_name,
          position: b.position,
          image: b.image,
          details: b.details,
          category: b.category,
          publication: b.publication,
        }))
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error seeding books:', error);
    return NextResponse.json(
      { error: 'Failed to seed books', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

