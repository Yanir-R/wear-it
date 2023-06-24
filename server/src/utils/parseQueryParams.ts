import { ClothingItem } from "../model/ClothingItemsModel";
import { GetAllClothingQueryParams } from "../routes/collectionRoutes";
export const parseQueryParams = ({
  page = 1,
  limit = 10,
  sortBy = 'id',
  sortOrder = 'asc',
  type,
  size,
  color,
  recommendation,
}: GetAllClothingQueryParams & { type?: string; size?: string }) => {
  const pageNumber = Number(page) || 1
  const pageSize = Number(limit)
  const sortField = sortBy as keyof ClothingItem;
  const sortOrderValue = sortOrder === 'desc' ? -1 : 1;

  const filters: Partial<ClothingItem> = {};
  if (type && type !== 'all') filters.type = type;
  if (color && color !== 'all') filters.color = color;

  return { pageNumber, pageSize, sortField, sortOrderValue, filters, recommendation, type, size };
};


