import { Request, Response, NextFunction } from "express";
import { ParseProductRequest, ParsedProduct } from "../../types";
import { fetchHtml } from "../../services/fetchService";
import { extractProductData } from "../../services/openaiService";
import { extractProductDataGemini } from "../../services/geminiService";

export const parseProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { url, openaiApiKey }: ParseProductRequest = req.body;

    console.log(`Processing request for URL: ${url}`);

    const html = await fetchHtml(url);

    const productData = await extractProductData(html, url, openaiApiKey);

    res.status(200).json(productData);
  } catch (error) {
    next(error);
  }
};

export const parseProductGemini = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { url, openaiApiKey }: ParseProductRequest = req.body;

    console.log(`Processing request for URL: ${url}`);

    const html = await fetchHtml(url);

    const productData = await extractProductDataGemini(html, url, openaiApiKey);

    res.status(200).json(productData);
  } catch (error) {
    next(error);
  }
};
