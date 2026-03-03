import mongoose from 'mongoose';

/**
 * MongoDB connection helper for Next.js (App Router)
 * Uses a global cache to avoid creating multiple connections during HMR.
 * Expects `process.env.MONGODB_URI` to be set in .env.local when connecting.
 * Note: do not throw at module load time to keep Next build safe when env is not present.
 */

type MongooseCache = {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  var _mongooseCache: MongooseCache | undefined;
}

if (!global._mongooseCache) {
  global._mongooseCache = { conn: null, promise: null };
}

async function connectDB() {
  const cache = global._mongooseCache ?? (global._mongooseCache = { conn: null, promise: null });

  if (cache.conn) {
    return cache.conn;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  if (!cache.promise) {
    const opts = {
      // Recommended options can be added here
      bufferCommands: false
    } as mongoose.ConnectOptions;

    cache.promise = mongoose.connect(uri, opts).then(m => m);
  }

  cache.conn = await cache.promise;
  return cache.conn;
}

export default connectDB;
