import OpenAI from 'openai';
import { ParsedProduct } from '../types';
import { AppError } from '../utils/errorHandler';

export const extractProductData = async (
  html: string,
  url: string,
  apiKey: string
): Promise<ParsedProduct> => {
  try {
    const openai = new OpenAI({ apiKey });

    const prompt = `
    You're an AI assistant specialized in extracting product information from HTML.
    Extract all possible product data and price from the following HTML and structure it according to the JSON schema below.
    
    For the schema:
    1. Don't include properties that aren't found in the HTML
    2. Add any additional product-specific attributes to the "attributes" object
    3. Try to identify color options, size options, materials, dimensions, etc.
    4. Format price or amount as a number without currency symbols
    5. If multiple prices or amounts are present (sale price or amount, original price or amount), include them in the appropriate fields
    6. Make sure you include price / amount in the json data you will provide
    
    HTML:
    \`\`\`
    ${truncateHtml(html)}
    \`\`\`
    
    URL: ${url}
    
    Return a JSON object with this structure:
    {
      "url": "product url",
      "title": "product title",
      "description": "the summary of product description without the html tags",
      "brand": "brand name if available",
      "category": "product category if available",
      "price": {
        "amount": numericPrice,
        "currency": "currency code if available",
        "compareAt": originalPriceIfOnSale,
        "onSale": booleanIndicatingIfOnSale
      },
      "images": ["array", "of", "image", "urls"],
      "attributes": {
        // All product-specific attributes like:
        "colors": ["array of color options"],
        "sizes": ["array of size options"],
        "material": "material info",
        // Any other product attributes found
      }
    }
    
    Return only the valid JSON object with no additional text or explanation.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini-search-preview",
      messages: [
        { role: "system", content: "You extract structured product data from HTML." },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    
    if (!content) {
      throw new AppError(
        'Failed to extract product data: Empty response from OpenAI',
        'EXTRACTION_ERROR',
        500
      );
    }


    const parsedData = JSON.parse(content) as ParsedProduct;


    return {
      ...parsedData,
      url,
      metadata: {
        extractedAt: new Date().toISOString(),
        sourceUrl: url
      }
    };
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new AppError(
        'Failed to parse OpenAI response',
        'PARSING_ERROR',
        500,
        { message: error.message }
      );
    }
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      `OpenAI extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      'OPENAI_ERROR',
      500
    );
  }
};
function truncateHtml(html: string): string {
  const maxLength = 20000;
  
  if (html.length <= maxLength) {
    return html;
  }
  
  const cutPoint = html.lastIndexOf('>', maxLength);
  return cutPoint > 0 ? html.substring(0, cutPoint + 1) : html.substring(0, maxLength);
}