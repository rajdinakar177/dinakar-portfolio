import mongoose from "mongoose";

/**
 * Cached Mongoose connection for serverless environments (Vercel, etc).
 *
 * In serverless, every API route invocation can spin up a fresh Node.js
 * process. Without caching, that means opening a new MongoDB connection
 * on every request — which exhausts your connection pool fast under any
 * real traffic. Caching the connection promise on `global` survives
 * across invocations within the same warm serverless instance and
 * across hot reloads in development.
 *
 * Pattern follows Vercel's official Next.js + Mongoose recommendation:
 * https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose
 */

declare global {
  var _mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const cached = global._mongooseCache ?? { conn: null, promise: null };
global._mongooseCache = cached;

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set in the environment.");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset so the next request tries again instead of reusing a
    // rejected promise forever.
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}