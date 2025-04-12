import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export const getGeminiExplanation = async (algorithm: string, step: number, data: any) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      Explain step ${step} of the ${algorithm} algorithm.
      Data: ${JSON.stringify(data)}
      Keep it simple and beginner-friendly.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error('Gemini error:', err);
    return 'AI explanation unavailable right now. Please try again later.';
  }
};
