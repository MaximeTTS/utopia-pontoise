// Définitions des interfaces pour la structure des données
export interface Movie {
  title: string;
  description: string;
  pubDate: string;
  link: string;
}

export interface MovieDetails extends Movie {
  image: string;
  synopsis: string;
  trailer: string | null;
  sessions: string[];
}
