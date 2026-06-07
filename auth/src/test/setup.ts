import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Mongoose } from 'mongoose';
import { app } from '../app';

let mongo: MongoMemoryServer; // ✅ Properly typed instead of `any`

beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri(); // ✅ getUri is not async, no need for await

    await mongoose.connect(mongoUri); // ✅ Pass the uri variable, not the method reference
  
});

beforeEach(async () => {
    const collections = await mongoose.connection.db!.collections(); // ✅ Non-null assertion
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});