import express from 'express';
import { parseProduct, parseProductGemini } from './controllers/product';
import { validateParseRequest } from '../utils/validation';

const router = express.Router();

router.post('/parse-product', validateParseRequest, parseProduct);
router.post('/parse-product-gemini', parseProductGemini);

export default router;