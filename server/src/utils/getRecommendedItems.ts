import { ClothingItem } from "../model/ClothingItemsModel";
import { shirtSizes } from "./getPlausibleShirtSizeForShoeSize";

export const getRecommendedItems = (
  filteredShoes: ClothingItem[],
  filteredData: ClothingItem[]
): ClothingItem[] => {
  const shoeSize = filteredShoes[0]?.size;

  return filteredData.filter((item) => {
    if (item.type === 'shirt') {
      return typeof item.size === 'string' && shirtSizes[shoeSize]?.includes(item.size);
    }
    if (item.type === 'pants') {
      const minPantsSize = shoeSize - 3;
      const maxPantsSize = shoeSize + 3;
      return typeof item.size === 'number' && item.size >= minPantsSize && item.size <= maxPantsSize;
    }
    return false;
  });
};

