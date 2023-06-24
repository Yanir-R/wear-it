import { apiEndpoints } from "../dataFetcher/apiConfig";
import { fetchData } from "../utils/fetchData";

export const getRecommendation = async (req) => {
  try {
    const { type, size } = req.query;
    const allItems = await fetchData(apiEndpoints.mockData);

    console.log("🚀 ~ file: recommendationsController.ts:79 ~ getRecommendation ~ size:", size)
    console.log("🚀 ~ file: recommendationsController.ts:79 ~ getRecommendation ~ type:", type)

    if (!type || size == null) {
      throw new Error("Type or size is missing from the request.");
    }

    let recommendedSizes: any = {};


    return { recommendedSizes };
  } catch (error) {
    // log error
    console.error(error);
    // send response with error message
    return { error: error.message };
  }
};