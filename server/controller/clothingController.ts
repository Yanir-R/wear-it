import boom from 'boom';
import fetch from 'node-fetch';
import { API_URL } from '../config';
import { ClothingItems } from '../model/ClothingItemsModel';

export const getAllClothing = async (req, reply) => {
  try {
    console.log(`Fetching data from: ${API_URL.mockData}`);
    const res = await fetch(`${API_URL.mockData}`, {});
    if (!res.ok) {
        throw new Error(`Fetch request failed with status: ${res.status}`);
    }
    const results: ClothingItems[] = await res.json();
    return results;
  } catch (err) {
    console.log(`Error fetching data: ${err.message}`);
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
    const allItems: ClothingItems[] = await res.json();
    const result = allItems.find(item => item.id === id);
    if (result) {
      return result;
    } else {
      throw new Error("Item not found");
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
