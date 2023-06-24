import { fetchTotalItems, getAllClothingItems } from '@/api/apiService';
import clothingStore from '@/store/clothingStore';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

export const TotalItemCounter = observer(() => {
    useEffect(() => {
        fetchTotalItems();
    }, []);

    return (
        <div>
            {Object.entries(clothingStore.totalItems)?.map(([itemType, count]) => (
                <div key={itemType}>
                    Type: {itemType}, Count: {count}
                </div>
            ))}
        </div>
    );
});
