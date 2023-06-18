import boom from 'boom';
import fetch from 'node-fetch';
import { ClothingItems } from '../model/ClothingItemsModel';
import { FastifyReply, FastifyRequest } from 'fastify';
import {
  GetAllClothingQueryParams,
  GetAllClothingResponse,
} from '../routes/collectionRoutes';
import { API_URL } from '../config';

export const getAllClothing = async (
  req: FastifyRequest<{ Querystring: GetAllClothingQueryParams }>,
  reply: FastifyReply<any>,
) => {
  try {
    const { page, limit, sortBy, sortOrder, type, color } = req.query;

    // Set default values if not provided
    const pageNumber = Number(page) || 1;
    const pageSize = Number(limit) || 10;
    const sortField = sortBy || 'id';
    const sortOrderValue = sortOrder === 'desc' ? -1 : 1;

    // Prepare query parameters for filtering
    const filters: Partial<ClothingItems> = {};
    if (type) filters.type = type;
    if (color) filters.color = color;

    // Fetch the data from the API URL
    const res = await fetch(API_URL.mockData);
    const allItems: ClothingItems[] = await res.json();

    // Apply filtering
    const filteredItems = allItems.filter((item) => {
      for (const key in filters) {
        if (item[key] !== filters[key]) {
          return false;
        }
      }
      return true;
    });

    // Apply sorting
    filteredItems.sort((a, b) => {
      const valueA = a[sortField as keyof ClothingItems];
      const valueB = b[sortField as keyof ClothingItems];
      if (valueA < valueB) {
        return -1 * sortOrderValue;
      }
      if (valueA > valueB) {
        return 1 * sortOrderValue;
      }
      return 0;
    });

    // Apply pagination
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = filteredItems.slice(startIndex, endIndex);

    const result: GetAllClothingResponse = {
      totalItems: filteredItems.length,
      currentPage: pageNumber,
      pageSize: pageSize,
      totalPages: Math.ceil(filteredItems.length / pageSize),
      items: paginatedItems,
    };

    return result.items;
  } catch (err) {
    throw boom.boomify(err);
  }
};

export const updateClothingItem = async (req, reply) => {
  try {
    const id = req.params.id;
    const res = await fetch(`${API_URL.mockData}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' },
    });

    const result: ClothingItems = await res.json();
    return result;
  } catch (err) {
    throw boom.boomify(err);
  }
};

export const getClothingItemById = async (req, reply) => {
  try {
    const id = Number(req.params.id);
    const res = await fetch(API_URL.mockData);
    ``;
    const allItems: ClothingItems[] = await res.json();
    const result = allItems.find((item) => item.id === id);
    if (result) {
      return result;
    } else {
      throw new Error('Item not found');
    }
  } catch (err) {
    throw boom.boomify(err);
  }
};

export const addNewClothingItems = async (req, reply) => {
  try {
    const res = await fetch(`${API_URL.mockData}`, {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' },
    });
    const new_item: ClothingItems = await res.json();
    return new_item;
  } catch (err) {
    throw boom.boomify(err);
  }
};

export const deleteClothingItem = async (req, reply) => {
  try {
    const id = req.params.id;
    await fetch(`${API_URL.mockData}/${id}`, {
      method: 'DELETE',
    });
    return { Message: `${id} deleted` };
  } catch (err) {
    throw boom.boomify(err);
  }
};
