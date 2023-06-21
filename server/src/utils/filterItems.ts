import { ClothingItem } from "../model/ClothingItemsModel";

export const filterItems = (items: ClothingItem[], filters: Partial<ClothingItem>) => {
  return items.filter((item) => {
    for (const key in filters) {
      if (item[key] !== filters[key]) {
        return false;
      }
    }
    return true;
  });
};
