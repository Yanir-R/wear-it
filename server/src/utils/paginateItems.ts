import { ClothingItem } from "../model/ClothingItemsModel";

export const paginateItems = (items: ClothingItem[], pageNumber: number, pageSize: number) => {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return items.slice(startIndex, endIndex);
};
