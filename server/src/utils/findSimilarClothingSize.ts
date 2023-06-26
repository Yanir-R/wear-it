import { TransformedClothingData } from "../model/ClothingItemsModel";
import { SizeMapping } from "./sizeMapping";



export function findSimilarClothingSize(
    allItems: TransformedClothingData[],
    selectedType: string,
    selectedSize: number | number[] | null,
    sizeMapping: SizeMapping
): TransformedClothingData[] {
    const otherTypes = allItems.filter(item => item.type !== selectedType).map(item => item.type);
    const uniqueOtherTypes = [...new Set(otherTypes)];

    let results: TransformedClothingData[] = [];

    uniqueOtherTypes.forEach(type => {
        const sizeRange = selectedSize instanceof Array ? selectedSize : [selectedSize - 4, selectedSize, selectedSize + 4];
        const filteredProducts = allItems.filter(item => {
            if (item.type === type) {
                let itemSizeRange: number[] = [];
                if (typeof item.size === 'number') {
                    itemSizeRange = sizeMapping[item.size.toString()] || [item.size, item.size];
                } else if (Array.isArray(item.size)) {
                    item.size.forEach((size) => {
                        const sizeRange = sizeMapping[size.toString()] || [size, size];
                        itemSizeRange.push(...sizeRange);
                    });
                }
                return itemSizeRange.some(size => sizeRange.includes(size));
            }
            return false;
        });
        results.push(...filteredProducts);
    });

    return results;
}