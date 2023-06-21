import { ClothingItem } from "../model/ClothingItemsModel";
import { GetAllClothingQueryParams } from "../routes/collectionRoutes";

export const parseQueryParams = (queryParams: GetAllClothingQueryParams) => {
  const { page, limit, sortBy, sortOrder, type, color, recommendation, shoeSize } = queryParams;

  const pageNumber = Number(page) || 1;
  const pageSize = Number(limit) || 10;
  const sortField = sortBy as keyof ClothingItem || 'id';
  const sortOrderValue = sortOrder === 'desc' ? -1 : 1;

  const filters: Partial<ClothingItem> = {};
  if (type) filters.type = type;
  if (color) filters.color = color;

  return { pageNumber, pageSize, sortField, sortOrderValue, filters, recommendation, shoeSize };
};

