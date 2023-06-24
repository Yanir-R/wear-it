import { ClothingItem } from "@/types"
import { getSvgPath } from "@/utils/getSvgPath";
import { ReactSVG } from "react-svg"
interface ClothingItemsProps {
    item: Partial<ClothingItem>
}

export const ClothingItemComponent = (props: ClothingItemsProps) => {
    const { item } = props;
    return (
        <div key={item.id}>
            <ReactSVG src={getSvgPath(item.type as string)} />
            <div>Brand: {item.brand}</div>
            <div>Size: {item.size}</div>
            <div>Color: {item.color}</div>
        </div>
    )
}
