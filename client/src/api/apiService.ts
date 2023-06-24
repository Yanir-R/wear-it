import { ClothingItemsResponse, ClothingItem } from "@/types";
import { appendQueryParams } from "@/utils/appendQueryParams";
import { url } from "inspector";

interface GetAllClothingItemsOptions {
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrderValue?: string;
  filters?: Partial<ClothingItem>;
  recommendation?: boolean;
  shoeSize?: number;
}


export const getAllClothingItems = async (options: GetAllClothingItemsOptions = {}): Promise<ClothingItemsResponse> => {
  const url = new URL(`http://localhost:3001/api/clothes`);

  const { page, limit, filters } = options;
  if (page !== undefined) appendQueryParams(url, { page });
  if (limit !== undefined) appendQueryParams(url, { limit });
  if (filters) appendQueryParams(url, filters);

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
