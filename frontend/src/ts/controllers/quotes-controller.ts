// Stub quotes controller - no backend quotes support
import { QuoteLength } from "@rapidkey/schemas/configs";

export type Quote = {
  text: string;
  source: string;
  length: number;
  id: number;
  group?: number;
  language?: string;
  britishText?: string;
  textSplit?: string[];
};

export type QuoteWithTextSplit = Quote & { textSplit: string[] };

const QuotesController = {
  async getQuotes(
    _language: string,
    _quoteLength?: QuoteLength[]
  ): Promise<Quote[]> {
    return [];
  },

  getQuoteById(_id: number): Quote | undefined {
    return undefined;
  },

  getRandomQuote(): Quote | null {
    return null;
  },

  getRandomFavoriteQuote(_language: string): Quote | null {
    return null;
  },

  isQuoteFavorite(_quote: Quote): boolean {
    return false;
  },
};

export default QuotesController;
