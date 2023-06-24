export type Clothing = 'shirt' | 'pants' | 'shoes' | string
export type ColorTemplets = 'black' | 'white' | 'red' | 'green' | 'pink' | string
export type ClothesDesigners =
  | 'Tommy Hilfiger'
  | 'Calvin Klein'
  | 'GAP'
  | 'Lacoste'
  | 'Lee Cooper';

export interface ClothingItem {
  id: number;
  type: Clothing;
  color: ColorTemplets;
  size: number;
  brand: ClothesDesigners;
}

export interface ClothingItemsResponse {
  currentPage: number;
  items: ClothingItem[];
  pageSize: number;
  totalItems: { shoes: number, shirt: number, pants: number };
  totalPages: number;
}
