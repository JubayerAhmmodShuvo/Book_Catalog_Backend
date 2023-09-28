import { book_search_condition_keys } from './book.constant';
import { IBookFilter } from './book.interface';

export const GetWhereConditions = (filters: IBookFilter) => {
  const { search, minPrice, maxPrice, ...filterData } = filters;
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: book_search_condition_keys.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (minPrice !== undefined) {
    andConditions.push({
      price: {
        gte: Number(minPrice), 
      },
    });
  }

  if (maxPrice !== undefined) {
    andConditions.push({
      price: {
        lte: Number(maxPrice), 
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  return andConditions?.length > 0 ? { AND: andConditions } : {};
};
