import { ClothingItem } from "../model/ClothingItemsModel";

export const sortItems = (items: ClothingItem[], sortField: keyof ClothingItem, sortOrderValue: number) => {
  return items.sort((a, b) => {
    const valueA = a[sortField];
    const valueB = b[sortField];
    if (valueA < valueB) {
      return -1 * sortOrderValue;
    }
    if (valueA > valueB) {
      return 1 * sortOrderValue;
    }
    return 0;
  });
};
