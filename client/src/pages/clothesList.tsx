import ClothingStore from '@/store/clothingStore';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite'
import { ClothingItemComponent } from '@/components/clothingItem';

const ClothingItemsListPage = observer(() => {
  useEffect(() => {
    ClothingStore.fetchItems();
  }, [ClothingStore.fetchItems, ClothingStore.selectedItems.length]);


  return (
    <div>
      {ClothingStore.isFiltered && (
        <button onClick={ClothingStore.resetFilters}>Show All</button>
      )}
      <button
        onClick={() => {
          ClothingStore.setFilterType('pants');
        }}
        style={{ fontWeight: ClothingStore.typeFilter === 'pants' ? 'bold' : 'normal' }}
      >
        Filter Pants
      </button>
      <button
        onClick={() => {
          ClothingStore.setFilterType('shirt');
        }}
        style={{ fontWeight: ClothingStore.typeFilter === 'shirt' ? 'bold' : 'normal' }}
      >
        Filter Shirts
      </button>
      <button
        onClick={() => {
          ClothingStore.setFilterType('shoes');
        }}
        style={{ fontWeight: ClothingStore.typeFilter === 'shoes' ? 'bold' : 'normal' }}
      >
        Filter Shoes
      </button>


      <div>
        <input
          type="text"
          placeholder="Filter by color"
          value={ClothingStore.colorFilter}
          onChange={(e) => ClothingStore.setFilterColor(e.target.value)}
        />
        <input
          type="number"
          placeholder="Filter by size"
          value={ClothingStore.sizeFilter ?? ''}
          onChange={(e) => { ClothingStore.setFilterSize(Number(e.target.value)) }}
        />
      </div>
      {ClothingStore.items?.map(item => (
        <div key={item.id}>
          <ClothingItemComponent item={item} />
          <button onClick={(() => ClothingStore.selectItem(item.id))}>Select</button>
        </div>
      ))}
      <h1>selectedItems:</h1>
      {ClothingStore.selectedItems?.map(item => (
        <div key={item.id}>
          <ClothingItemComponent item={item} />
          <button onClick={(() => ClothingStore.selectItem(item.id))}>Select</button>
        </div>
      ))}
      <div>
        <button onClick={() => ClothingStore.handlePageChange(ClothingStore.currentPage - 1)}>Previous</button>
        <span>Page {ClothingStore.currentPage} of {ClothingStore.totalPages}</span>
        <button onClick={() => ClothingStore.handlePageChange(ClothingStore.currentPage + 1)}>Next</button>
      </div>
    </div>
  );
});

export default ClothingItemsListPage;
