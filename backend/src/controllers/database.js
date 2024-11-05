// backend/database.js

import Document from '../models/document.model.js';

export const saveLicenseDataToDatabase = async (validatedData) => {
  try {
    // Check if the document already exists in the database
    const existingDocument = await Document.findOne({ licenseNumber: validatedData.licenseNumber });

    if (existingDocument) {
      console.log('Document with this license number already exists');
      return { message: 'Document already exists' }; // Return a message indicating existence
    }

    // If the document does not exist, create a new one
    const license = new Document(validatedData);
    await license.save();
    console.log('License data saved successfully');
    return { message: 'License data saved successfully' }; // Return a success message
  } catch (error) {
    console.error('Error saving license data:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
