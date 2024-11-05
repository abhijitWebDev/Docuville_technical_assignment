// backend/src/controllers/ocr.js
import Tesseract from 'tesseract.js'; // Example using Tesseract.js

export const extractDataFromImage = async (imageBuffer) => {
    try {
        // Use Tesseract.js to recognize text from the image buffer
        const { data: { text } } = await Tesseract.recognize(imageBuffer, 'eng', {
          logger: (m) => console.log(m), // Optional: log progress
        });
    
        console.log('OCR Text:', text); // Log the OCR output for debugging
    
        // Adjust regex patterns based on the actual document format
        const licenseNumberMatch = text.match(/D:\s*([\d-]+)/);
        const nameMatch = text.match(/NAME\s*([A-Z\s]+)/);
        const dateOfBirthMatch = text.match(/DOB:\s*([\d/]+)/);
        const issueDateMatch = text.match(/ISS:\s*([\d/]+)/);
        const expirationDateMatch = text.match(/EXP:\s*([\d/]+)/);
        // const addressMatch = text.match(/Miller\s*([\d\w\s]+)/); // Assuming 'Miller' is part of the address

    
        // Check if all required fields are extracted
        if (!nameMatch || !licenseNumberMatch || !dateOfBirthMatch || !issueDateMatch || !expirationDateMatch) {
          throw new Error('Failed to extract all required fields from OCR text');
        }
    
        // Return extracted data as an object
        return {
          name: nameMatch[1].trim(),
          licenseNumber: licenseNumberMatch[1].trim(),
          dateOfBirth: dateOfBirthMatch[1].trim(),
          issueDate: issueDateMatch[1].trim(),
          expirationDate: expirationDateMatch[1].trim(),
          // address: addressMatch[1].trim(),
        };
      } catch (error) {
        console.error('Error during OCR processing:', error);
        throw new Error('OCR processing failed');
      }
  
};

