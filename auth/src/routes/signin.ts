import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password is required'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => { // ← add next
    try {                                                        // ← wrap in try
      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        throw new BadRequestError('Invalid credentials');
      }

      const passwordsMatch = await Password.compare(existingUser.password, password);
      if (!passwordsMatch) {
        throw new BadRequestError('Invalid credentials');
      }

      const userJwt = jwt.sign(
        { id: existingUser.id, email: existingUser.email },
        process.env.JWT_KEY!
      );

      req.session = { jwt: userJwt };
      res.status(200).send(existingUser);

    } catch (err) {
      next(err); // ← manually forward error to errorHandler
    }
  }
);

export { router as signInRouter };