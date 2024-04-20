import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateCreateUserData = [
  body('firstName').trim().notEmpty().withMessage('First Name is required'),
  body('lastName').trim().notEmpty().withMessage('Last Name is required'),
  body('email').trim().isEmail().notEmpty().withMessage('Email is required'),
  body('password').trim().notEmpty().withMessage('Password is required'),
  body('roleId').trim().notEmpty().withMessage('Role is required'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        status: 'fail',
        message: errors.array()
      })
    }
    next();
  }
]

export const validateLoginUserData = [
  body('email').trim().isEmail().notEmpty().withMessage('Email is required'),
  body('password').trim().notEmpty().withMessage('Password is required'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        status: 'fail',
        message: errors.array()
      })
    }
    next();
  }
]
