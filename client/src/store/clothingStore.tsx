import { getAllClothingItems } from "@/api/apiService";
import { Clothing, ClothingItem } from "@/types";
import { makeAutoObservable } from "mobx";

class ClothingStore {
  items: ClothingItem[] = [];
  colorFilter = '';
  sizeFilter = 0;
  currentPage = 1;
  typeFilter: Clothing = '';
  isLoading = false;
  pageSize = 10;
  totalPages = 0
  totalItems = 0;

  constructor() {
    makeAutoObservable(this);
  }
  async fetchItems() {
    try {
      this.isLoading = true;
      this.items = [];

      const response = await getAllClothingItems({
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        filters: { type: this.typeFilter, color: this.colorFilter },
      });

      if (response) {
        this.items = response.items;
        this.totalItems = response.totalItems;
        this.totalPages = response.totalPages;
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }


  setFilterColor = (color: string) => {
    this.colorFilter = color;
    this.fetchItems();

  }

  setFilterSize = (size: number) => {
    this.sizeFilter = size;
    this.fetchItems();

  }

  setFilterType = (type: string) => {
    this.typeFilter = type;
    this.fetchItems();
  }


  handlePageChange = (newPage: number) => {
    if (newPage >= 1) {
      this.currentPage = newPage;
      this.fetchItems();
    }
  }
}

export default new ClothingStore();
