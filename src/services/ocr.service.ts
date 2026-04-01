import Tesseract from 'tesseract.js';

export const extractTextFromImage = async (path: string) => {
  const { data } = await Tesseract.recognize(path, 'eng');
  // console.log('Data from Ocr:', data);
  return data.text;
};
