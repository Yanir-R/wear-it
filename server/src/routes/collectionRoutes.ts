import { FastifyRequest, FastifyReply } from 'fastify';
import * as clothingController from '../controller/clothingController';
import {
  Clothing,
  ClothingItems,
  ColorTemplets,
} from '../model/ClothingItemsModel';

export interface GetAllClothingQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  type?: Clothing;
  color?: ColorTemplets;
}

export interface GetAllClothingResponse {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  items: ClothingItems[];
}

interface Route {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  handler: (
    req: FastifyRequest<{ Querystring: GetAllClothingQueryParams }>,
    reply: FastifyReply<any>,
  ) => Promise<any>;
}

const routes: Route[] = [
  {
    method: 'GET',
    url: '/api/clothes',
    handler: clothingController.getAllClothing,
  },
  {
    method: 'GET',
    url: '/api/clothes/:id',
    handler: clothingController.getClothingItemById,
  },
  {
    method: 'POST',
    url: '/api/clothes',
    handler: clothingController.addNewClothingItems,
  },
  {
    method: 'PUT',
    url: '/api/clothes/:id',
    handler: clothingController.updateClothingItem,
  },
  // {
  //   method: "DELETE",
  //   url: "/api/clothes/:id",
  //   handler: clothingController.deleteClothingItem,
  // },
];

export default routes;
