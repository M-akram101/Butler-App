import multer from 'multer';

// 1. This tells Multer: "Store files in a folder called 'uploads'"
// It will create the folder automatically if it doesn't exist.
export const upload = multer({ dest: 'uploads/' });
