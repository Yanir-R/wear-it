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

export const getAllClothing = async (req: FastifyRequest<{ Querystring: GetAllClothingQueryParams }>) => {
  try {
    const { pageNumber, pageSize, sortField, sortOrderValue, filters, recommendation, type, size } = parseQueryParams(req.query);
    let result;
    const allItems = await fetchData(apiEndpoints.mockData);

    if (recommendation && type && size) {
      result = findSimilarClothingSize(allItems, type, parseInt(size));
    } else {
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
