export interface IndustryIdentifier {
  type: string;
  identifier: string;
}

export interface BookVolumeInfo {
  title: string;
  authors?: string[];
  imageLinks?: {
    thumbnail?: string;
  };
  description?: string;
  publishedDate?: string;
  language?: string;
  industryIdentifiers?: IndustryIdentifier[];
}

export interface Book {
  id: string; // Bok-ID som vi får från API:et
  volumeInfo: BookVolumeInfo; // All information om boken
}
