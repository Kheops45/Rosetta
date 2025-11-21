import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { TranslationResult, AIModel } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Decodes hieroglyphs from an image (Base64)
 */
export const decodeHieroglyphsFromImage = async (base64Image: string, mimeType: string): Promise<TranslationResult> => {
  const prompt = `
    Agis comme un expert égyptologue de renommée mondiale.
    Analyse cette image contenant des hiéroglyphes égyptiens.
    
    Fournis une réponse structurée au format JSON (sans balises markdown json) avec les champs suivants:
    1. "transliteration": La translittération phonétique des signes.
    2. "translation": La traduction précise en français.
    3. "historicalContext": Une brève explication du contexte, de la signification symbolique ou de la période probable (max 3 phrases).
    
    Si l'image ne contient pas de hiéroglyphes clairs, indique-le dans la traduction.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: AIModel.GEMINI_FLASH,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("Pas de réponse de l'IA");
    
    return JSON.parse(text) as TranslationResult;

  } catch (error) {
    console.error("Error decoding hieroglyphs:", error);
    throw new Error("Impossible de décrypter l'image. Assurez-vous qu'elle est nette.");
  }
};

/**
 * Converts modern French text to Hieroglyphs
 */
export const encodeTextToHieroglyphs = async (textToConvert: string): Promise<TranslationResult> => {
  const prompt = `
    Agis comme un scribe royal de l'Égypte antique.
    Convertis le texte français suivant en hiéroglyphes égyptiens (en utilisant les caractères Unicode appropriés).
    
    Texte à convertir: "${textToConvert}"

    Fournis une réponse structurée au format JSON (sans balises markdown json) avec les champs suivants:
    1. "hieroglyphs": La séquence de caractères Unicode hiéroglyphiques.
    2. "transliteration": La lecture phonétique.
    3. "translation": Le texte original en français (pour confirmation).
    4. "historicalContext": Une note brève sur le choix des signes ou des déterminatifs utilisés (max 2 phrases).
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: AIModel.GEMINI_FLASH,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("Pas de réponse de l'IA");

    return JSON.parse(text) as TranslationResult;

  } catch (error) {
    console.error("Error encoding text:", error);
    throw new Error("Impossible de convertir le texte.");
  }
};