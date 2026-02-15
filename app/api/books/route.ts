import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Book from '@/models/Book';

export async function GET(request: Request) {
  try {
    await connectDB();

    // Get search params
    const { searchParams } = new URL(request.url);
    const sampradaaya = searchParams.get('sampradaaya');

    let query = {};

    if (sampradaaya) {
      // Split by comma and trim whitespace
      const tags = sampradaaya.split(',').map(tag => tag.trim());
      // Filter books that match ANY of the provided tags
      query = { sampradaaya: { $in: tags } };
    }

    const books = await Book.find(query).sort({ position: 1 }).exec();

    return NextResponse.json({ books }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching books:', error);
    const errorMessage = error?.message || 'Failed to fetch books';

    // Return empty array if MongoDB is not configured (so page still works with fallback)
    if (errorMessage.includes('MONGODB_URI')) {
      console.warn('MongoDB not configured. Returning empty array. Books will use fallback names.');
      return NextResponse.json({ books: [] }, { status: 200 });
    }

    return NextResponse.json(
      { error: errorMessage, details: error?.toString() },
      { status: 500 }
    );
  }
}

