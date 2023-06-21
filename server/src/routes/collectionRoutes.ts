import { FastifyRequest, FastifyReply } from 'fastify';
import * as clothingController from '../controller/clothingController';
import * as recommendationsController from '../controller/recommendationsController';
import {Clothing, ClothingItem, ColorTemplets} from '../model/ClothingItemsModel';

export interface GetAllClothingQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  type?: Clothing;
  color?: ColorTemplets;
  recommendation?: any
  shoeSize?:string
}

export interface GetAllClothingResponse {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  items: ClothingItem[];
}

interface Route<T> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  handler: (
    req: FastifyRequest<T>,
    reply: FastifyReply<any>,
  ) => Promise<any>;
}

const routes: Route<GetAllClothingQueryParams>[] = [
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
    url: '/api/recommendation',
    handler: recommendationsController.setRecommendation,
  },
  {
    method: 'GET',
    url: '/api/recommendation',
    handler: recommendationsController.getRecommendation,
},
{
  method: 'GET',
  url: '/api/recommendation/:shoeSize',
  handler: recommendationsController.getClothingItemsWithRecommendations,
},
];

export default routes;
