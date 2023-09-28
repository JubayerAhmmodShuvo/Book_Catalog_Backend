import { SortOrder } from 'mongoose';
import { IPagination } from '../interfaces/pagination';

type IPaginationMap = IPagination & {
  skip: number;
  sortObject: { [key: string]: SortOrder };
};

export const pagination_map = (
  pagination_data: Partial<IPagination>,
  default_sort_by: string
): IPaginationMap => {
  const page = pagination_data.page ? Number(pagination_data.page) : 1;
  const size = pagination_data.size ? Number(pagination_data.size) : 10;
  const skip = (page - 1) * size;

  const sortBy = pagination_data.sortBy || default_sort_by;
  const sortOrder = pagination_data.sortOrder || 'desc';

  const sortObject = { [sortBy]: sortOrder };

  return {
    page,
    size,
    skip,
    sortBy,
    sortOrder,
    sortObject,
  };
};
