import { apiEndpoints } from "../dataFetcher/apiConfig";
import { fetchData } from "./fetchData";

// Color matching rules
const colorMap = {
    black: ["white", "red", "green", "pink", "black"],
    white: ["black", "red", "green", "pink", "white"],
    red: ["black", "white"],
    green: ["black", "white"],
    pink: ["black", "white"]
};

const getMatchingClothesByColor = (clothingItem, allItems) => {
  const matchingColors = colorMap[clothingItem.color];
  return allItems.filter(item => matchingColors.includes(item.color) && item.type !== clothingItem.type);
}

const allItems = fetchData(apiEndpoints.mockData);
const itemToMatch = allItems[0];
const matchingItems = getMatchingClothesByColor(itemToMatch, allItems);

console.log(matchingItems);