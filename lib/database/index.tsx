// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// let cached = (global as any).mongoose || { conn: null, promise: null };

// export const connectToDatabase = async () => {
//   if (cached.conn) return cached.conn;

//   if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

//   cached.promise =
//     cached.promise ||
//     mongoose.connect(MONGODB_URI, {
//       // dbName: "EventApp",
//       bufferCommands: false,
//     });

//   cached.conn = await cached.promise;

//   return cached.conn;
// };

// //this code for checking by me
// // import mongoose from "mongoose";

// // const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error("Something went wrong");
// }

// let cached = (global as any).mongoose || { conn: null, promise: null };

// // async function connectToDatabase() {
// //   if (cached.conn) {
// //     return cached.conn;
// //   }

// //   if (!cached.promise) {
// //     const opts = {
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //     };

// //     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
// //       console.log("You successfully Connected");
// //       return mongoose;
// //     });
// //   }
// //   cached.conn = await cached.promise;
// //   return cached.conn;
// // }

// // export default connectToDatabase;

//new code add by me

import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface Cached {
  conn: Connection | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: Cached = {
  conn: null,
  promise: null,
};

export const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is missing");
  }

  try {
    cached.promise =
      cached.promise ||
      mongoose.connect(MONGODB_URI, {
        // dbName: "EventApp",
        bufferCommands: false,
      });

    const mongooseInstance = await cached.promise;
    cached.conn = mongooseInstance.connection;

    return cached.conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Unable to connect to MongoDB");
  }
};
