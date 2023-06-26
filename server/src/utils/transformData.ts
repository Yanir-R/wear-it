import { sizeMapping } from "./sizeMapping";

export interface IncomingData {
    id: number;
    type: string;
    color: string;
    size: string | number;
    brand: string;
}

export function transformData(data: IncomingData[]): any {
    return data.map(item => {
        let size: number | number[] | null = null;

        if (typeof item.size === 'number') {
            size = item.size;
        } else if (typeof item.size === 'string') {
            size = sizeMapping[item.size] || null;
        }

        return {
            id: item.id,
            type: item.type,
            color: item.color,
            size: size,
            brand: item.brand
        };
    });
}
