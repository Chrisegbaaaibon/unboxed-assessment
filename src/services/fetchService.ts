import axios from 'axios';
import { AppError } from '../utils/errorHandler';

export const fetchHtml = async (url: string): Promise<string> => {
  try {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Cache-Control': 'max-age=0'
    };

    const response = await axios.get(url, { headers, timeout: 10000 });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new AppError(
          `Failed to fetch URL: ${error.response.status} ${error.response.statusText}`,
          'FETCH_ERROR',
          500,
          { status: error.response.status }
        );
      } else if (error.request) {
        throw new AppError(
          'Failed to fetch URL: No response received',
          'FETCH_ERROR',
          500
        );
      }
    }
    throw new AppError(
      `Failed to fetch URL: ${error instanceof Error ? error.message : 'Unknown error'}`,
      'FETCH_ERROR',
      500
    );
  }
};