# Product Data Extraction API

A RESTful API that extracts structured product data from any product URL using the OpenAI API.

## API Endpoint

- **URL:** [https://unboxed-assessment.onrender.com]
- **Method:** POST
- **Endpoint:** `/api/parse-product`

## Sample Request

```json
{
    "url": "https://now-time.biz/products/issue-1-whirlpool?variant=42480670539836",
    "openaiApiKey": "sk-...."
}
```

## Sample Response

```json
{
    "url": "https://now-time.biz/products/issue-1-whirlpool?variant=42480670539836",
    "title": "Issue 1 Whirlpool",
    "description": "Now-Time is a research and publishing project coordinating a multiplicity of historical lines oriented towards present activity. We aim to relink design,¹ critical consciousness, and social-historical perspective. With collaborators we create new works that move through the maze of what has been,² and transform those old works that speak indirectly but lucidly to the present situation.³\n\n¹ Design defined as courses of action aimed at changing existing situations into preferred ones.\n\n² Truth, questions and ideas in art / stories / evidence passed from the past, pleasant and unpleasant.\n\n³ The necessity of overcoming the icy waters of egotistical calculation.\n\nT̶h̶e̶ ̶f̶l̶o̶w̶i̶n̶g̶ ̶o̶f̶ ̶t̶i̶m̶e̶ The swirling of time\n\nWhat is...is dependent on what's in circulation. What stands, what is about to disappear, what should be no longer. Renewing whats been dragged to the bottom of the vortex. The what = useful ideas, questions, and truths in art / stories / evidence passed from the past.",
    "brand": "Now-Time",
    "price": {
        "amount": 40,
        "currency": "USD"
    },
    "images": [
        "//now-time.biz/cdn/shop/files/White.gif?v=1737750961",
        "//now-time.biz/cdn/shop/files/White_Front.jpg?v=1737750961",
        "//now-time.biz/cdn/shop/files/White_Back.jpg?v=1737750961"
    ],
    "attributes": {
        "sizes": [
            "S",
            "M",
            "L",
            "XL",
            "XXL"
        ],
        "material": "100% Ring Spun Cotton",
        "sleeve_type": "Short Sleeve",
        "fabric_weight": "6.1oz",
        "dye": "Garment Dyed",
        "color": "White"
    },
    "metadata": {
        "extractedAt": "2025-04-24T14:39:31.774Z",
        "sourceUrl": "https://now-time.biz/products/issue-1-whirlpool?variant=42480670539836"
    }
}
```

## Local Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <https://github.com/Chrisegbaaaibon/unboxed-assessment.git>
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

The prompt for OpenAI is designed to:
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

Future improvements could include:
- Implementing a caching layer to reduce OpenAI API calls
- Adding more robust error handling and retries
- Creating a smarter HTML pre-processor to extract only product-relevant sections