import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  function signin(): Promise<string[]>;
}

let mongo: MongoMemoryServer | undefined;

jest.setTimeout(120000);

beforeAll(async () => {
  process.env.JWT_KEY = 'test-secret-key';
  process.env.NODE_ENV = 'test';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db!.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = async () => {
  const payload = {
    id: '1v768hnfc5678',
    email: 'test@test.com'
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  const sessionJSON = JSON.stringify({ jwt: token });

  const base64 = Buffer.from(sessionJSON).toString('base64');
  return [base64];
};