import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError } from '@aytix/common';
import jwt from 'jsonwebtoken';
import { validateRequest } from '@aytix/common';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {  // ← add next
    try {                                                         // ← add try/catch
      const { email } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new BadRequestError('Email in use');
      }
      const user = User.build({ email, password: req.body.password });
      await user.save();

      const userJwt = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_KEY!
      );

      req.session = { jwt: userJwt };
      res.status(201).send(user);
    } catch (err) {
      next(err);                                                  // ← forward to error handler
    }
  }
);

export { router as signUpRouter };