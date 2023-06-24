import ClothingStore from '@/store/clothingStore';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite'
import { ReactSVG } from 'react-svg'
import { getSvgPath } from '@/utils/getSvgPath';
const ClothingItemsList = observer(() => {
  useEffect(() => {
    ClothingStore.fetchItems();
  }, []);

  return (
    <div>
      {ClothingStore.isFiltered && (
        <button onClick={ClothingStore.resetFilters}>Show All</button>
      )}
      <button onClick={() => ClothingStore.setFilterType('pants')}>Filter Pants</button>
      <button onClick={() => ClothingStore.setFilterType('shirt')}>Filter Shirts</button>
      <button onClick={() => ClothingStore.setFilterType('shoes')}>Filter Shoes</button>

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
          onChange={(e) => ClothingStore.setFilterSize(Number(e.target.value))}
        />
      </div>
      {ClothingStore.items?.map(item => (
        <div key={item.id}>
          <ReactSVG src={getSvgPath(item.type)} />
          <div>Brand: {item.brand}</div>
          <div>Size: {item.size}</div>
          <div>Color: {item.color}</div>
          <button>Select</button>
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

export default ClothingItemsList;

