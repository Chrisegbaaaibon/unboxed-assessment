export interface ParseProductRequest {
   url: string;
   openaiApiKey: string;
 }
 
 export interface ProductAttribute {
   [key: string]: any;
 }
 
 export interface ParsedProduct {
   url: string;
   title: string;
   description?: string;
   brand?: string;
   category?: string;
   price?: {
     amount?: number;
     currency?: string;
     compareAt?: number;
     onSale?: boolean;
   };
   images?: string[];
   attributes: {
     [key: string]: any;
   };
   metadata?: {
     extractedAt: string;
     sourceUrl: string;
     confidence?: number;
   };
 }
 
 export interface ApiError {
   message: string;
   code: string;
   status: number;
   details?: any;
 }