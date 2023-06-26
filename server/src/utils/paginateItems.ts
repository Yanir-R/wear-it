import { TransformedClothingData } from "../model/ClothingItemsModel";

export const paginateItems = (items: TransformedClothingData[], pageNumber: number, pageSize: number): TransformedClothingData[] => {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return items.slice(startIndex, endIndex);
};
