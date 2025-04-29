import { GoogleGenAI } from '@google/genai';

// Initialize the Google Gemini client
const initGeminiClient = (apiKey?: string) => {
  // Use the provided API key or fall back to the environment variable
  const key = apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

  if (!key) {
    console.warn('Google Gemini API Key is missing. AI features will not work.');
    return null;
  }

  return new GoogleGenAI({ apiKey: key });
};

// Create a chat for multi-turn conversations
export const createGeminiChat = async (apiKey?: string) => {
  const ai = initGeminiClient(apiKey);

  if (!ai) {
    throw new Error('Failed to initialize Google Generative AI client');
  }

  // Create a chat instance
  const chat = ai.chats.create({
    model: 'gemini-2.0-flash',
    config: {
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
    }
  });

  return chat;
};

// Generate content with the Gemini model
export const generateGeminiContent = async (
  prompt: string | string[],
  apiKey?: string,
  options?: {
    temperature?: number;
    topP?: number;
    topK?: number;
    maxOutputTokens?: number;
    model?: string;
  }
) => {
  const ai = initGeminiClient(apiKey);

  if (!ai) {
    throw new Error('Failed to initialize Google Generative AI client');
  }

  // Use the specified model or default to gemini-2.0-flash-001
  const modelName = options?.model || 'gemini-2.0-flash';

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        temperature: options?.temperature ?? 0.7,
        topP: options?.topP ?? 0.8,
        topK: options?.topK ?? 40,
        maxOutputTokens: options?.maxOutputTokens,
      }
    });

    return response;
  } catch (error) {
    console.error('Error generating content with Gemini:', error);
    throw error;
  }
};

// Generate content with streaming for more responsive UI
export const generateGeminiContentStream = async (
  prompt: string | string[],
  apiKey?: string,
  options?: {
    temperature?: number;
    topP?: number;
    topK?: number;
    maxOutputTokens?: number;
    model?: string;
  }
) => {
  const ai = initGeminiClient(apiKey);

  if (!ai) {
    throw new Error('Failed to initialize Google Generative AI client');
  }

  // Use the specified model or default to gemini-2.0-flash
  const modelName = options?.model || 'gemini-2.0-flash';

  try {
    const response = await ai.models.generateContentStream({
      model: modelName,
      contents: prompt,
      config: {
        temperature: options?.temperature ?? 0.7,
        topP: options?.topP ?? 0.8,
        topK: options?.topK ?? 40,
        maxOutputTokens: options?.maxOutputTokens,
      }
    });

    return response;
  } catch (error) {
    console.error('Error generating streaming content with Gemini:', error);
    throw error;
  }
};
