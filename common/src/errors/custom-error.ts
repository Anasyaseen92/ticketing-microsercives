export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message?: string) {
    super(message);
    // ← remove Object.setPrototypeOf from here
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}