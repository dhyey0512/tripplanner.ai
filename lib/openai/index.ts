// index.ts
import { batch1Schema, batch2Schema, batch3Schema } from "./schemas";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const promptSuffix = `generate travel data for hidden gems according to the schema and in JSON format. 
  Do not return anything in your response outside of curly braces. Ensure that all prices are provided in Indian Rupees (₹). 
  Dates given, activity preferences, and travel companions should influence the plan by 50%.`;

const callOpenAIApi = (prompt: string, schema: any, description: string) => {
  console.log({ prompt, schema });
  console.log("Calling");
  return openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are a helpful travel assistant." },
      { role: "user", content: prompt },
    ],
    functions: [
      { name: "set_travel_details", parameters: schema, description },
    ],
    function_call: { name: "set_travel_details" },
  });
};

export const generatebatch1 = (promptText: string) => {
  const prompt = `${promptText}, ${promptSuffix}`;
  const description = `Generate a description of information about a place according to the following schema:

  - About the Place:
    - A string containing at least 50 words about the place.

  - Best Time to Visit:
    - A string specifying the best and peak time to visit the place.
    
  Ensure the response follows the schema and is in JSON format.`;
  return callOpenAIApi(prompt, batch1Schema, description);
};

type OpenAIInputType = {
  userPrompt: string;
  placeName?: string | undefined;
  activityPreferences?: string[] | undefined;
  fromDate?: number | undefined;
  toDate?: number | undefined;
  companion?: string | undefined;
};

export const generatebatch2 = (inputParams: OpenAIInputType) => {
  const description = `Generate recommendations for an adventurous trip according to the following schema:

  - Adventures Activities to Do: At least 5 activities, each containing:
      - Activity name and location
      - Budget in Indian Rupees (₹)

  - Local Cuisine Recommendations: At least 5 dishes, each containing:
      - Name of the dish
      - Price in Indian Rupees (₹)
  - Packing Checklist: A list of items to pack based on the weather, activities, and location.

  Ensure the response is in JSON format and adheres strictly to the provided schema.`;
  return callOpenAIApi(getPrompt(inputParams), batch2Schema, description);
};

export const generatebatch3 = (inputParams: OpenAIInputType) => {
  const { placeName } = inputParams;
  const description = `Generate a travel itinerary for the hidden gems and extremely rare, unexplored places in ${placeName}, excluding all the famous places, to visit according to the following schema:

  - Itinerary:
    - An array with details for each day of the trip, including:
      - Title and activities for morning, afternoon, and evening.
      - Each activity includes a description.

  - Top Places to Visit:
    - An array listing places, each with:
      - Name and coordinates (latitude and longitude).

  Ensure the response follows the schema and is in JSON format.`;
  return callOpenAIApi(getPrompt(inputParams), batch3Schema, description);
};

const getPrompt = ({
  userPrompt,
  placeName,
  activityPreferences,
  companion,
  fromDate,
  toDate,
}: OpenAIInputType) => {
  let prompt = `${userPrompt} in ${placeName}, from date-${fromDate} to date-${toDate}`;
  if (companion) prompt += `, travelling with-${companion}`;

  if (activityPreferences && activityPreferences.length > 0) {
    prompt += `, activity preferences-${activityPreferences.join(", ")}`;
  }
  prompt = `${prompt}, generate travel data for hidden gems in ${placeName} ${promptSuffix}`;
  return prompt;
};
