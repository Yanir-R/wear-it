import { fetchClothingItem, getAllClothingItems } from "@/api/apiService";
import { Clothing, ClothingItem } from "@/types";
import { makeAutoObservable, runInAction } from "mobx";

class ClothingStore {
  items: ClothingItem[] = [];
  colorFilter = '';
  sizeFilter: number[] = [];
  currentPage = 1;
  typeFilter: Clothing = '';
  isLoading = false;
  pageSize = 10;
  totalPages = 0;
  totalItems = { shirt: 0, pants: 0, shoes: 0 }
  isFiltered = false;
  selectedItems: ClothingItem[] = [];
  filteredItems: ClothingItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchItems = async () => {
    runInAction(() => {
      this.isLoading = true;
      this.items = [];
      this.totalItems = { shirt: 0, pants: 0, shoes: 0 };
    });

    try {
      const response = await getAllClothingItems({
        page: this.currentPage,
        limit: this.pageSize,
        color: this.colorFilter,
        type: (this.isFiltered ? this.typeFilter : ''),
      });

      runInAction(() => {
        if (response) {
          // Filter out selected items
          this.items = response.items?.filter((item) => !this.selectedItems.some((selectedItem) => selectedItem.id === item.id));

          // Apply size filter if it is set
          if (this.sizeFilter.length > 0) {
            this.items = this.items.filter((item) => {
              // Check if the item size is included in the filter size array
              return Array.isArray(item.size) ? item.size.some((size) => this.sizeFilter.includes(size)) : this.sizeFilter.includes(item.size);
            });
          }

          this.totalItems = response.totalItems;
          this.totalPages = response.totalPages;
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  setTotalItems(items: any) {
    this.totalItems = items;
  }

  setFilterColor = (color: string) => {
    this.colorFilter = color;
    this.isFiltered = true;
  };

  setFilterSize = (size: number[]) => {
    this.sizeFilter = size;
    this.isFiltered = true;
    this.applyFilters();
  };

  applyFilters() {
    let filteredItems = this.items;

    if (this.sizeFilter.length > 0) {
      filteredItems = filteredItems.filter(item =>
        Array.isArray(item.size) ? item.size.some(size => this.sizeFilter.includes(size)) : this.sizeFilter.includes(item.size)
      );
    }

    this.filteredItems = filteredItems;
  }


  setFilterType = (type: string) => {
    this.typeFilter = type;
    this.currentPage = 1;
    this.isFiltered = true;
    this.fetchItems();
  };

  resetFilters = () => {
    this.colorFilter = '';
    this.sizeFilter = [];
    this.typeFilter = '';
    this.currentPage = 1;
    this.isFiltered = false;

    if (this.selectedItems.length > 0) {
      this.selectedItems = [];
    }

    this.fetchItems();
  };


  handlePageChange = (newPage: number) => {

    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      runInAction(() => {
        this.fetchItems();
      })
    }
  };

  selectItem = async (itemId: number) => {
    try {
      this.isLoading = true;

      // Check if the item is already selected
      const alreadySelected = this.selectedItems.find(item => item.id === itemId);

      if (alreadySelected) {
        // If the item is already selected, remove it from the list
        runInAction(() => {
          this.selectedItems = this.selectedItems.filter(item => item.id !== itemId);
        });
      } else {
        // Otherwise, fetch the item and add it to the selectedItems
        const selectedItem = await fetchClothingItem(itemId);
        if (selectedItem) {
          runInAction(() => {
            this.selectedItems.push(selectedItem);
            this.typeFilter = selectedItem.type;

            // Set the sizeFilter only if the item is not already selected
            if (!alreadySelected) {
              this.sizeFilter = Array.isArray(selectedItem.size)
                ? selectedItem.size
                : [selectedItem.size];
            }
          });
          await this.fetchItems();
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

}

export default new ClothingStore();

