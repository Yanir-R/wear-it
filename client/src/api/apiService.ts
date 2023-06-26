import clothingStore from "@/store/clothingStore";
import { ClothingItemsResponse, ClothingItem } from "@/types";
import { appendQueryParams } from "@/utils/appendQueryParams";

interface GetAllClothingItemsOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Partial<ClothingItem>;
  recommendation?: boolean;
  size?: number | number[];
  type?: string | number;
  color?: string;
}

export const getAllClothingItems = async (options: GetAllClothingItemsOptions = {}): Promise<ClothingItemsResponse> => {
  const url = new URL(`http://localhost:3001/api/clothes`);
  const { page, limit, sortBy, sortOrder, size, type, color, recommendation } = options;

  const queryParams = { page, limit, sortBy, sortOrder, size: Array.isArray(size) ? size.join(",") : size, type, color, recommendation };

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined) appendQueryParams(url, { [key]: value });
  });

  const response = await fetch(url.toString());
  const data: ClothingItemsResponse = await response.json();
  return data;
};

export const fetchTotalItems = async () => {
  try {
    const response = await getAllClothingItems();
    const totalItems = response.totalItems;
    clothingStore.setTotalItems(totalItems);
  } catch (error) {
    console.error('Error fetching total items:', error);
  }
};

export const fetchClothingItem = async (id: number): Promise<ClothingItem> => {
  const response = await fetch(`http://localhost:3001/api/clothes/${id}`);
  const data: ClothingItem = await response.json();
  return data;
};
