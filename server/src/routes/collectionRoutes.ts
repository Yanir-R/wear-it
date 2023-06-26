import { FastifyRequest, FastifyReply } from 'fastify';
import * as clothingController from '../controller/clothingController';
import { Clothing, TransformedClothingData, ColorTemplets } from '../model/ClothingItemsModel';

export interface GetAllClothingQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  type?: Clothing | string;
  color?: ColorTemplets | string;
  recommendation?: any
  size?: number | number[]
  selectedItems: TransformedClothingData[]
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
  }
];

export default routes;
