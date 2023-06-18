type Clothing = 'shoes' | 'shirt' | 'pants'
type ColorTemplets = 'black' | 'white' | 'red' | 'green' | 'pink'
type ClothesDesigners = 'Tommy Hilfiger' | 'Calvin Klein' | 'GAP' | 'Lacoste' | 'Lee Cooper'

export interface ClothingItems {
    id: number;
    type: Clothing;
    color: ColorTemplets;
    size: number;
    brand: ClothesDesigners;
}