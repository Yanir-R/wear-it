import { apiEndpoints } from "../dataFetcher/apiConfig";
import { ClothingItem } from "../model/ClothingItemsModel";
import { fetchData } from "../utils/fetchData";
import { getRecommendedItems } from "../utils/getRecommendedItems";

export interface ClothingItemsWithRecommendations {
  items: ClothingItem[];
  recommendedShirtSizes: ClothingItem[];
  recommendedPantsSizes: ClothingItem[];
}

const recommendations = {};

export const setRecommendation = async (req) => {
  const { shoeSize, recommendedShirtSize } = req.body;

  // Fetch all clothing items
  const allItems:ClothingItem[] = await fetchData(apiEndpoints.mockData);

  // Check if the provided shoeSize exists in the mockData
  const validShoeSizes = allItems
    .filter(item => item.type === 'shoes')
    .map(item => item.size);

  if (!validShoeSizes.includes(shoeSize)) {
    throw new Error(`Invalid shoe Size. Valid shoe sizes are: ${validShoeSizes.join(', ')}`);
  }

  // Check if the provided recommendedShirtSize exists in the mockData
  const validShirtSizes = allItems
    .filter(item => item.type === 'shirt')
    .map(item => item.size);

  if (!validShirtSizes.includes(recommendedShirtSize)) {
    throw new Error(`Invalid recommendedShirtSize. Valid shirt sizes are: ${validShirtSizes.join(', ')}`);
  }

  // Store the recommendation in the recommendations object
  recommendations[shoeSize.toString()] = recommendedShirtSize;

  return { message: 'Recommendation set successfully.' };
};

export const getClothingItemsWithRecommendations = async (req) => {
  try {
    const shoeSize = Number(req.params.shoeSize);

    // Fetch all clothing items
    const allItems: ClothingItem[] = await fetchData(apiEndpoints.mockData);

    // Filter the items based on the chosen shoe size
    const filteredShoes = allItems.filter(item => item.type === 'shoes' && item.size === shoeSize);

    // Determine the recommended items based on the filtered shoe sizes
    let recommendedItems: ClothingItem[] = [];
    if (filteredShoes.length > 0) {
      const filteredData = allItems.filter(item => item.type === 'shirt' || item.type === 'pants');
      recommendedItems = getRecommendedItems(filteredShoes, filteredData);
    }

    // Separate the recommended shirts and pants
    const recommendedShirts = recommendedItems.filter(item => item.type === 'shirt');
    const recommendedPants = recommendedItems.filter(item => item.type === 'pants');

    // Return the clothing items along with the recommendations
    const result: ClothingItemsWithRecommendations = {
      items: [...filteredShoes],
      recommendedShirtSizes: recommendedShirts,
      recommendedPantsSizes: recommendedPants,
    };

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getRecommendation = async (req) => {
  const { shoeSize } = req.params;
  const recommendedShirtSize = recommendations[shoeSize?.toString()];
  return { recommendedSize: recommendedShirtSize || 'No recommendation found for this size.' };
};




  
  