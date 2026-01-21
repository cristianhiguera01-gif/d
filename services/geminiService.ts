import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";
import { ChatMessage } from "../types";

// Always create a new GoogleGenAI instance right before making an API call to ensure 
// it uses the most up-to-date API key from the environment.
export const generateChatResponse = async (
  history: ChatMessage[],
  userMessage: string
): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing. Please select a paid API Key to use the Assistant.");
    }
    
    // Initialize GenAI client with named parameter
    const ai = new GoogleGenAI({ apiKey });
    
    // Create a context string with product data
    const productContext = PRODUCTS.map(p => 
      `- ${p.name.es} (${p.category}): Consultar. Compatible: ${p.compatibleModels.join(', ')}.`
    ).join('\n');

    const systemInstruction = `
      Eres "TamayoBot", el asistente experto y premium de Tracto Lujos Tamayo.
      Tu objetivo es ayudar a los camioneros y clientes a encontrar accesorios de alta calidad para sus tractocamiones (trailers).
      
      IMPORTANTE: Nuestros productos son de ACERO INOXIDABLE de alta calidad, no de cromo. El acero inoxidable es más resistente y duradero para el trabajo pesado.
      
      Usa el siguiente catálogo de productos para tus recomendaciones:
      ${productContext}
      
      Reglas:
      1. Habla siempre en español con un tono profesional, experto y entusiasta ("¡Claro que sí, colega!", "Tenemos lo mejor para tu máquina").
      2. Resalta la calidad, el brillo del ACERO INOXIDABLE y la garantía de durabilidad.
      3. Si te preguntan por precios que dicen "Consultar", sugiere contactar por WhatsApp o el formulario.
      4. Menciona que hacemos envíos a todo el país (Colombia).
      5. Sé conciso y directo.
    `;

    // Use Gemini 3 Flash for basic text tasks/chatbots
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    // Access the .text property directly (do not call as a method)
    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "Disculpa, tuve un problema procesando tu respuesta.";

  } catch (error: any) {
    console.error("Error calling Gemini:", error);
    
    // Check for specific error message to prompt re-selection of API Key
    if (error?.message?.includes("Requested entity was not found")) {
      return "ERROR_INVALID_KEY";
    }
    
    return "Lo siento, necesito que configures tu llave API primero o hubo un error de conexión.";
  }
};