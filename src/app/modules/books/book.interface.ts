export type IBookFilter = {
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  search?: string;
};

export type IBookFilteringItems = {
  all_genre: string[];
  all_publication_date: string[];
};
