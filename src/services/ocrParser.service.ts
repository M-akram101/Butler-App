import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const parseReceipt = async (text: string) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `
You are a JSON API. Only return valid JSON. No explanation.

Schema:
{
  merchantName: string,
  merhantAddress: string,
  items: [
    { name: string, quantity: number, price: number, itemSize: string }
  ],
  totalPrice: string
}

Receipt:
${text}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const output = response.text();

  return JSON.parse(output);
};
