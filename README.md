# Product Data Extraction API

A RESTful API that extracts structured product data from any product URL using the OpenAI API.

## API Endpoint

- **URL:** [Your deployed API URL here]
- **Method:** POST
- **Endpoint:** `/api/parse-product-openai`

## Sample Request

```json
{
  "url": "https://example.com/product/123",
  "openaiApiKey": "sk-..."
}
```

## Sample Response

```json
{
  "url": "https://example.com/product/123",
  "title": "Example Product",
  "category": "Electronics",
  "attributes": {
    "colorOptions": ["Black", "White", "Silver"],
    "sizeOptions": ["Small", "Medium", "Large"],
    "specifications": {
      "weight": "250g",
      "dimensions": "12 x 8 x 2 cm"
    }
  },
  "rawPrice": 29.99,
  "brand": "Example Brand",
  "description": "A high-quality example product with multiple features"
}
```

## Local Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd unboxed-assessment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create a .env file with the following content:
   PORT=3000
   NODE_ENV=development
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Implementation Details

### Prompt Design

The prompt for OpenAI's GPT-4 is designed to:
- Clearly define the task (extract product data)
- Provide a specific output schema for consistency
- Allow flexibility for different product types
- Focus on structured, filterable attributes

### Parsing Strategy

1. **Fetch HTML**: We fetch the raw HTML from the provided URL.
2. **Truncate if needed**: To handle token limits, we truncate the HTML to 50,000 characters if necessary.
3. **Extract with GPT-4**: We send the HTML to OpenAI's GPT-4 model with our prompt.
4. **Parse response**: We parse the JSON response and ensure all required fields are present.
5. **Return structured data**: We return a standardized product data object.

### Schema Design

The schema is designed to be:
- **Flexible**: Using nested objects and dynamic keys allows accommodation of any product type
- **Structured**: Consistent top-level fields ensure basic compatibility across products
- **Queryable**: Attributes are organized to facilitate filtering and searching
- **Extensible**: The schema allows adding additional fields as needed without breaking existing integrations

## Trade-offs and Future Improvements

Given the time constraints, the following trade-offs were made:

1. **Error handling**: Basic error handling is implemented, but could be enhanced with more specific error types and recovery strategies.
2. **Caching**: No caching mechanism is implemented yet, which could improve performance and reduce API costs.
3. **HTML processing**: Currently, we truncate HTML if it's too long, but a smarter approach would be to extract only relevant sections.
4. **Rate limiting**: There's no rate limiting implemented to prevent abuse.
5. **Testing**: Limited test coverage due to time constraints.

Future improvements could include:
- Implementing a caching layer to reduce OpenAI API calls
- Adding more robust error handling and retries
- Creating a smarter HTML pre-processor to extract only product-relevant sections
- Adding user authentication and rate limiting
- Supporting batch processing of multiple product URLs