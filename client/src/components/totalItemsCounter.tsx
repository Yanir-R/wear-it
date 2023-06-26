import { fetchTotalItems, getAllClothingItems } from '@/api/apiService';
import clothingStore from '@/store/clothingStore';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ReactSVG } from 'react-svg'
import { getSvgPath } from '@/utils/getSvgPath';


export const TotalItemCounter = observer(() => {
    useEffect(() => {
        fetchTotalItems();
    }, []);
    return (
        <div className="relative flex flex-col  bg-clip-border">
            <div className="flex-auto px-0 pt-0 pb-2">
                <div >
                    <table className=" mb-0 align-top border-gray-200 text-slate-500 overflow-y-hidden">
                        <thead>
                            <tr>
                                <th className="font-bold  text-left uppercase align-middle bg-transparent border-b  shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap border-sky-200 text-cyan-600 opacity-70">Types</th>
                                <th className=" font-bold pr-2 text-left uppercase align-middle bg-transparent border-b  shadow-none text-xxs border-b-solid tracking-none font-mono  border-sky-200 text-cyan-600 opacity-70">Items</th>
                                <th className=" font-bold  pl-2 text-left uppercase align-middle bg-transparent border-b  shadow-none text-xxs border-b-solid tracking-none font-mono  border-sky-200 text-cyan-600 opacity-70">Count</th>
                                <th className=" font-bold  pl-2 text-left uppercase align-middle bg-transparent border-b  shadow-none text-xxs border-b-solid tracking-none font-mono  border-sky-200 text-cyan-600 opacity-70">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(clothingStore.totalItems)?.map(([itemType, count]) => (
                                <tr key={itemType} >
                                    <td className="align-middle bg-transparent border-b border-sky-200 shadow-transparent ">
                                        <div className='flex justify-center py-4'>
                                            <ReactSVG src={getSvgPath(itemType as string)} className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-sm rounded-xl" />
                                        </div>
                                    </td>
                                    <td className="p-2 align-middle bg-transparent border-b  border-sky-200 whitespace-nowrap shadow-transparent">
                                        <div className='flex justify-center py-4'>
                                            {itemType}
                                        </div>
                                    </td>
                                    <td className="p-2 align-middle bg-transparent border-b border-sky-200 whitespace-nowrap shadow-transparent">
                                        <div className='flex justify-center py-4'>
                                            {count}
                                        </div>
                                    </td>
                                    <td className="p-2 leading-normal text-center align-middle bg-transparent border-b border-sky-200 text-sm  shadow-transparent">
                                        <span className="bg-gradient-to-tl from-blue-600 to-purple-400 px-1 text-xs rounded-2 py-0.5 inline-block text-center align-baseline font-bold uppercase leading-none text-white">Available</span>
                                    </td>
                                </tr>

                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
});