export type Clothing = 'shoes' | 'shirt' | 'pants';
export type ColorTemplets = 'black' | 'white' | 'red' | 'green' | 'pink';
export type ClothesDesigners =
  | 'Tommy Hilfiger'
  | 'Calvin Klein'
  | 'GAP'
  | 'Lacoste'
  | 'Lee Cooper';

export interface ClothingItem {
  id: number;
  type: Clothing | string;
  color: ColorTemplets;
  size: number
  brand: ClothesDesigners;
}

export type ShirtSizes = 'S' | 'L' | 'XL' | 'XXL'
