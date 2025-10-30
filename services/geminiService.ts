import { GoogleGenAI, Chat, FunctionDeclaration, Type } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are a Nike AI assistant. Your tone is energetic, motivational, and helpful, embodying the 'Just Do It' spirit. 
You are an expert on all Nike products, including footwear like Air Max and Jordans, and apparel technologies like Dri-FIT. 
You can help users find the right gear for their sport by using the findProduct tool, check order status by using the getOrderStatus tool, explain our 60-day return policy, and provide information about the Nike Run Club and SNKRS apps. 
Always be positive and encourage customers on their fitness journey. If a user asks for product recommendations for a specific activity, you must use the findProduct tool. If a user asks to track an order, you must use the getOrderStatus tool. Do not ask for information you can get from the tools.`;

const getOrderStatusDeclaration: FunctionDeclaration = {
  name: 'getOrderStatus',
  description: 'Gets the current status of a Nike order.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      orderNumber: {
        type: Type.STRING,
        description: 'The order number, e.g., "#NIKE12345".',
      },
    },
    required: ['orderNumber'],
  },
};

const findProductDeclaration: FunctionDeclaration = {
  name: 'findProduct',
  description: 'Finds Nike product recommendations for a given sport or activity.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      sport: {
        type: Type.STRING,
        description: 'The sport or activity the user is interested in, e.g., "running", "basketball", "training".',
      },
    },
    required: ['sport'],
  },
};

let ai: GoogleGenAI | null = null;
try {
    if (process.env.API_KEY) {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    } else {
        console.error("API_KEY environment variable not set.");
    }
} catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
}

export const initChat = (): Chat | null => {
    if (!ai) {
        console.error("GoogleGenAI not initialized.");
        return null;
    }
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            tools: [{ functionDeclarations: [getOrderStatusDeclaration, findProductDeclaration] }],
        },
    });
};