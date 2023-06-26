import ClothingStore from "@/store/clothingStore";
import { ClothingItem } from "@/types"
import { getSvgPath } from "@/utils/getSvgPath";
import { ReactSVG } from "react-svg"
interface ClothingItemsProps {
    item: Partial<ClothingItem>;
}

export const ClothingItemComponent = (props: ClothingItemsProps) => {
    const { item } = props;
    return (
        <>
            <div className="relative">
                <div className="flex justify-center mt-4">
                    <ReactSVG src={getSvgPath(item.type as string)} />
                </div>
            </div>
            <div className="flex-auto px-3 pt-6">
                <div className="py-4">
                    <p className="mx-0.5 py-1.5 w-fit px-1.5 text-xs rounded-lg text-center bg-sky-200 text-cyan-600 align-baseline  uppercase leading-none">{item.type}</p>
                </div>
                <div>
                    <div className="flex gap-0.5">
                        <h3 className="font-mono">Brand:</h3>
                        <h3 className="font-mono">{item.brand}</h3>
                    </div>
                    <div className="flex gap-3 ">
                        <h3 className="font-mono">Size:</h3>
                        <h3 className="font-mono">{[item.size?.[0], item.size?.[1], item.size?.[2], item.size?.[3]].filter(Boolean).join(', ') || item.size}</h3>
                    </div>
                    <div className="flex gap-0.5">
                        <h3 className="font-mono">Color:</h3>
                        <h3 className="font-mono">{item.color}</h3>
                    </div>
                </div>
            </div>

        </>

    )
}

