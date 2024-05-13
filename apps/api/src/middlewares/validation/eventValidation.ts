import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import fs from 'fs'

export const validateCreateEventData = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('desc').trim().notEmpty().withMessage('Descriptioin is required'),
  body('start').trim().notEmpty().toDate().withMessage('Start event is required'),
  body('lastRegister').trim().notEmpty().withMessage('Last register is required'),
  body('price').trim().isNumeric().notEmpty().withMessage('Price is required'),
  body('attendee').trim().isNumeric().notEmpty().withMessage('Atendee is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('type').trim().notEmpty().withMessage('Type is required'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { file } = req
      fs.unlinkSync(file?.path!)
      return res.status(400).send({
        status: 'fail',
        message: errors.array(),
        filePath: file?.path
      })
    }
    next();
  }
]
