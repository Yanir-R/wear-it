import Link from 'next/link';
import clothingStore from "@/store/clothingStore"

export const SavedItemsDetailsComponent = () => {

    return (
        <div>
            Saved Sets: <Link href='/savedClothes'>{clothingStore.selectedItems.length}</Link>
        </div>
    )
}