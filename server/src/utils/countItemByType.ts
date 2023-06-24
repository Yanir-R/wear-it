export const countItemsByType = (items) => {
    const typeCounts = {};
    for (const item of items) {
        const itemType = item.type;
        typeCounts[itemType] = (typeCounts[itemType] || 0) + 1;
    }
    return typeCounts;
};