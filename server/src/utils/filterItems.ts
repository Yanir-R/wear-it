import { ClothingItem } from "../model/ClothingItemsModel";
export const filterItems = (items: ClothingItem[], filters: Partial<ClothingItem>, recommendation?: boolean) => {
  if (recommendation) {
    return items;
  }

  const filteredItems = items.filter((item) => {

    for (const key in filters) {
      if (key === 'type' && filters[key] && item[key] !== filters[key]) {
        return false; // Filter based on type if the filter is specified
      }
      if (key !== 'type' && item[key] !== filters[key]) {

        return false; // Filter based on other properties
      }
    }
    return true;
  });

  return filteredItems;
};
