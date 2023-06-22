import { ClothingItemsResponse, ClothingItem } from "@/types";

interface GetAllClothingItemsOptions {
  pageNumber?: number;
  pageSize?: number;
  sortField?: string;
  sortOrderValue?: string;
  filters?: Partial<ClothingItem>;
  recommendation?: boolean;
  shoeSize?: number;
}
export const getAllClothingItems = async (options: GetAllClothingItemsOptions = {}): Promise<ClothingItemsResponse> => {
  const url = new URL(`http://localhost:3001/api/clothes`);

  Object.entries(options).forEach(([key, value]) => {
    if (value !== undefined) {
      if (key === 'filters') {
        Object.entries(value).forEach(([filterKey, filterValue]) => {
          if (filterValue !== undefined) {
            url.searchParams.append(filterKey, filterValue!.toString());
          }
        });
      } else {
        url.searchParams.append(key, value.toString());
      }

    }
  });

  const response = await fetch(url.toString());
  const data: ClothingItemsResponse = await response.json();
  return data;
};

export const fetchClothingItem = async (id: string): Promise<ClothingItem> => {
  const response = await fetch(`http://localhost:3001/api/clothes/${id}`);
  const data: ClothingItem = await response.json();
  return data;
};

export const setRecommendation = async (recommendation: any) => {
  const response = await fetch('http://localhost:3001/api/recommendation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recommendation),
  });
  const data = await response.json();
  return data;
};

export const fetchRecommendations = async () => {
  const response = await fetch('http://localhost:3001/api/recommendation');
  const data = await response.json();
  return data;
};

export const fetchClothingItemsWithRecommendations = async (shoeSize: string) => {
  const response = await fetch(`http://localhost:3001/api/recommendation/${shoeSize}`);
  const data = await response.json();
  return data;
};
