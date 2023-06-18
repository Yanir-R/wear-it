import * as clothingController from "../controller/clothingController";
import { ClothingItems } from "../model/ClothingItemsModel";

interface Route {
    method: "GET" | "POST" | "PUT" | "DELETE";
    url: string;
    handler: (req: any, reply: any) => Promise<ClothingItems | ClothingItems[] >;
}

const routes: Route[] = [
  {
    method: "GET",
    url: "/api/clothes",
    handler: clothingController.getAllClothing,
  },
  {
    method: "GET",
    url: "/api/clothes/:id",
    handler: clothingController.getClothingItemById,
  },
  {
    method: "POST",
    url: "/api/clothes",
    handler: clothingController.addNewClothingItems,
  },
  {
    method: "PUT",
    url: "/api/clothes/:id",
    handler: clothingController.updateClothingItem,
  },
  // {
  //   method: "DELETE",
  //   url: "/api/clothes/:id",
  //   handler: clothingController.deleteClothingItem,
  // },
];

export default routes;
