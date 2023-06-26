import { TransformedClothingData } from "../model/ClothingItemsModel";
import { GetAllClothingQueryParams } from "../routes/collectionRoutes";
import { sizeMapping } from "./sizeMapping";

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
  const sortField = sortBy as keyof TransformedClothingData;
  const sortOrderValue = sortOrder === 'desc' ? -1 : 1;

  const filters: any = {};

  if (type) filters.type = type;
  if (color) filters.color = color;
  if (size) {

    if (typeof size === 'string') {
      filters.size = [sizeMapping[size]];
    } else if (Array.isArray(size)) {
      filters.size = size.map(s => Number(s));
    } else if (typeof size === 'number' && size !== 0) {
      filters.size = [size];
    }
  }

  return { pageNumber, pageSize, sortField, sortOrderValue, filters, recommendation, type, size, selectedItems };
};


