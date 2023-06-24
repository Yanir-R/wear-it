import { apiEndpoints } from '../dataFetcher/apiConfig';
import { fetchData } from '../utils/fetchData'
import { parseQueryParams } from '../utils/parseQueryParams'
import { filterItems } from '../utils/filterItems';
import { paginateItems } from '../utils/paginateItems';
import { sortItems } from '../utils/sortItems';
import { httpRequest } from '../utils/httpRequests';
import { FastifyRequest } from 'fastify';
import { GetAllClothingQueryParams } from '../routes/collectionRoutes';
import { findSimilarClothingSize } from '../utils/findSimilarClothingSize';
import { countItemsByType } from '../utils/countItemByType';

export const getAllClothing = async (req: FastifyRequest<{ Querystring: GetAllClothingQueryParams }>) => {
  try {
    const { pageNumber, pageSize, sortField, sortOrderValue, filters, recommendation, selectedItems, type, size } = parseQueryParams(req.query);

    const allItems = await fetchData(apiEndpoints.mockData);

    let result;

    if (recommendation && selectedItems) {
      const recommendedItems = findSimilarClothingSize(allItems, type, parseInt(size as string));
      result = {
        currentPage: pageNumber,
        items: recommendedItems,
        pageSize,
        totalItems: countItemsByType(recommendedItems), // Update count based on recommended items
        totalPages: Math.ceil(recommendedItems.length / pageSize),
      };
    } else {
      const filteredItems = filterItems(allItems, filters, recommendation);
      const sortedItems = sortItems(filteredItems, sortField, sortOrderValue);
      const paginatedItems = paginateItems(sortedItems, pageNumber, pageSize);

      result = {
        currentPage: pageNumber,
        items: paginatedItems,
        pageSize,
        totalItems: countItemsByType(allItems),
        totalPages: Math.ceil(filteredItems.length / pageSize),
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
