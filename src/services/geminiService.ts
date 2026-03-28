// @ts-ignore - The package suggests using /web or /node but types might not resolve perfectly in all editors without config
import { GoogleGenAI, Type } from "@google/genai/dist/web"; 

import { ChatMessage, AnalysisResult } from "../types";

// Initialize the client
const apiKey = process.env.EXPO_PUBLIC_API_KEY || process.env.API_KEY;

if (!apiKey) {
  console.error("API Key is missing! Make sure EXPO_PUBLIC_API_KEY is set in .env");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

const MODEL_NAME = 'gemini-3-pro-preview';

export const sendChatMessage = async (
  history: ChatMessage[], 
  newMessage: string
): Promise<string> => {
  try {
    // Construct conversation history for the model
    // Limiting context window for demo performance
    const recentHistory = history.slice(-10).map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const chat = ai.chats.create({
      model: MODEL_NAME,
      history: recentHistory,
      config: {
        systemInstruction: "You are RevoBot, a helpful automotive assistant for the REVO marketplace. You help drivers diagnose car issues, understand maintenance costs, and find mechanics. You are professional, concise, and helpful. Keep responses under 150 words unless asked for detailed steps.",
      }
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "Sorry, I'm having trouble connecting to the server right now.";
  }
};

export const analyzeVehicleImage = async (base64Image: string, userPrompt?: string): Promise<AnalysisResult> => {
  try {
    // Remove data URL prefix if present
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

    const prompt = userPrompt || "Analyze this image of a vehicle or car part. Identify the issue if visible, estimate severity, suggest a REVO service category, and estimated repair cost range.";

    const result = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            diagnosis: { type: Type.STRING, description: "A brief diagnosis of the issue seen in the image." },
            severity: { type: Type.STRING, description: "Severity level: LOW, MEDIUM, or HIGH." },
            recommendedService: { type: Type.STRING, description: "The type of mechanic service needed (e.g., Brake Repair, Oil Change)." },
            estimatedCost: { type: Type.STRING, description: "Estimated cost range in USD (e.g., $100-$200)." }
          },
          required: ["diagnosis", "severity", "recommendedService", "estimatedCost"]
        }
      }
    });

    if (result.text) {
        return JSON.parse(result.text) as AnalysisResult;
    }
    throw new Error("No JSON response");

  } catch (error) {
    console.error("Analysis Error:", error);
    throw new Error("Failed to analyze image.");
  }
};
