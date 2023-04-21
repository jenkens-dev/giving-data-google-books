export interface BookData {
  id: string;
  volumeInfo: {
    title: string;
    categories?: string[];
    publisher?: string;
    authors?: string[];
    description: string;
    infoLink: string;
    imageLinks?: {
      thumbnail: string;
    };
    publishedDate: string;
  };
}
