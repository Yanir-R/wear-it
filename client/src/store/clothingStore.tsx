import { fetchClothingItem, getAllClothingItems } from "@/api/apiService";
import { Clothing, ClothingItem } from "@/types";
import { makeAutoObservable, runInAction } from "mobx";

class ClothingStore {
  items: ClothingItem[] = [];
  colorFilter = '';
  sizeFilter = 0
  currentPage = 1;
  typeFilter: Clothing = '';
  isLoading = false;
  pageSize = 10;
  totalPages = 0;
  totalItems = { shirt: 0, pants: 0, shoes: 0 }
  isFiltered = false;
  selectedItems: ClothingItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchItems() {
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
        size: this.sizeFilter || undefined,
        type: (this.isFiltered ? this.typeFilter : ''),
      });

      runInAction(() => {
        if (response) {
          // Filter out selected items
          this.items = response.items?.filter((item) => !this.selectedItems.some((selectedItem) => selectedItem.id === item.id));
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

  getLastThreeSelectedItems() {
    const selectedItemsData = this.selectedItems.slice(-3).map(item => ({
      type: item.type,
      size: item.size
    }));

    const types = selectedItemsData.map(item => item.type);
    const recommendation = types.length === 3 && new Set(types).size === 3;

    return {
      type: selectedItemsData[0]?.type,
      size: selectedItemsData[0]?.size,
      recommendation
    };
  }

  setTotalItems(items: any) {
    this.totalItems = items;
  }

  setFilterColor = (color: string) => {
    this.colorFilter = color;
    this.isFiltered = true;
    this.fetchItems();
  };

  setFilterSize = (size: number) => {
    this.sizeFilter = size;
    this.isFiltered = true;
    this.fetchItems();

  };


  setFilterType = (type: string) => {
    this.typeFilter = type;
    this.currentPage = 1;
    this.isFiltered = true;
    this.fetchItems();
  };

  resetFilters = () => {
    this.colorFilter = '';
    this.sizeFilter = 0;
    this.typeFilter = '';
    this.currentPage = 1;
    this.isFiltered = false;
    this.fetchItems();
  };

  handlePageChange = (newPage: number) => {

    if (newPage >= 1) {
      this.currentPage = newPage;
      runInAction(() => {
        this.fetchItems();
      })
    }
  };
  selectItem = async (itemId: number) => {
    try {
      this.isLoading = true;
      const selectedItem = await fetchClothingItem(itemId);
      if (selectedItem) {
        runInAction(() => {
          this.selectedItems.push(selectedItem);
          this.typeFilter = selectedItem.type;
          this.sizeFilter = selectedItem.size;
        });
        await this.fetchItems();
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

