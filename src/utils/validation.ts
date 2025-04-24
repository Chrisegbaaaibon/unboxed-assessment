import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

const parseProductSchema = z.object({
  url: z.string().url('Invalid URL format'),
  openaiApiKey: z.string().min(1, 'OpenAI API key is required')
    .regex(/^sk-/, 'Invalid OpenAI API key format')
});


export const validateParseRequest = (req: Request, res: Response, next: NextFunction) => {
  try {
    parseProductSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ 
        error: {
          message: 'Validation failed',
          details: error.errors
        }
      });
    } else {
      next(error);
    }
  }
};