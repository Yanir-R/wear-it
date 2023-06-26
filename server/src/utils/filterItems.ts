import { TransformedClothingData } from "../model/ClothingItemsModel";

export const filterItems = (items: TransformedClothingData[], filters: Partial<TransformedClothingData>, recommendation?: boolean) => {
  if (recommendation) {
    return items;
  }

  const filteredItems = items.filter((item) => {
    for (const key in filters) {
      if (key === 'type' && filters[key] && item[key] !== filters[key]) {
        return false;
      }

      if (key === 'size' && filters[key]) {
        const filterSizes = filters[key] as number[];
        const itemSizes = Array.isArray(item[key]) ? item[key] as number[] : [item[key] as number];

        if (!filterSizes.some(filterSize => itemSizes.includes(filterSize))) {
          return false;
        }
      }

      if (key !== 'type' && key !== 'size' && item[key] !== filters[key]) {
        return false;
      }
    }
    return true;
  });

  return filteredItems;
};
