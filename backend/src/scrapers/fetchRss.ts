// Type definitions for RSS scraping results
export interface Movie {
  title: string;
  link: string;
}

export interface MovieDetails extends Movie {
  image: string;
  synopsis: string;
  trailer: string | null;
  sessions: string[];
}
