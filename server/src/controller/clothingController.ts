import { ClothingItem } from '../model/ClothingItemsModel';
import { FastifyRequest } from 'fastify';
import { GetAllClothingQueryParams } from '../routes/collectionRoutes';
import { apiEndpoints } from '../dataFetcher/apiConfig';
import { fetchData } from '../utils/fetchData'
import { parseQueryParams } from '../utils/parseQueryParams'
import { filterItems } from '../utils/filterItems';
import { paginateItems } from '../utils/paginateItems';
import { sortItems } from '../utils/sortItems';
import { httpRequest } from '../utils/httpRequests';
import { getClothingItemsWithRecommendations } from './recommendationsController';

export const getAllClothing = async (req: FastifyRequest<{ Querystring: GetAllClothingQueryParams }>) => {
  try {
    const { pageNumber, pageSize, sortField, sortOrderValue, filters, recommendation, shoeSize } = parseQueryParams(req.query);
    let result;
    if (recommendation && shoeSize) {
      result = await getClothingItemsWithRecommendations(shoeSize);
    } else {
      const allItems: ClothingItem[] = await fetchData(apiEndpoints.mockData);
      const filteredItems = filterItems(allItems, filters);
      const sortedItems = sortItems(filteredItems, sortField, sortOrderValue);
      const paginatedItems = paginateItems(sortedItems, pageNumber, pageSize);

      result = {
        totalItems: sortedItems.length,
        currentPage: pageNumber,
        pageSize,
        totalPages: Math.ceil(sortedItems.length / pageSize),
        items: paginatedItems,
      };
    }

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};


export const getClothingItemById = async (req, reply) => {
  try {
    const id = Number(req.params.id);
    const allItems = await httpRequest(apiEndpoints.mockData, { method: 'GET' });
    const result = allItems.find((item) => item.id === id);
    if (!result) {
      throw new Error('Item not found');
    }
    return result;
  } catch (err) {
    throw new Error(err.message)
  }
};
