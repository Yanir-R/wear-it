export function convertSize(size: string | number): number {
    if (typeof size === 'number') {
        return size;
    } else if (typeof size === 'string') {
        const parsedSize = parseInt(size);
        if (!isNaN(parsedSize)) {
            return parsedSize;
        }
    }
    throw new Error(`Invalid size: ${size}`);
}
