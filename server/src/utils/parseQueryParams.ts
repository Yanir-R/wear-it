import { ClothingItem } from "../model/ClothingItemsModel";
import { GetAllClothingQueryParams } from "../routes/collectionRoutes";
import { convertSize } from "./convertSize";

export const parseQueryParams = ({
  page = 1,
  limit = 10,
  sortBy = 'id',
  sortOrder = 'asc',
  type,
  size,
  color,
  recommendation,
  selectedItems
}: GetAllClothingQueryParams) => {
  const pageNumber = Number(page) || 1;
  const pageSize = Number(limit);
  const sortField = sortBy as keyof ClothingItem;
  const sortOrderValue = sortOrder === 'desc' ? -1 : 1;

  const filters: any = {};

  if (type) filters.type = type;
  if (color) filters.color = color;
  if (typeof size === 'number' && size !== 0) {
    filters.size = [size];
  } else if (typeof size === 'string') {
    filters.size = convertSize(size);
  }


  return { pageNumber, pageSize, sortField, sortOrderValue, filters, recommendation, type, size, selectedItems };
};


