
import { GoogleGenAI, Type } from "@google/genai";
import type { GeneratedIdea } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const productIdeaSchema = {
  type: Type.OBJECT,
  properties: {
    name: {
      type: Type.STRING,
      description: 'A catchy and descriptive name for the product idea.',
    },
    description: {
      type: Type.STRING,
      description: 'A brief, compelling paragraph describing the product and its unique value proposition.',
    },
    targetAudience: {
      type: Type.STRING,
      description: 'The primary target audience for this product.',
    },
    keyFeatures: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'A list of 3-5 key features that make this product stand out.',
    },
  },
  required: ['name', 'description', 'targetAudience', 'keyFeatures'],
};

export const generateProductIdea = async (
  category: string,
  keywords: string
): Promise<GeneratedIdea> => {
  try {
    const prompt = `Generate a unique and innovative e-commerce product idea based on the following category and keywords.
    Category: ${category}
    Keywords: ${keywords}
    
    Please provide a catchy name, a compelling description, the target audience, and a list of key features.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: productIdeaSchema,
        temperature: 0.8,
        topP: 0.95
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);

    return parsedJson as GeneratedIdea;
  } catch (error) {
    console.error("Error generating product idea:", error);
    throw new Error("Failed to generate product idea. Please check your API key and try again.");
  }
};
