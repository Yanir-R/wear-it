export type Clothing = 'shoes' | 'shirt' | 'pants'
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
  color: ColorTemplets | string;
  size: number | string;
  brand: ClothesDesigners;
}

export type ShirtSizes = 'S' | 'L' | 'XL' | 'XXL'
