import { ClothingItem } from "../model/ClothingItemsModel";
import { sizeMapping } from "./sizeMapping";

function convertSize(size: string | number): number[] {
    if (typeof size === 'number') {
        return [size];
    } else if (typeof size === 'string') {
        return sizeMapping[size];
    }
    throw new Error(`Invalid size: ${size}`);
}

export function findSimilarClothingSize(allItems: ClothingItem[], selectedType: string, selectedSize: number): ClothingItem[] {
    const otherTypes = allItems.filter(item => item.type !== selectedType).map(item => item.type);
    const uniqueOtherTypes = [...new Set(otherTypes)];

    let results: ClothingItem[] = [];
    uniqueOtherTypes.forEach(type => {
        const sizeRange = [selectedSize - 4, selectedSize, selectedSize + 4];
        const filteredProducts = allItems.filter(item => item.type === type && convertSize(item.size).some(size => sizeRange.includes(size)));
        console.log("🚀 ~ file: recommendationsController.ts:110 ~ findSimilarSizeProducts ~ filteredProducts:", filteredProducts)
        results.push(...filteredProducts);
    });

    return results;
}