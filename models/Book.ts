import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  sanskrit_name: string;
  english_name: string;
  sampradaaya: string[];
  position: number; // Position on the library page (1-9)
  image?: string; // Image URL/path for the book
  details?: string; // Book details/description
  category?: string; // Category of the book
  publication?: string | string[]; // Publication name(s) of the book - can be single string or array
  createdAt?: Date;
  updatedAt?: Date;
}

const BookSchema: Schema = new Schema(
  {
    sanskrit_name: {
      type: String,
      required: true,
    },
    english_name: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
      unique: true,
      min: 1,
      max: 1000000000000000000000000000000000000000000000000000000000000000000,
    },
    image: {
      type: String,
      default: '/book.webp', // Default book image
    },
    details: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: '',
    },
    publication: {
      type: Schema.Types.Mixed,
      default: [],
    },
    sampradaaya:{
      type: [String],
      default: [],

    }
  },
  {
    timestamps: true,
    strict: true, // Ensure all fields are saved
  }
);

// Delete the model if it exists to force schema refresh
if (mongoose.models.Book) {
  delete mongoose.models.Book;
}

const Book = mongoose.model<IBook>('Book', BookSchema);

export default Book;

