import ClothingStore from '@/store/clothingStore';
import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite'
import { ClothingItemComponent } from '@/components/clothingItem';
import Link from 'next/link'
const ClothingItemsListPage = observer(() => {
  useEffect(() => {
    ClothingStore.fetchItems();
  }, [ClothingStore.fetchItems, ClothingStore.selectedItems.length]);

  return (
    <div>
      <div className='flex justify-between items-center mb-12'>
        <h2 className='font-mono  border-sky-200 text-cyan-600'>Clothing List Page</h2>
        <Link legacyBehavior href="/">
          <button className='inline-block px-2 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-sky-200 text-cyan-600 hover:border-cyan-600 hover:bg-transparent hover:text-cyan-600 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500'>
            Return  &#10150;
          </button>
        </Link>

      </div>
      <div className='flex justify-center min-w-min'>
        {ClothingStore.isFiltered && (
          <button className='mx-2 py-1.5 px-1.5 text-xs rounded-lg text-center bg-sky-200 text-cyan-600 align-baseline uppercase leading-none' onClick={ClothingStore.resetFilters}>All</button>
        )}
        <button className={`mx-0.5 py-1.5 px-1.5 text-xs rounded-lg text-center bg-sky-200 text-cyan-600 align-baseline font-bold uppercase leading-none ${ClothingStore.typeFilter === 'pants' ? 'font-extrabold' : 'font-normal'}`}
          onClick={() => {
            ClothingStore.setFilterType('pants');
          }}>
          Pants
        </button>
        <button className={`mx-0.5 py-1.5 px-1.5 text-xs rounded-lg text-center bg-sky-200 text-cyan-600 align-baseline font-bold uppercase leading-none ${ClothingStore.typeFilter === 'shirt' ? 'font-bold' : 'font-normal'}`}
          onClick={() => {
            ClothingStore.setFilterType('shirt');
          }}>
          Shirts
        </button>
        <button className={`mx-0.5 py-1.5 px-1.5 text-xs rounded-lg text-center bg-sky-200 text-cyan-600 align-baseline font-bold uppercase leading-none ${ClothingStore.typeFilter === 'shoes' ? 'font-bold' : 'font-normal'}`}
          onClick={() => {
            ClothingStore.setFilterType('shoes');
          }}>
          Shoes
        </button>
      </div>


      <div className='my-6 flex justify-between'>
        <input
          type="text"
          className="w-1/3 mr-2 text-sm leading-5.6 block appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-2 py-1 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
          placeholder="Filter by color"
          value={ClothingStore.colorFilter}
          onChange={(e) => ClothingStore.setFilterColor(e.target.value)}
        />
        <input
          type="number"
          className="w-1/3 text-sm leading-5.6 block appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-2 py-1 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
          placeholder="Filter by size"
          value={ClothingStore.sizeFilter.join(',')}
          onChange={(e) => { ClothingStore.setFilterSize(e.target.value.split(',').map(Number)) }}
        />
        <div>
          <button className='ml-2 inline-block px-8  py-2 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-purple-200 text-cyan-600 hover:border-cyan-600 hover:bg-transparent hover:text-cyan-600 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500'
            onClick={() => { ClothingStore.fetchItems(); }}>
            Search
          </button>
        </div>
      </div>

      {ClothingStore.items?.map(item => (
        <div key={item.id} className='mb-4 border rounded-lg  border-pink-400'>
          <ClothingItemComponent item={item} />
          <div className="flex items-center justify-center mt-2 mb-2">
            <button className='inline-block px-8 py-2 my-4 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-purple-200 text-cyan-600 hover:border-cyan-600 hover:bg-transparent hover:text-cyan-600 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500'
              onClick={(() => ClothingStore.selectItem(item.id))}>
              {ClothingStore.selectedItems.find(selectedItem => selectedItem.id === item.id) ? 'Remove' : 'Select'}
            </button>
          </div>
        </div>
      ))}

      <div className='px-2 flex items-center justify-between'>
        <button className='inline-block px-6 py-3 font-bold text-center uppercase align-middle transition-all bg-transparent border rounded-lg cursor-pointer border-fuchsia-200 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md hover:scale-102 active:opacity-85 hover:shadow-soft-xs text-fuchsia-500 hover:border-cyan-600 hover:bg-transparent hover:text-cyan-600 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500'
          onClick={() => ClothingStore.handlePageChange(ClothingStore.currentPage - 1)}>&#9664;</button>
        <div className=''>
          <span className='text-center text-cyan-600'>{ClothingStore.currentPage} of {ClothingStore.totalPages}</span>
        </div>
        <button className='inline-block px-6 py-3 font-bold text-center uppercase align-middle transition-all bg-transparent border rounded-lg cursor-pointer border-fuchsia-200 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md hover:scale-102 active:opacity-85 hover:shadow-soft-xs text-fuchsia-500 hover:border-cyan-600 hover:bg-transparent hover:text-cyan-600 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500'
          onClick={() => ClothingStore.handlePageChange(ClothingStore.currentPage + 1)}>&#9654;</button>
      </div>

      <h1>selectedItems:</h1>
      {ClothingStore.selectedItems?.map(item => (
        <div key={item.id} className=" border border-red-200" >
          <ClothingItemComponent item={item} />
          <div className="flex items-center justify-center mt-2 mb-2">
            <button className='inline-block  font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-sky-200 text-cyan-600 hover:border-cyan-600 hover:bg-transparent hover:text-cyan-600 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500'
              onClick={(() => ClothingStore.selectItem(item.id))}>
              {ClothingStore.selectedItems.find(selectedItem => selectedItem.id === item.id) ? 'Remove' : 'Select'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
});

export default ClothingItemsListPage;
