# MongoDB Setup Guide

## Quick Fix for "Failed to fetch books" Error

The error occurs because MongoDB connection string is not configured. Follow these steps:

## Step 1: Create `.env.local` file

Create a file named `.env.local` in the `frontend` folder with the following content:

```
MONGODB_URI=your_mongodb_connection_string_here
```

## Step 2: Get MongoDB Connection String

### Option A: MongoDB Atlas (Cloud - Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new cluster (free tier available)
4. Click "Connect" on your cluster
5. Choose "Connect your application"
6. Copy the connection string
7. Replace `<password>` with your database password
8. Replace `<dbname>` with your database name (e.g., `talking_lib`)

Example format:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/talking_lib?retryWrites=true&w=majority
```

### Option B: Local MongoDB

If you have MongoDB installed locally:
```
MONGODB_URI=mongodb://localhost:27017/talking_lib
```

## Step 3: Seed the Database

After setting up the connection string, seed the database with initial book data:

### Option A: Using API Endpoint (Recommended)

1. Start your Next.js dev server: `npm run dev`
2. Open your browser and go to: `http://localhost:3000/api/books/seed`
3. Or use curl/Postman to send a POST request:
   ```bash
   curl -X POST http://localhost:3000/api/books/seed
   ```

### Option B: Using MongoDB Compass

1. Connect to your MongoDB database using MongoDB Compass
2. Create a database named `talking_lib` (or your chosen name)
3. Create a collection named `books`
4. Insert the following documents:

```json
[
  { "name": "रामायण", "position": 1 },
  { "name": "महाभारत", "position": 2 },
  { "name": "ऋग्वेद", "position": 3 },
  { "name": "यजुर्वेद", "position": 4 },
  { "name": "सामवेद", "position": 5 },
  { "name": "अथर्ववेद", "position": 6 }
]
```

## Step 4: Restart Dev Server

After creating `.env.local`, restart your Next.js dev server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Troubleshooting

- **Error persists**: Check that `.env.local` is in the `frontend` folder (not root)
- **Connection timeout**: Make sure your IP is whitelisted in MongoDB Atlas (if using cloud)
- **Authentication failed**: Double-check your username and password in the connection string
- **Page still shows fallback names**: Make sure you've seeded the database (Step 3)

## Note

The library page will work with fallback book names even without MongoDB configured, but to fetch from the database, you need to complete the setup above.

